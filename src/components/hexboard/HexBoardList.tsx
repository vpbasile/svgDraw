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
    // Other boards can be added here...
];