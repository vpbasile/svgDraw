import CandyLand from "./boards/candyLand";
import Cataan from "./boards/cataan";
import CreateBoard from "./boards/createBoard";
import SavedBoard from "./boards/hex-SavedBoard";
import TriviaBoard from "./boards/TriviaBoard";

export type boardDef = {
    uid: string;
    displayName: string;
    element: JSX.Element;
};

// Each element in the list should be an implementation of SVGWrapper

export const hexBoardList: boardDef[] = [
    { uid: 'trivia', displayName: 'Trivia Board', element: <TriviaBoard /> },
    { uid: 'saved', displayName: 'Saved Board', element: <SavedBoard /> },
    { uid: 'create', displayName: 'Create Board', element: <CreateBoard /> },
    { uid: 'candy' , displayName: 'Candy Land', element: <CandyLand /> },
    { uid: 'cataan', displayName: 'Cataan', element: <Cataan /> },
    // Other boards can be added here...
];