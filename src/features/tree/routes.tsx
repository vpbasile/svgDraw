import { ReactNode } from "react";
import TreeExample from "./example";

export const treeRoutes: { path: string; element: ReactNode }[] = [
  { path: '', element: <TreeExample /> },
];
