export default function UglyGrid(props: { dimension: number, gridSize: number }) {
    const { dimension, gridSize } = props
    let keyGen = 0
    return (
        <>
            {/* Make a black and white grid */}
            {Array.from({ length: gridSize }, (_, i) => {
                const color = i % 2 === 0 ? 'black' : 'white'
                return <rect key={keyGen++} x={dimension / gridSize * i} y={0} width={dimension / gridSize} height={dimension} fill={color} opacity={0.25} />
            })}
            {Array.from({ length: gridSize }, (_, i) => {
                const color = i % 2 === 0 ? 'black' : 'white'
                return <rect key={keyGen++} x={0} y={dimension / gridSize * i} width={dimension} height={dimension / gridSize} fill={color} opacity={0.25} />
            })}
        </>
    )
}