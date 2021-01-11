import { AppBar, Toolbar, Typography } from "@material-ui/core";
import React, { FunctionComponent } from "react";
import { useStyles } from "../hooks/useStyles";

export const AppHeader: FunctionComponent = () => {
  const classes = useStyles();

  return (
    <AppBar position="absolute" color="default" className={classes.appBar}>
      <Toolbar className={classes.toolbar}>
        <Typography variant="h6" color="inherit" noWrap>
          Robots On Mars
      </Typography>
      </Toolbar>
    </AppBar>
  );
}