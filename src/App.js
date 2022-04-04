import { CssBaseline, Grid } from "@material-ui/core";
import { useEffect, useState } from "react";
import { getPlaces } from "./api/travelAdvisorAPI";
import Header from "./components/Header";
import List from "./components/List";
import Map from "./components/Map";

function App() {
  const [type, setType] = useState("restaurants");
  const [isLoading, setIsLoading] = useState(false);
  const [places, setPlaces] = useState([]);
  const [coords, setCoords] = useState({});
  const [bounds, setBounds] = useState(null);
  const [childClicked, setchildClicked] = useState(null);
  useEffect(() => {
    if (bounds) {
      setIsLoading(true);
      getPlaces(type, bounds.ne, bounds.sw).then((data) => {
        setPlaces(data.filter((place) => place.name && place.num_reviews > 0));
        setIsLoading(false);
      });
    }
  }, [type, setPlaces.apply, bounds]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        setCoords({ lat: latitude, lng: longitude });
      }
    );
  }, []);
  return (
    <div>
      <CssBaseline />
      <Header />
      <Grid container style={{ width: "100%" }}>
        <Grid item={true} xs={12} md={4}>
          <List
            type={type}
            setType={(type) => {
              setType(type);
            }}
            childClicked={childClicked}
            isLoading={isLoading}
            places={places}
          />
        </Grid>
        <Grid item={true} xs={12} md={8}>
          <Map
            coords={coords}
            places={places}
            setBounds={(bounds) => setBounds(bounds)}
            setCoords={(coordinates) => setCoords(coordinates)}
            setchildClicked={(child) => setchildClicked(child)}
          />
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
