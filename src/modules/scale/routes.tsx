import { ModuleRoute, route } from "../../common/routing";
import Temperatures from "./Temperatures";

export const scaleRoutes: ModuleRoute[] = [
  route('temperatures', <Temperatures />),
];
