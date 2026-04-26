import { AnnotationSpec, LinearScale, scaleProps, TickSpec } from './types';

export default function ScaleSVG(props: scaleProps & { children?: React.ReactNode, WIDTH?: number, HEIGHT?: number, MARGIN?: number }) {

    // Dimensions for SVG
    const WIDTH = props.WIDTH || 200
    const HEIGHT = props.HEIGHT || 500
    const MARGIN = props.MARGIN || 40

    const { scale, majorTicks, minorTicks, annotations } = props;

    function renderTicks(
        scale: LinearScale,
        ticks: TickSpec[],
        x: number,
        majorLength = 14,
        minorLength = 6
    ) {
        return ticks.map((tick, i) => {
            const y = scale.valueToY(tick.value)
            const isMajor = tick.emphasis === 'strong'
            const length = isMajor ? majorLength : minorLength

            return (
                <g key={i}>
                    <line
                        x1={x}
                        x2={x + length}
                        y1={y}
                        y2={y}
                        stroke={tick.color ?? 'black'}
                        strokeWidth={isMajor ? 2 : 1}
                    />
                    {tick.label !== undefined && (
                        <text
                            x={x - 6}
                            y={y}
                            textAnchor="end"
                            dominantBaseline="middle"
                            fontWeight={isMajor ? 'bold' : 'normal'}
                            fontFamily="monospace"
                            fontSize={10}
                        >
                            {tick.label ?? tick.value}
                        </text>
                    )}
                </g>
            )
        })
    }


    function renderAnnotations(
        scale: LinearScale,
        annotations: AnnotationSpec[],
        xCenter: number,
        leaderLength = 40
    ) {
        return annotations.map((a, i) => {
            const y = scale.valueToY(a.value)
            const hasLabel = a.label && a.label.trim().length > 0

            return (
                <g key={i}>
                    {a.leaders?.left && (
                        <line
                            x1={xCenter - leaderLength}
                            x2={xCenter}
                            y1={y}
                            y2={y}
                            stroke={a.color ?? 'black'}
                            strokeDasharray="2 2"
                        />
                    )}
                    {a.leaders?.right && (
                        <line
                            x1={xCenter}
                            x2={xCenter + leaderLength}
                            y1={y}
                            y2={y}
                            stroke={a.color ?? 'black'}
                            strokeDasharray="2 2"
                        />
                    )}
                    {hasLabel && (
                        <text
                            x={xCenter}
                            y={y - 2}
                            textAnchor="middle"
                            dominantBaseline="baseline"
                            fontFamily="monospace"
                            fontSize={11}
                        >
                            {a.label}
                        </text>
                    )}
                </g>
            )
        })
    }

    return <svg width={WIDTH} height={HEIGHT} xmlns="http://www.w3.org/2000/svg">
        {/* If no children are passed, just show a polygon */}
        {renderTicks(scale, minorTicks, WIDTH - MARGIN - 6, 0, 6)}
        {renderTicks(scale, majorTicks, WIDTH - MARGIN - 6, 14, 6)}
        {renderAnnotations(scale, annotations, (WIDTH - MARGIN) / 2, 40)}
    </svg>
}