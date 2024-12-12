export type colorT = 'red' | 'orange' | 'yellow' | 'green' | 'blue' | 'purple' | 'black' | 'white'
export type coordinateT = { x: number, y: number }
export type myLineT = { start: coordinateT, angle: number, length: number, color?: colorT, width?: string }