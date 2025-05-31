import { StopResource } from "../models/stop";
import { Feature, FeatureCollection, Point } from "geojson";


export function convertStopsToGeoJSON(stops: StopResource[]): FeatureCollection {
    let features: Feature<Point>[] = stops.map((stop) => ({
        type: "Feature",
        geometry: {
            type: "Point",
            coordinates: [stop.attributes.longitude, stop.attributes.latitude],
        },
        properties: {
            id: stop.id,
            name: stop.attributes.name,
            municipality: stop.attributes.municipality,
            description: stop.attributes.description,
            vehicle_type: stop.attributes.vehicle_type,
            wheelchair_boarding: stop.attributes.wheelchair_boarding,
            location_type: stop.attributes.location_type,
            zone: stop.relationships.zone?.data?.id ?? null,
            address: stop.attributes.address,
            at_street: stop.attributes.at_street,
            on_street: stop.attributes.on_street,
            platform_name: stop.attributes.platform_name,
            platform_code: stop.attributes.platform_code,
        },
    }));
    return {
        type: "FeatureCollection",
        features,
    };
}
