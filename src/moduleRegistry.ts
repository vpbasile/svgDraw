import { hexBoardList, hexboardRoutes } from "./modules/hexboard/routes";
// import { scaleRoutes } from "../modules/scale/routes";
import { bricksRoutes } from "./modules/bricks/routes";
import { treeRoutes } from "./modules/tree/routes";
import { ModuleRoute } from "./routing";

export const BASE_PATH = "/svgdraw";

interface FeatureNavChild {
  path: string;
  label: string;
}

interface Module {
  segment: string;
  label: string;
  routes: ModuleRoute[];
  navChildren?: FeatureNavChild[];
}

export const modules: Module[] = [
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
  { segment: "bricks", label: "Bricks", routes: bricksRoutes },
];
