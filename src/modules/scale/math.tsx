import { LinearScale } from "./types"

export default function createLinearScale(
  domain: [number, number],
  range: [number, number]
): LinearScale {
  const [domainMin, domainMax] = domain
  const [rangeTop, rangeBottom] = range
  const domainSpan = domainMax - domainMin
  const rangeSpan = rangeBottom - rangeTop

  return {
    domainMin,
    domainMax,
    rangeTop,
    rangeBottom,

    valueToY(value: number) {
      const clamped = Math.min(domainMax, Math.max(domainMin, value))
      const t = (clamped - domainMin) / domainSpan
      return rangeTop + t * rangeSpan
    }
  }
}