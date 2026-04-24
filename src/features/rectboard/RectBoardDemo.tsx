import { Box, FormControl, FormLabel, Input, Stack, Text } from "@chakra-ui/react";
import { useMemo, useState } from "react";
import AppWrapper from "../../common/AppWrapper";
import SidebarSection from "../../common/SidebarSection";
import RectBoard from "./RectBoard";

const LETTER_WIDTH = 850;
const LETTER_HEIGHT = 1100;
const PAGE_MARGIN = 40;

function clampPositiveInt(value: number, fallback: number) {
  if (!Number.isFinite(value)) return fallback;
  return Math.max(1, Math.floor(value));
}

export default function RectBoardDemo() {
  const [rows, setRows] = useState(11);
  const [cols, setCols] = useState(8);
  const [gapX, setGapX] = useState(8);
  const [gapY, setGapY] = useState(8);

  const safeRows = clampPositiveInt(rows, 11);
  const safeCols = clampPositiveInt(cols, 8);

  const { cellWidth, cellHeight, cells } = useMemo(() => {
    const widthBudget = LETTER_WIDTH - PAGE_MARGIN * 2 - (safeCols - 1) * gapX;
    const heightBudget = LETTER_HEIGHT - PAGE_MARGIN * 2 - (safeRows - 1) * gapY;

    const computedCellWidth = Math.max(8, widthBudget / safeCols);
    const computedCellHeight = Math.max(8, heightBudget / safeRows);

    return {
      cellWidth: computedCellWidth,
      cellHeight: computedCellHeight,
      cells: [
        { row: 0, col: 0, fill: "#e6fffa" },
        { row: safeRows - 1, col: safeCols - 1, fill: "#fff5f5" },
      ],
    };
  }, [safeCols, safeRows, gapX, gapY]);

  const panel = (
    <SidebarSection id="rectboard-layout" title="Letter Layout (8.5x11)">
      <Stack spacing={3}>
        <Text fontSize="sm" color="gray.600">
          Grid is auto-sized to stay inside a portrait 8.5x11 page.
        </Text>

        <FormControl>
          <FormLabel>Rows</FormLabel>
          <Input
            type="number"
            min={1}
            value={rows}
            onChange={(e) => setRows(clampPositiveInt(Number(e.target.value), 11))}
          />
        </FormControl>

        <FormControl>
          <FormLabel>Columns</FormLabel>
          <Input
            type="number"
            min={1}
            value={cols}
            onChange={(e) => setCols(clampPositiveInt(Number(e.target.value), 8))}
          />
        </FormControl>

        <FormControl>
          <FormLabel>Horizontal Gap</FormLabel>
          <Input
            type="number"
            min={0}
            value={gapX}
            onChange={(e) => setGapX(Math.max(0, Number(e.target.value) || 0))}
          />
        </FormControl>

        <FormControl>
          <FormLabel>Vertical Gap</FormLabel>
          <Input
            type="number"
            min={0}
            value={gapY}
            onChange={(e) => setGapY(Math.max(0, Number(e.target.value) || 0))}
          />
        </FormControl>

        <Text fontSize="sm">Cell size: {cellWidth.toFixed(1)} x {cellHeight.toFixed(1)}</Text>
      </Stack>
    </SidebarSection>
  );

  return (
    <AppWrapper
      title="RectBoard Demo"
      initialState={undefined}
      renderSVG={() => (
        <Box width="min(80vw, 54vh)" maxHeight="88vh" border="1px solid" borderColor="gray.300">
          <RectBoard
            rows={safeRows}
            cols={safeCols}
            cellWidth={cellWidth}
            cellHeight={cellHeight}
            gapX={gapX}
            gapY={gapY}
            originX={PAGE_MARGIN}
            originY={PAGE_MARGIN}
            fill="#f7fafc"
            stroke="#1a202c"
            strokeWidth={1}
            cells={cells}
            viewBox={`0 0 ${LETTER_WIDTH} ${LETTER_HEIGHT}`}
            width="100%"
            height="100%"
          />
        </Box>
      )}
      renderControls={() => panel}
    />
  );
}
