import { FeatureRoute, route } from "../../common/routing";
import Temperatures from "./Temperatures";

export const scaleRoutes: FeatureRoute[] = [
  route('temperatures', <Temperatures />),
];
