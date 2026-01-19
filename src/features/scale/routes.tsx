import { ReactNode } from "react";
import Temperatures from "./Temperatures";

export const scaleRoutes: { path: string; element: ReactNode }[] = [
  { path: 'temperatures', element: <Temperatures /> },
];
