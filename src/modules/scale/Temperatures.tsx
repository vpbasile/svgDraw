import ScaleSVG from "./Scale";
import createLinearScale from "./math";
import { AnnotationSpec, TickSpec } from "./types";

export default function Temperatures() {
  const height = 600;
  const margin = 40;

  const scale = createLinearScale([-40, 120], [height - margin, margin]);

  const majorTicks: TickSpec[] = [
    { value: -40, label: "-40", emphasis: "strong" },
    { value: -20, label: "-20", emphasis: "strong" },
    { value: 0, label: "0", emphasis: "strong" },
    { value: 20, label: "20", emphasis: "strong" },
    { value: 40, label: "40", emphasis: "strong" },
    { value: 60, label: "60", emphasis: "strong" },
    { value: 80, label: "80", emphasis: "strong" },
    { value: 100, label: "100", emphasis: "strong" },
    { value: 120, label: "120", emphasis: "strong" },
  ];

  const minorTicks: TickSpec[] = [];
  for (let i = -35; i < 120; i += 5) {
    if (i % 20 !== 0) {
      minorTicks.push({ value: i });
    }
  }

  const annotations: AnnotationSpec[] = [
    { value: 32, label: "Water Freezes", leaders: { left: true, right: true }, color: "#2b6cb0" },
    { value: 98.6, label: "Body Temp", leaders: { left: true, right: true }, color: "#c53030" },
    { value: 100, label: "Water Boils", leaders: { left: true, right: true }, color: "#2f855a" },
  ];

  return (
    <ScaleSVG
      scale={scale}
      majorTicks={majorTicks}
      minorTicks={minorTicks}
      annotations={annotations}
      WIDTH={300}
      HEIGHT={height}
      MARGIN={50}
    />
  );
}
