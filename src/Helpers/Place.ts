import { Between } from "typeorm";
import { Places } from "../Entities/Places";

export async function getPlacesByLocationDistance(latitude:number, longitude:number, distance:number) {
  const minLatitude = latitude - distance / 111.32;
  const maxLatitude = latitude + distance / 111.32;
  const minLongitude = longitude - distance / (111.32 * Math.cos((latitude * Math.PI) / 180));
  const maxLongitude = longitude + distance / (111.32 * Math.cos((latitude * Math.PI) / 180));
  const places = await Places.find({
    where: {
      plc_latitude: Between(minLatitude, maxLatitude),
      plc_longtitude: Between(minLongitude, maxLongitude),
    },
    relations:['place_tags']
  });
  return places;
}
