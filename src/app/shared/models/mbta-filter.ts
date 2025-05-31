import { LocationType } from "../enum/location_type";
import { RouteType } from "../enum/route_type";

export interface MBTAFilter {
    route_type?: RouteType
    location_type?: LocationType
}

export type FilterName = 'location_type'|'route_type'
