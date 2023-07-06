type Location = {
    valid: boolean;
    city?: string;
    country?: string;
    latitude?: number;
    longitude?: number;
    key?: string;
  };
  
export type LocationAPIResponse = {
  Key: string;
  LocalizedName: string;
  Country: {
    LocalizedName: string;
  }
}

export default Location;