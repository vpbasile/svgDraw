import SavedBoard from "./boards/hex-SavedBoard";
import TriviaBoard from "./boards/new-TriviaBoard";
import DummyBoard from "./dummyBoard";

export type boardDef = {
    uid: string;
    displayName: string;
    element: JSX.Element;
};

// Each element in the list should be an implementation of SVGWrapper

export const boardList: boardDef[] = [
    { uid: 'dummy', displayName: 'Dummy Board', element: <DummyBoard /> },
    { uid: 'trivia', displayName: 'Trivia Board', element: <TriviaBoard /> },
    { uid: 'saved', displayName: 'Saved Board', element: <SavedBoard /> },
    // Other boards can be added here...
];