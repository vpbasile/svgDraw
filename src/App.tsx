import { Route, Routes } from "react-router-dom";
import Layout from "./components/layout";
import Home from "./Homepage";
import TreeExample from "./tree/example";

function App() {

  return (
    // {/* Routes nest inside one another. Nested route paths build upon
    //         parent route paths, and nested route elements render inside
    //         parent route elements. See the note about <Outlet> below. */}

    < Routes >
      <Route path='/' element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="tree" element={<TreeExample />} />
      </Route>
    </Routes >
  )
}

export default App
