import {
    Box,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Input,
    Radio,
    RadioGroup,
    Stack,
    Text,
} from "@chakra-ui/react";
import { useMemo, useState } from "react";
import AppWrapper from "../../components/AppWrapper";
import SidebarSection from "../../components/SidebarSection";
import { DPI, PageSizeKey } from "../../config/pageSizeSettings";

const DEFAULT_PAGE_SIZE: PageSizeKey = "8.5x11";

type Unit = "px" | "in" | "mm";

type BricksState = {
  unit: Unit;
  areaWidth: string;
  areaHeight: string;
  pieceWidth: string;
  pieceHeight: string;
  gap: string;
  offsets: string;
};

type ParsedValues = {
  areaWidthPx: number;
  areaHeightPx: number;
  pieceWidthPx: number;
  pieceHeightPx: number;
  gapPx: number;
  offsetsPx: number[];
};

type Tile = {
  x: number;
  y: number;
  width: number;
  height: number;
};

const initialState: BricksState = {
  unit: "in",
  areaWidth: "8.5",
  areaHeight: "11",
  pieceWidth: "2",
  pieceHeight: "1",
  gap: "0.125",
  offsets: "0, 1",
};

function toPx(value: number, unit: Unit): number {
  if (unit === "px") return value;
  if (unit === "in") return value * DPI;
  return (value * DPI) / 25.4;
}

function parsePositiveNumber(label: string, raw: string, errors: string[]): number | null {
  const value = Number(raw);
  if (!Number.isFinite(value)) {
    errors.push(`${label} must be a valid number.`);
    return null;
  }
  if (value <= 0) {
    errors.push(`${label} must be greater than 0.`);
    return null;
  }
  return value;
}

function parseNonNegativeNumber(label: string, raw: string, errors: string[]): number | null {
  const value = Number(raw);
  if (!Number.isFinite(value)) {
    errors.push(`${label} must be a valid number.`);
    return null;
  }
  if (value < 0) {
    errors.push(`${label} must be 0 or greater.`);
    return null;
  }
  return value;
}

function parseOffsets(raw: string, errors: string[]): number[] {
  const trimmed = raw.trim();
  if (!trimmed) return [0];

  const parsed = trimmed
    .split(",")
    .map((token) => token.trim())
    .filter((token) => token.length > 0)
    .map((token) => Number(token));

  if (parsed.length === 0) return [0];
  if (parsed.some((value) => !Number.isFinite(value))) {
    errors.push("Offsets must be a comma-separated list of numbers (no unit suffixes).");
    return [0];
  }
  return parsed;
}

function buildTiles(values: ParsedValues): Tile[] {
  const {
    areaWidthPx,
    areaHeightPx,
    pieceWidthPx,
    pieceHeightPx,
    gapPx,
    offsetsPx,
  } = values;

  const stepX = pieceWidthPx + gapPx;
  const stepY = pieceHeightPx + gapPx;

  if (stepX <= 0 || stepY <= 0) return [];

  const tiles: Tile[] = [];
  for (let row = 0; row * stepY < areaHeightPx; row += 1) {
    const y = row * stepY;

    const rowOffset = offsetsPx[row % offsetsPx.length];
    const minCol = Math.floor((-pieceWidthPx - rowOffset) / stepX) + 1;
    const maxCol = Math.ceil((areaWidthPx - rowOffset) / stepX) - 1;

    for (let col = minCol; col <= maxCol; col += 1) {
      const x = rowOffset + col * stepX;
      const intersects = x < areaWidthPx && x + pieceWidthPx > 0 && y < areaHeightPx && y + pieceHeightPx > 0;
      if (!intersects) continue;
      tiles.push({ x, y, width: pieceWidthPx, height: pieceHeightPx });
    }

  }

  return tiles;
}



export default function BricksIndex() {
  const [state, setState] = useState<BricksState>(initialState);

  const parsed = useMemo(() => {
    const errors: string[] = [];

    const areaWidth = parsePositiveNumber("Area width", state.areaWidth, errors);
    const areaHeight = parsePositiveNumber("Area height", state.areaHeight, errors);
    const pieceWidth = parsePositiveNumber("Piece width", state.pieceWidth, errors);
    const pieceHeight = parsePositiveNumber("Piece height", state.pieceHeight, errors);
    const gap = parseNonNegativeNumber("Gap", state.gap, errors);
    const offsets = parseOffsets(state.offsets, errors);

    if (
      areaWidth === null
      || areaHeight === null
      || pieceWidth === null
      || pieceHeight === null
      || gap === null
    ) {
      return { errors, values: null as ParsedValues | null };
    }

    const values: ParsedValues = {
      areaWidthPx: toPx(areaWidth, state.unit),
      areaHeightPx: toPx(areaHeight, state.unit),
      pieceWidthPx: toPx(pieceWidth, state.unit),
      pieceHeightPx: toPx(pieceHeight, state.unit),
      gapPx: toPx(gap, state.unit),
      offsetsPx: offsets.map((value) => toPx(value, state.unit)),
    };

    return { errors, values };
  }, [state]);

  const tiles = useMemo(() => {
    if (!parsed.values || parsed.errors.length > 0) return [];
    return buildTiles(parsed.values);
  }, [parsed]);

  const bounds = useMemo(() => {
    if (!parsed.values) {
      return { minX: 0, minY: 0, maxX: 100, maxY: 100 };
    }

    const { areaWidthPx, areaHeightPx } = parsed.values;
    let minX = 0;
    let minY = 0;
    let maxX = areaWidthPx;
    let maxY = areaHeightPx;

    for (const tile of tiles) {
      minX = Math.min(minX, tile.x);
      minY = Math.min(minY, tile.y);
      maxX = Math.max(maxX, tile.x + tile.width);
      maxY = Math.max(maxY, tile.y + tile.height);
    }

    return { minX, minY, maxX, maxY };
  }, [parsed.values, tiles]);

  const viewPadding = 20;
  const viewX = bounds.minX - viewPadding;
  const viewY = bounds.minY - viewPadding;
  const viewWidth = Math.max(1, bounds.maxX - bounds.minX + viewPadding * 2);
  const viewHeight = Math.max(1, bounds.maxY - bounds.minY + viewPadding * 2);

  const hasErrors = parsed.errors.length > 0;

  const controls = (
    <SidebarSection id="bricks-controls" title="Bricks Tiling Controls">
      <Stack spacing={3}>
        <FormControl>
          <FormLabel>Unit</FormLabel>
          <RadioGroup
            value={state.unit}
            onChange={(value) => setState((prev) => ({ ...prev, unit: value as Unit }))}
          >
            <Stack direction="row" spacing={4}>
              <Radio value="px">px</Radio>
              <Radio value="in">in</Radio>
              <Radio value="mm">mm</Radio>
            </Stack>
          </RadioGroup>
        </FormControl>

        <FormControl isInvalid={parsed.errors.some((msg) => msg.startsWith("Area width"))}>
          <FormLabel>Drawing area width</FormLabel>
          <Input
            value={state.areaWidth}
            onChange={(e) => setState((prev) => ({ ...prev, areaWidth: e.target.value }))}
          />
          <FormErrorMessage>Area width must be greater than 0.</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={parsed.errors.some((msg) => msg.startsWith("Area height"))}>
          <FormLabel>Drawing area height</FormLabel>
          <Input
            value={state.areaHeight}
            onChange={(e) => setState((prev) => ({ ...prev, areaHeight: e.target.value }))}
          />
          <FormErrorMessage>Area height must be greater than 0.</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={parsed.errors.some((msg) => msg.startsWith("Piece width"))}>
          <FormLabel>Piece width</FormLabel>
          <Input
            value={state.pieceWidth}
            onChange={(e) => setState((prev) => ({ ...prev, pieceWidth: e.target.value }))}
          />
          <FormErrorMessage>Piece width must be greater than 0.</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={parsed.errors.some((msg) => msg.startsWith("Piece height"))}>
          <FormLabel>Piece height</FormLabel>
          <Input
            value={state.pieceHeight}
            onChange={(e) => setState((prev) => ({ ...prev, pieceHeight: e.target.value }))}
          />
          <FormErrorMessage>Piece height must be greater than 0.</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={parsed.errors.some((msg) => msg.startsWith("Gap"))}>
          <FormLabel>Gap (both X and Y)</FormLabel>
          <Input
            value={state.gap}
            onChange={(e) => setState((prev) => ({ ...prev, gap: e.target.value }))}
          />
          <FormErrorMessage>Gap must be 0 or greater.</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={parsed.errors.some((msg) => msg.startsWith("Offsets"))}>
          <FormLabel>Row offsets (comma-separated)</FormLabel>
          <Input
            value={state.offsets}
            onChange={(e) => setState((prev) => ({ ...prev, offsets: e.target.value }))}
            placeholder="0, 10, -5"
          />
          <FormErrorMessage>
            Offsets must be comma-separated numbers with no unit suffixes.
          </FormErrorMessage>
        </FormControl>

        {hasErrors ? (
          <Box p={2} border="1px solid" borderColor="red.300" borderRadius="md" bg="red.50">
            {parsed.errors.map((error) => (
              <Text key={error} fontSize="sm" color="red.700">
                {error}
              </Text>
            ))}
          </Box>
        ) : null}

        {parsed.values ? (
          <Text fontSize="sm" color="gray.700">
            Tiles rendered: {tiles.length} | DPI: {DPI}
          </Text>
        ) : null}
      </Stack>
    </SidebarSection>
  );

  return (
    <AppWrapper<BricksState>
      title="Bricks"
      defaultPageSize={DEFAULT_PAGE_SIZE}
      initialState={initialState}
      renderSVG={() => (
        <Box width="100%" height="100%">
          <svg
            width="100%"
            height="100%"
            viewBox={`${viewX} ${viewY} ${viewWidth} ${viewHeight}`}
            preserveAspectRatio="xMidYMid meet"
          >
            {parsed.values ? (
              <rect
                x={0}
                y={0}
                width={parsed.values.areaWidthPx}
                height={parsed.values.areaHeightPx}
                fill="none"
                // stroke="#1a202c"
                strokeWidth={1.5}
              />
            ) : null}

            {tiles.map((tile, idx) => (
              <rect
                key={`${tile.x}-${tile.y}-${idx}`}
                x={tile.x}
                y={tile.y}
                width={tile.width}
                height={tile.height}
                fill="none"
                // stroke="#2b6cb0"
                strokeWidth={0.75}
              />
            ))}
          </svg>
        </Box>
      )}
      renderControls={() => controls}
    />
  );
}
