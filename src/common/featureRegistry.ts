import { hexBoardList, hexboardRoutes } from "../features/hexboard/routes";
import { rectBoardRoutes } from "../features/rectboard/routes";
// import { scaleRoutes } from "../features/scale/routes";
import { treeRoutes } from "../features/tree/routes";
import { FeatureRoute } from "./routing";

export const BASE_PATH = "/svgdraw";

export interface FeatureNavChild {
  path: string;
  label: string;
}

export interface FeatureModule {
  segment: string;
  label: string;
  routes: FeatureRoute[];
  navChildren?: FeatureNavChild[];
}

export const featureModules: FeatureModule[] = [
  { segment: "tree", label: "Tree", routes: treeRoutes },
  // { segment: "scale", label: "Scale", routes: scaleRoutes },
  {
    segment: "hex",
    label: "HexBoard",
    routes: hexboardRoutes,
    navChildren: hexBoardList.map(({ uid, displayName }) => ({
      path: uid,
      label: displayName,
    })),
  },
  { segment: "rect", label: "RectBoard", routes: rectBoardRoutes },
];
