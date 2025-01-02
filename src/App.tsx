// App.tsx 

// TODO: Allow for svgs to be added and included on a hex, like the special spaces in Candy Land.
// TODO: Come up with a color scheme for Candy Land.  The current one hurts my eyes.

import { Route, Routes } from "react-router-dom";
import HexBoardIndex from "./components/hexboard/HexBoardIndex";
import { hexBoardList } from "./components/hexboard/HexBoardList";
import PlaceHolderBoard from "./components/placeHolderSVG";
import TreeExample from "./components/tree/example";

function App() {

  return (
    // {/* Routes nest inside one another. Nested route paths build upon
    //         parent route paths, and nested route elements render inside
    //         parent route elements. See the note about <Outlet> below. */}

    <Routes >
      <Route path='/svgdraw/'>
        <Route index element={<PlaceHolderBoard />} />
        <Route path="tree" element={<TreeExample />} />
        <Route path="hex/*" >
          <Route path="" element={<HexBoardIndex />} />
          {hexBoardList.map(({ uid, element }) => (
            <Route key={`${uid}`} path={uid} element={element} />
          ))}
          <Route path="*" element={<div>Board not found!</div>} />
        </Route>
      </Route >
    </Routes >
  )
}

export default App
