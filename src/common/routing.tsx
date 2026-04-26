import { ReactNode } from "react";

export interface ModuleRoute {
  path: string;
  element: ReactNode;
}

export function indexRoute(element: ReactNode): ModuleRoute {
  return { path: "", element };
}

export function route(path: string, element: ReactNode): ModuleRoute {
  return { path, element };
}
