import { ModuleRoute, route } from "../../routing";
import Temperatures from "./Temperatures";

// [ ] Add a module for displaying a scale, such as a tempaerature scale, a pH scale, or a Richter scale. This module would be useful for visualizing data that is measured on a scale, such as temperature readings, pH levels, or earthquake magnitudes. The module could include a slider for adjusting the scale range and a display area for showing the current value on the scale.
export const scaleRoutes: ModuleRoute[] = [
  route('temperatures', <Temperatures />),
];
