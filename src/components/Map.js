import { Box, makeStyles, Paper, Typography } from "@material-ui/core";
import React from "react";
import GoogleMapReact from "google-map-react";
import { LocationOnOutlined } from "@material-ui/icons";
import { Rating } from "@material-ui/lab";

const useStyles = makeStyles((theme) => ({
  mapContainer: {
    height: "85vh",
    width: "100%",
  },
  paper: {
    width: 100,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: 10,
  },
  cardImage: {
    height: 85,
    width: 85,
    cursor: "pointer",
  },
}));

export default function Map({
  places,
  coords,
  setBounds,
  setCoords,
  setChildClicked,
}) {
  const classes = useStyles();
  return (
    <Box className={classes.mapContainer}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyBh-PQ2zGONxOXNJfDAjUmEXbExTLSWYIs" }}
        defaultZoom={8}
        defaultCenter={coords}
        center={coords}
        margin={[50, 50, 50, 50]}
        options={{ disableDefaultUI: true, zoomControl: true }}
        onChange={(event) => {
          setCoords({ lat: event.center.lat, lan: event.center.lng });
          setBounds({ ne: event.marginBounds.ne, sw: event.marginBounds.sw });
        }}
        onChildClick={(child) => setChildClicked(child)}
      >
        {places.length > 0 &&
          places.map((place, index) => (
            <div>
              lat={place.latitude}
              lng={place.longitude}
              key={index}
              <LocationOnOutlined color="primary" fontSize="large" />
              <Paper className={classes.paper}>
                <Typography>{place.name}</Typography>
                <img
                  className={classes.cardImage}
                  src={
                    place.photo
                      ? place.photo.images.large.url
                      : "https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg"
                  }
                  alt=""
                />
                <Rating readOnly size={"small"} value={Number(place.rating)} />
              </Paper>
            </div>
          ))}
      </GoogleMapReact>
    </Box>
  );
}
