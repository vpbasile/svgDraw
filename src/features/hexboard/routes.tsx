import { ReactNode } from "react";
import HexBoardIndex from "./HexBoardIndex";
import { hexBoardList } from "./HexBoardList";

interface FeatureRoute {
  path: string;
  element: ReactNode;
}

export const hexboardRoutes: FeatureRoute[] = [
  { path: '', element: <HexBoardIndex /> },
  ...hexBoardList.map(({ uid, element }) => ({ path: uid, element })),
  { path: '*', element: <div>Board not found!</div> },
];
