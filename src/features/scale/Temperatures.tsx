import ScaleSVGWrapper from '.';
import createLinearScale from './math';
import { AnnotationSpec, TickSpec } from './types';
export default function Temperatures() {
    // Define scale and ticks
    const DOMAIN_F: [number, number] = [0, 500]
    const majorFahrenheitTicks: TickSpec[] = [
        { value: 0, emphasis: 'strong' },
        { value: 32, emphasis: 'strong' },
        { value: 100 },
        { value: 140 },
        { value: 212, emphasis: 'strong' },
        { value: 300 },
        { value: 350, emphasis: 'strong' },
        { value: 400 },
        { value: 450 },
        { value: 500, emphasis: 'strong' }
    ]

    function generateMinorTicks(
        min: number,
        max: number,
        step: number,
        majorValues: Set<number>
    ): TickSpec[] {
        const ticks: TickSpec[] = []
        for (let v = min; v <= max; v += step) {
            if (!majorValues.has(v)) {
                ticks.push({ value: v })
            }
        }
        return ticks
    }

    const majorValues = new Set(majorFahrenheitTicks.map(t => t.value))

    const minorFahrenheitTicks = generateMinorTicks(
        0,
        500,
        25,
        majorValues
    )


    // Conversion function
    function fToC(f: number) {
        return (f - 32) * 5 / 9
    }

    //Annotations
    const annotations: AnnotationSpec[] = [
        {
            value: 32,
            label: 'Water freezes',
            leaders: { left: true, right: true }
        },
        {
            value: 140,
            label: 'Yeast death',
            leaders: { left: true, right: true }
        },
        {
            value: 212,
            label: 'Water boils',
            leaders: { left: true, right: true }
        },
        {
            value: 300,
            label: 'Maillard browning begins',
            leaders: { left: true, right: true }
        },
        {
            value: 320,
            label: 'Sugar caramelization',
            leaders: { left: true, right: true }
        }
    ]

    const scale = createLinearScale(
        DOMAIN_F,
        [0, 500]
    )


    return <ScaleSVGWrapper
        scale={scale}
        majorTicks={majorFahrenheitTicks.map(t => ({
            ...t,
            label: t.label ?? `${t.value}°F / ${fToC(t.value).toFixed(0)}°C`
        }))}
        minorTicks={minorFahrenheitTicks}
        annotations={annotations.map(a => ({
            ...a,
            label: a.label ?? `${a.value}°F / ${fToC(a.value).toFixed(0)}°C`
        }))} displayTitle={'Temperature Scale'}    />
}