import { PlaceImages } from "../Entities/PlaceImages";
import { PlaceTags } from "../Entities/PlaceTags";
import { Places } from "../Entities/Places";
import axios from 'axios';

const GOOGLE_PLACES_API_KEY = 'AIzaSyCpOchsSuHzhfXTrk4GAg7HjA6SnsuFxI4';

async function fetchPlaces(location:string, radius:number,type:string ,nextPageToken = null) {
  const baseUrl = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json';
  const params: { [key: string]: any } = {
    location,
    radius,
    type,
    key: GOOGLE_PLACES_API_KEY,
  };

  if (nextPageToken) {
    params.pagetoken = nextPageToken;
  }

  try {
    const response = await axios.get(baseUrl, { params });
    return response.data;
  } catch (error) {
    console.error('Google Places API request error:', error);
    throw error;
  }
}

export async function fetchAndSavePlaces() {
    const initialLocation = '41.0082,28.9784'; // İstanbul'un koordinatları
    const types = 'tourist_attraction|park|shopping_mall|mosque|museum|restaurant|cafe|bar|historic_site|art_gallery';
    const radius = 1000; // İlgilenilen yarıçap (örneğin 1 km)
    let nextPageToken = null;
  
    do {
      const data = await fetchPlaces(initialLocation, radius, types,nextPageToken);
      const results = data.results;
      for (const item of results) {
          await savePlace(
              item.place_id,
              item.name,
              item.name,
              item.geometry.location.lng,
              item.geometry.location.lat,
              item.types
          );
      }
      nextPageToken = data.next_page_token;
      await new Promise((resolve) => setTimeout(resolve, 5000)); // 5 saniye bekleme
    } while (nextPageToken);
}
async function savePlace(plc_google_id:string,plc_name:string,plc_description:string,plc_longtitude:number,plc_latitude:number,plc_tags:string[]){
    const tags = await getTags(plc_tags);
    const isCreated = await isPlaceCreated(plc_google_id);
    console.log("Is Created",isCreated);
    if(!isCreated){
        console.log("If İçerisine Girdi.")
        const newPlace = new Places();
        newPlace.plc_google_id=plc_google_id;
        newPlace.plc_name=plc_name;
        newPlace.plc_description=plc_description;
        newPlace.plc_latitude=plc_latitude;
        newPlace.plc_longtitude=plc_longtitude;
        newPlace.place_tags=tags;
        await newPlace.save();
    }
}
async function getTags(dataTags:string[]){
    const returnTags=[];
    for (const tagItem of dataTags) {
        const existingTag = await PlaceTags.findOne({ where: { plc_tag_name: tagItem } });
          if (existingTag) {
            returnTags.push(existingTag);
          } else {
            const newTag = new PlaceTags();
            newTag.plc_tag_name = tagItem;
            await newTag.save();
            returnTags.push(newTag);
          }
    }
    return returnTags;
}
async function isPlaceCreated(plcGoogleId:string){
    const place = await Places.findOne({where:{plc_google_id:plcGoogleId}});
    
    if(place !== null){
        return true;
    }
    else{
        return false;
    }
}

export async function getPlacePhotos(plcGoogleId:string){
  console.log("FOTO FONKS",plcGoogleId);
  const placeDetailUrl = `https://maps.googleapis.com/maps/api/place/details/json?key=${GOOGLE_PLACES_API_KEY}&place_id=${plcGoogleId}`;
  const placeDetails = await axios.get(placeDetailUrl);
  const placePhotoReferences = placeDetails.data.result?.photos;
    if (!placePhotoReferences) {
      // If photos don't exist, return an empty array
      console.log("No photos found for", plcGoogleId);
      return [];
    }
    const photoUrls = await Promise.all(
    placePhotoReferences.map(async (item: any,index:number) => {
      const photoReferenceUrl = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=${item.photo_reference}&key=${GOOGLE_PLACES_API_KEY}`;
      const response = await axios.get(photoReferenceUrl);
      console.log(`Foto-${index}`,response.request.res.responseUrl)
      return response.request.res.responseUrl;
    })
  );
  return photoUrls;
}

export async function getPlacesandSavePhotos() {
  const places = await Places.find();
  for (const place of places) {
    const existingImages = await PlaceImages.find({where:{place:{plc_id:place.plc_id}}});
    if (existingImages.length > 0) {
      console.log(`Bu placein fotografı var ${place.plc_google_id}. Skipping.`);
      continue; // Skip to the next place
    }
    const photos = await getPlacePhotos(place.plc_google_id);
    console.log("PHOTOS",photos);
    if (photos && photos.length > 0) {
      const placeImages = await Promise.all(
        photos.map(async (item) => {
          const newPlaceImage = new PlaceImages();
          newPlaceImage.plc_img_url = item;
          newPlaceImage.place = place;
          await newPlaceImage.save();
          return newPlaceImage;
        })
      );
    }
  }
}




