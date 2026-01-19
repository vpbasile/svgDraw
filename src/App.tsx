// App.tsx 

import { Route, Routes } from "react-router-dom";
import PlaceHolderBoard from "./common/placeHolderSVG";
import Temperatures from "./components/scale/Temperatures";
import TreeExample from "./components/tree/example";
import HexBoardIndex from "./features/hexboard/HexBoardIndex";
import { hexBoardList } from "./features/hexboard/HexBoardList";

function App() {

  return (
    // {/* Routes nest inside one another. Nested route paths build upon
    //         parent route paths, and nested route elements render inside
    //         parent route elements. See the note about <Outlet> below. */}

    <Routes >
      <Route path='/svgdraw/'>
        <Route index element={<PlaceHolderBoard />} />
        <Route path="/svgdraw/tree" element={<TreeExample />} />
        <Route path="/svgdraw/scale/temperatures" element={<Temperatures/>} />
        <Route path="/svgdraw/hex/*" >
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
