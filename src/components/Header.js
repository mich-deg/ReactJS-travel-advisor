import React from "react";
import { AppBar, Toolbar, Typography, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  title: {
    fontSize: 24,
  },
}));

export default function Header() {
  const classes = useStyles();
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography className={classes.title}>
            Travel Advisor / ትራቭል አድቫይዘር
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}
