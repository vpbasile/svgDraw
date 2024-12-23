import CandyLand from "./boards/candyLand";
import CreateBoard from "./boards/hex-CreateBoard";
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
    // Other boards can be added here...
];