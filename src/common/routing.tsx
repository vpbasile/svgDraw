import { ReactNode } from "react";

export interface FeatureRoute {
  path: string;
  element: ReactNode;
}

export function indexRoute(element: ReactNode): FeatureRoute {
  return { path: "", element };
}

export function route(path: string, element: ReactNode): FeatureRoute {
  return { path, element };
}
