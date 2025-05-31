


export interface StopListResponse {
  data: StopResource[];
  jsonapi: {
    version: string;
  };
  links: PaginationLinks;
}

export interface PaginationLinks {
  first: string;
  last: string;
  next?: string;
  prev?: string;
}

export interface StopResource {
  id: string;
  type: "stop";
  attributes: StopAttributes;
  links: {
    self: string;
  };
  relationships: StopRelationships;
}

export interface StopAttributes {
  address: string | null;
  at_street: string | null;
  description: string | null;
  latitude: number;
  location_type: 0 | 1 | 2 | 3;
  longitude: number;
  municipality: string | null;
  name: string;
  on_street: string | null;
  platform_code: string | null;
  platform_name: string | null;
  vehicle_type: number | null;
  wheelchair_boarding: 0 | 1 | 2;
}

export interface StopRelationships {
  facilities: {
    links: {
      related: string;
    };
  };
  parent_station: {
    data: {
      id: string;
      type: string;
    } | null;
  };
  zone: {
    data: {
      id: string;
      type: string;
    } | null;
  };
}
