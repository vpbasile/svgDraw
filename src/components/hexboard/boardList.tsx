import TriviaBoard from "./boards/hex-TriviaBoard";
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
    // Other boards can be added here...
];