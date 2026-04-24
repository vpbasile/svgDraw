import { RouteObject, useRoutes } from "react-router-dom";
import { BASE_PATH, featureModules } from "./common/featureRegistry";
import PlaceHolderBoard from './common/placeHolderSVG';

function NotFound() {
  return <div>Page not found!</div>;
}

function App() {
  const featureRoutes: RouteObject[] = featureModules.map(({ segment, routes }) => ({
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
        ...featureRoutes,
        { path: '*', element: <NotFound /> },
      ],
    },
    { path: '*', element: <NotFound /> },
  ];

  return useRoutes(routes);
}

export default App;
