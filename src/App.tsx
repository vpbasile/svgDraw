import { Route, Routes } from "react-router-dom";
import TreeExample from "./components/tree/example";
import Home from "./Homepage";

function App() {

  return (
    // {/* Routes nest inside one another. Nested route paths build upon
    //         parent route paths, and nested route elements render inside
    //         parent route elements. See the note about <Outlet> below. */}

    < Routes >
      <Route path='/'>
        <Route index element={<Home />} />
        <Route path="tree" element={<TreeExample />} />
      </Route>
    </Routes >
  )
}

export default App
