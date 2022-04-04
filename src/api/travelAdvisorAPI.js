import axios from "axios";
export const getPlaces = async (type, sw, ne) => {
  try {
    const response = await axios.get(
      "https://travel-advisor.p.rapidapi.com/" + type + "/list-in-boundary",
      {
        params: {
          bl_latitude: sw.lat,
          tr_latitude: ne.lat,
          bl_longitude: sw.lng,
          tr_longitude: ne.lng,
        },
        headers: {
          "X-RapidAPI-Host": "travel-advisor.p.rapidapi.com",
          "X-RapidAPI-Key":
            "d318eb790amshbd4fbd3763c7bc9p18bf43jsn6e5c9871bee0",
        },
      }
    );
    return response.data.data;
    // console.log(response.data.data);
  } catch (error) {
    console.log(error);
  }
};
