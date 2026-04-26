import { RouteObject, useRoutes } from "react-router-dom";
import { BASE_PATH, modules } from "./common/moduleRegistry";
import PlaceHolderBoard from './common/placeHolderSVG';

function NotFound() {
  return <div>Page not found!</div>;
}

function App() {
  const moduleRoutes: RouteObject[] = modules.map(({ segment, routes }) => ({
    path: segment,
    children: routes.map(({ path, element }) =>
      path === '' ? { index: true, element } : { path, element }
    ),
  }));

  const routes: RouteObject[] = [
    {
      path: `${BASE_PATH}`,
      children: [
        { index: true, element: <PlaceHolderBoard /> },
        ...moduleRoutes,
        { path: '*', element: <NotFound /> },
      ],
    },
    { path: '*', element: <NotFound /> },
  ];

  const renderedRoutes = useRoutes(routes);

  return renderedRoutes;
}

export default App;
