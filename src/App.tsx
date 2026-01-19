import { Outlet, Route, Routes } from "react-router-dom";
import PlaceHolderBoard from "./common/PlaceHolderSVG";
import { hexboardRoutes } from "./features/hexboard/routes";
import { scaleRoutes } from "./features/scale/routes";
import { treeRoutes } from "./features/tree/routes";

const BASE_PATH = "/svgdraw";

function NotFound() {
  return <div>Page not found!</div>;
}

function App() {
  return (
    <Routes>
      {/* Base path */}
      <Route path={`${BASE_PATH}/*`}>

        {/* Root /svgdraw */}
        <Route index element={<PlaceHolderBoard />} />

        {/* Tree feature */}
        <Route path="tree" element={<Outlet />}>
          {treeRoutes.map(({ path, element }) => (
            <Route key={path} path={path} element={element} />
          ))}
        </Route>

        {/* Scale feature */}
        <Route path="scale" element={<Outlet />}>
          {scaleRoutes.map(({ path, element }) => (
            <Route key={path} path={path} element={element} />
          ))}
        </Route>

        {/* Hexboard feature */}
        <Route path="hex" element={<Outlet />}>
          {hexboardRoutes.map(({ path, element }) => (
            <Route key={path} path={path} element={element} />
          ))}
        </Route>

        {/* Catch-all for anything else under /svgdraw */}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
