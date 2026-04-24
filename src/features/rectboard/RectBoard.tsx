import type { CSSProperties } from "react";

export type RectCellOverride = {
  row: number;
  col: number;
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
  rx?: number;
  ry?: number;
};

export type RectBoardProps = {
  rows: number;
  cols: number;
  cellWidth: number;
  cellHeight: number;
  gapX?: number;
  gapY?: number;
  originX?: number;
  originY?: number;
  padding?: number;
  width?: number | string;
  height?: number | string;
  viewBox?: string;
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
  rx?: number;
  ry?: number;
  cells?: RectCellOverride[];
  onRectClick?: (params: { row: number; col: number; index: number }) => void;
  className?: string;
  style?: CSSProperties;
};

export default function RectBoard({
  rows,
  cols,
  cellWidth,
  cellHeight,
  gapX = 0,
  gapY = 0,
  originX = 0,
  originY = 0,
  padding = 0,
  width = "100%",
  height = "100%",
  viewBox,
  fill = "white",
  stroke = "black",
  strokeWidth = 1,
  rx = 0,
  ry = 0,
  cells = [],
  onRectClick,
  className,
  style,
}: RectBoardProps) {
  const safeRows = Math.max(0, Math.floor(rows));
  const safeCols = Math.max(0, Math.floor(cols));

  const boardWidth =
    safeCols === 0 ? 0 : safeCols * cellWidth + (safeCols - 1) * gapX;
  const boardHeight =
    safeRows === 0 ? 0 : safeRows * cellHeight + (safeRows - 1) * gapY;

  const computedViewBox = `${originX - padding} ${originY - padding} ${boardWidth + 2 * padding} ${boardHeight + 2 * padding}`;

  const overridesByCell = new Map<string, RectCellOverride>();
  for (const cell of cells) {
    overridesByCell.set(`${cell.row}:${cell.col}`, cell);
  }

  const rects = [];
  for (let row = 0; row < safeRows; row += 1) {
    for (let col = 0; col < safeCols; col += 1) {
      const index = row * safeCols + col;
      const x = originX + col * (cellWidth + gapX);
      const y = originY + row * (cellHeight + gapY);
      const override = overridesByCell.get(`${row}:${col}`);

      rects.push(
        <rect
          key={`${row}-${col}`}
          x={x}
          y={y}
          width={cellWidth}
          height={cellHeight}
          fill={override?.fill ?? fill}
          stroke={override?.stroke ?? stroke}
          strokeWidth={override?.strokeWidth ?? strokeWidth}
          rx={override?.rx ?? rx}
          ry={override?.ry ?? ry}
          onClick={
            onRectClick
              ? () => onRectClick({ row, col, index })
              : undefined
          }
        />,
      );
    }
  }

  return (
    <svg
      width={width}
      height={height}
      viewBox={viewBox ?? computedViewBox}
      preserveAspectRatio="xMidYMid meet"
      className={className}
      style={style}
    >
      {rects}
    </svg>
  );
}
