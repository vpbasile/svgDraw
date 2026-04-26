import { useEffect, useRef } from 'react';

const ZOOM_FACTOR = 1.15;
const SVG_SELECTOR = '#canvas-box svg';

export const BASE_VIEWBOX_EVENT = 'svgdraw:baseviewbox';

function getSvg(): SVGSVGElement | null {
    const el = document.querySelector(SVG_SELECTOR);
    return el instanceof SVGSVGElement ? el : null;
}

function parseViewBox(vb: string): [number, number, number, number] {
    const parts = vb.trim().split(/[\s,]+/).map(Number);
    return [parts[0], parts[1], parts[2], parts[3]];
}

export function useCanvasZoom() {
    // Base viewBox (natural, un-zoomed, un-panned) — updated via custom event when board changes
    const baseRef = useRef<string | null>(null);
    // Zoom >1 = zoomed in (showing less content), maintained across base changes
    const zoomRef = useRef(1.0);
    // Pan as fraction of base width/height so it scales proportionally with board size changes
    const panRef = useRef({ fx: 0, fy: 0 });

    function applyTransform(svg: SVGSVGElement) {
        const base = baseRef.current;
        if (!base) return;
        const [bx, by, bw, bh] = parseViewBox(base);
        const zoom = zoomRef.current;
        const w = bw / zoom;
        const h = bh / zoom;
        const cx = bx + bw / 2 + panRef.current.fx * bw;
        const cy = by + bh / 2 + panRef.current.fy * bh;
        svg.setAttribute('viewBox', `${cx - w / 2} ${cy - h / 2} ${w} ${h}`);
    }

    function doScale(svg: SVGSVGElement, factor: number) {
        zoomRef.current *= factor;
        applyTransform(svg);
    }

    function doPan(svg: SVGSVGElement, dxPx: number, dyPx: number) {
        const base = baseRef.current;
        if (!base) return;
        const [, , bw, bh] = parseViewBox(base);
        const zoom = zoomRef.current;
        const currentW = bw / zoom;
        const currentH = bh / zoom;
        const rect = svg.getBoundingClientRect();
        panRef.current.fx -= (dxPx * currentW / rect.width) / bw;
        panRef.current.fy -= (dyPx * currentH / rect.height) / bh;
        applyTransform(svg);
    }

    function doZoomToArea(svg: SVGSVGElement, minX: number, minY: number, width: number, height: number) {
        if (width <= 0 || height <= 0) return;
        const base = baseRef.current;
        if (!base) {
            svg.setAttribute('viewBox', `${minX} ${minY} ${width} ${height}`);
            return;
        }

        const [bx, by, bw, bh] = parseViewBox(base);
        const baseRatio = bw / bh;
        const targetCx = minX + width / 2;
        const targetCy = minY + height / 2;

        // Keep uniform zoom and fit the full target area into the viewport.
        const fitH = Math.max(height, width / baseRatio);
        const fitW = fitH * baseRatio;

        zoomRef.current = bw / fitW;
        panRef.current = {
            fx: (targetCx - (bx + bw / 2)) / bw,
            fy: (targetCy - (by + bh / 2)) / bh,
        };
        applyTransform(svg);
    }

    useEffect(() => {
        // When the board dispatches a new base viewBox (e.g. separationMultiplier changed),
        // preserve current zoom/pan fractions and reapply on top of the new base.
        const onBaseChange = (e: Event) => {
            baseRef.current = (e as CustomEvent<string>).detail;
            const svg = getSvg();
            if (svg) applyTransform(svg);
        };
        document.addEventListener(BASE_VIEWBOX_EVENT, onBaseChange);
        return () => document.removeEventListener(BASE_VIEWBOX_EVENT, onBaseChange);
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        const tryCapture = () => {
            if (baseRef.current !== null) return;
            const svg = getSvg();
            if (svg) {
                const vb = svg.getAttribute('viewBox');
                if (vb) { baseRef.current = vb; applyTransform(svg); }
            }
        };
        tryCapture();
        const t = setTimeout(tryCapture, 200);

        const canvasBox = document.getElementById('canvas-box');
        if (!canvasBox) return () => clearTimeout(t);

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
            if (svg) doPan(svg, dx, dy);
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
                doScale(svg, factor);
            } else {
                doPan(svg, -e.deltaX, -e.deltaY);
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
                doScale(svg, newDist / lastPinchDistance);
                lastPinchDistance = newDist;
            } else if (e.touches.length === 1) {
                const dx = e.touches[0].clientX - lastTouchX;
                const dy = e.touches[0].clientY - lastTouchY;
                lastTouchX = e.touches[0].clientX;
                lastTouchY = e.touches[0].clientY;
                doPan(svg, dx, dy);
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
            if (canvasBox) canvasBox.style.cursor = '';
            canvasBox.removeEventListener('mousedown',  onMouseDown);
            canvasBox.removeEventListener('mousemove',  onMouseMove);
            canvasBox.removeEventListener('mouseup',    onMouseUp);
            canvasBox.removeEventListener('mouseleave', onMouseUp);
            canvasBox.removeEventListener('wheel',      onWheel);
            canvasBox.removeEventListener('touchstart', onTouchStart);
            canvasBox.removeEventListener('touchmove',  onTouchMove);
            canvasBox.removeEventListener('touchend',   onTouchEnd);
        };
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const zoomIn  = () => { const svg = getSvg(); if (svg) doScale(svg, ZOOM_FACTOR); };
    const zoomOut = () => { const svg = getSvg(); if (svg) doScale(svg, 1 / ZOOM_FACTOR); };
    const resetZoom = () => {
        zoomRef.current = 1.0;
        panRef.current = { fx: 0, fy: 0 };
        const svg = getSvg();
        if (svg) applyTransform(svg);
    };

    const zoomToArea = (minX: number, minY: number, width: number, height: number) => {
        const svg = getSvg();
        if (svg) doZoomToArea(svg, minX, minY, width, height);
    };

    return { zoomIn, zoomOut, resetZoom, zoomToArea };
}
