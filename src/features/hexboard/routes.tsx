import { Grid } from "@chakra-ui/react";
import { ReactNode } from "react";
import CandyLand from "./boards/candyLand";
import Cataan from "./boards/cataan";
import CreateBoard from "./boards/createBoard";
import GenerativeBoard from "./boards/generative";
import SavedBoard from "./boards/hex-SavedBoard";
import TriviaBoard from "./boards/TriviaBoard";
import HexBoardIndex from "./HexBoardIndex";

interface FeatureRoute {
  path: string;
  element: ReactNode;
}

export const hexBoardList = [
  { uid: 'trivia', displayName: 'Trivia Board', element: <TriviaBoard /> },
  { uid: 'saved', displayName: 'Saved Board', element: <SavedBoard /> },
  { uid: 'create', displayName: 'Create Board', element: <CreateBoard /> },
  { uid: 'generative', displayName: 'Generative Board', element: <GenerativeBoard /> },
  { uid: 'candy', displayName: 'Candy Land', element: <CandyLand /> },
  { uid: 'cataan', displayName: 'Cataan', element: <Cataan /> },
  { uid: 'grid', displayName: 'Grid', element: <Grid /> },
  // Other boards can be added here...
];

export const hexboardRoutes: FeatureRoute[] = [
  { path: '', element: <HexBoardIndex /> },
  ...hexBoardList.map(({ uid, element }) => ({ path: uid, element })),
  { path: '*', element: <div>Board not found!</div> },
];
