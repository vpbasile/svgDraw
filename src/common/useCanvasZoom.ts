import { useEffect, useRef } from 'react';

const ZOOM_FACTOR = 1.15;
const SVG_SELECTOR = '#canvas-box svg';

function getSvg(): SVGSVGElement | null {
    const el = document.querySelector(SVG_SELECTOR);
    return el instanceof SVGSVGElement ? el : null;
}

function parseViewBox(vb: string): [number, number, number, number] {
    const parts = vb.trim().split(/[\s,]+/).map(Number);
    return [parts[0], parts[1], parts[2], parts[3]];
}

function scaleViewBox(svg: SVGSVGElement, factor: number): void {
    const vbStr = svg.getAttribute('viewBox');
    if (!vbStr) return;
    const [minX, minY, w, h] = parseViewBox(vbStr);
    const cx = minX + w / 2;
    const cy = minY + h / 2;
    const newW = w / factor;
    const newH = h / factor;
    svg.setAttribute('viewBox', `${cx - newW / 2} ${cy - newH / 2} ${newW} ${newH}`);
}

/** Translate the viewBox by (dx, dy) in SVG user-units. */
function panViewBox(svg: SVGSVGElement, dxPx: number, dyPx: number): void {
    const vbStr = svg.getAttribute('viewBox');
    if (!vbStr) return;
    const [minX, minY, w, h] = parseViewBox(vbStr);
    // Convert pixel delta to viewBox units via the ratio of vb-size / element-size
    const rect = svg.getBoundingClientRect();
    const scaleX = w / rect.width;
    const scaleY = h / rect.height;
    svg.setAttribute('viewBox', `${minX - dxPx * scaleX} ${minY - dyPx * scaleY} ${w} ${h}`);
}

export function useCanvasZoom() {
    const naturalViewBox = useRef<string | null>(null);

    useEffect(() => {
        const capture = () => {
            const svg = getSvg();
            if (svg && naturalViewBox.current === null) {
                naturalViewBox.current = svg.getAttribute('viewBox');
            }
        };
        capture();
        const t = setTimeout(capture, 200);

        const canvasBox = document.getElementById('canvas-box');
        if (!canvasBox) return;

        // ── Mouse drag pan ────────────────────────────────────────────────
        let dragging = false;
        let lastMouseX = 0;
        let lastMouseY = 0;

        const onMouseDown = (e: MouseEvent) => {
            // Middle button, or left button (button 0)
            if (e.button === 0 || e.button === 1) {
                dragging = true;
                lastMouseX = e.clientX;
                lastMouseY = e.clientY;
                canvasBox.style.cursor = 'grabbing';
                e.preventDefault();
            }
        };

        const onMouseMove = (e: MouseEvent) => {
            if (!dragging) return;
            const dx = e.clientX - lastMouseX;
            const dy = e.clientY - lastMouseY;
            lastMouseX = e.clientX;
            lastMouseY = e.clientY;
            const svg = getSvg();
            if (svg) panViewBox(svg, dx, dy);
        };

        const onMouseUp = () => {
            dragging = false;
            canvasBox.style.cursor = 'grab';
        };

        // Set initial cursor
        canvasBox.style.cursor = 'grab';

        // ── Wheel: Ctrl = zoom, plain = pan ───────────────────────────────
        const onWheel = (e: WheelEvent) => {
            e.preventDefault();
            const svg = getSvg();
            if (!svg) return;
            if (e.ctrlKey) {
                const factor = e.deltaY < 0 ? ZOOM_FACTOR : 1 / ZOOM_FACTOR;
                scaleViewBox(svg, factor);
            } else {
                panViewBox(svg, -e.deltaX, -e.deltaY);
            }
        };

        // ── Touch: 1-finger = pan, 2-finger = pinch-zoom ──────────────────
        let lastPinchDistance: number | null = null;
        let lastTouchX = 0;
        let lastTouchY = 0;

        const pinchDistance = (e: TouchEvent): number => {
            const [a, b] = [e.touches[0], e.touches[1]];
            return Math.hypot(b.clientX - a.clientX, b.clientY - a.clientY);
        };

        const onTouchStart = (e: TouchEvent) => {
            if (e.touches.length === 2) {
                lastPinchDistance = pinchDistance(e);
            } else if (e.touches.length === 1) {
                lastTouchX = e.touches[0].clientX;
                lastTouchY = e.touches[0].clientY;
            }
        };

        const onTouchMove = (e: TouchEvent) => {
            e.preventDefault();
            const svg = getSvg();
            if (!svg) return;
            if (e.touches.length === 2 && lastPinchDistance !== null) {
                const newDist = pinchDistance(e);
                scaleViewBox(svg, newDist / lastPinchDistance);
                lastPinchDistance = newDist;
            } else if (e.touches.length === 1) {
                const dx = e.touches[0].clientX - lastTouchX;
                const dy = e.touches[0].clientY - lastTouchY;
                lastTouchX = e.touches[0].clientX;
                lastTouchY = e.touches[0].clientY;
                panViewBox(svg, dx, dy);
            }
        };

        const onTouchEnd = (e: TouchEvent) => {
            if (e.touches.length < 2) lastPinchDistance = null;
            if (e.touches.length === 1) {
                lastTouchX = e.touches[0].clientX;
                lastTouchY = e.touches[0].clientY;
            }
        };

        canvasBox.addEventListener('mousedown',  onMouseDown);
        canvasBox.addEventListener('mousemove',  onMouseMove);
        canvasBox.addEventListener('mouseup',    onMouseUp);
        canvasBox.addEventListener('mouseleave', onMouseUp);
        canvasBox.addEventListener('wheel',      onWheel,      { passive: false });
        canvasBox.addEventListener('touchstart', onTouchStart, { passive: false });
        canvasBox.addEventListener('touchmove',  onTouchMove,  { passive: false });
        canvasBox.addEventListener('touchend',   onTouchEnd);

        return () => {
            clearTimeout(t);
            canvasBox.style.cursor = '';
            canvasBox.removeEventListener('mousedown',  onMouseDown);
            canvasBox.removeEventListener('mousemove',  onMouseMove);
            canvasBox.removeEventListener('mouseup',    onMouseUp);
            canvasBox.removeEventListener('mouseleave', onMouseUp);
            canvasBox.removeEventListener('wheel',      onWheel);
            canvasBox.removeEventListener('touchstart', onTouchStart);
            canvasBox.removeEventListener('touchmove',  onTouchMove);
            canvasBox.removeEventListener('touchend',   onTouchEnd);
        };
    }, []);

    const zoomIn  = () => { const svg = getSvg(); if (svg) scaleViewBox(svg, ZOOM_FACTOR); };
    const zoomOut = () => { const svg = getSvg(); if (svg) scaleViewBox(svg, 1 / ZOOM_FACTOR); };
    const resetZoom = () => {
        const svg = getSvg();
        if (svg && naturalViewBox.current) svg.setAttribute('viewBox', naturalViewBox.current);
    };

    return { zoomIn, zoomOut, resetZoom };
}
