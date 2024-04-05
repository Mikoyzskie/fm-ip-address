export interface LocationData {
  country: string;
  region: string;
  city: string;
  lat: number;
  lng: number;
  postalCode: string;
  timezone: string;
  geonameId: number;
}

export interface AsData {
  asn: number;
  name: string;
  route: string;
  domain: string;
  type: string;
}

export interface Data {
  ip: string;
  location: LocationData;
  domains: string[];
  as: AsData;
  isp: string;
}
