export type LinearScale = {
  domainMin: number
  domainMax: number
  rangeTop: number
  rangeBottom: number
  valueToY: (value: number) => number
}

export type TickSpec = {
  value: number
  label?: string
  emphasis?: 'normal' | 'strong'
  color?: string
}

export type AnnotationSpec = {
  value: number
  label?: string | null // null or empty = no text rendered
  color?: string
  leaders?: {
    left?: boolean
    right?: boolean
  }
}

export type scaleProps = {
  scale: LinearScale;
  majorTicks: TickSpec[];
  minorTicks: TickSpec[];
  annotations: AnnotationSpec[];
};