// App.tsx 

import { Route, Routes } from "react-router-dom";
import HexBoardIndex from "./components/hexboard/HexBoardIndex";
import { hexBoardList } from "./components/hexboard/HexhexBoardList";
import TreeExample from "./components/tree/example";
import Home from "./Homepage";

function App() {

  return (
    // {/* Routes nest inside one another. Nested route paths build upon
    //         parent route paths, and nested route elements render inside
    //         parent route elements. See the note about <Outlet> below. */}

    <Routes >
      <Route path='/'>
        <Route index element={<Home />} />
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
