import { Typography } from '@material-ui/core';
import React, { FunctionComponent } from 'react';

export const Instructions: FunctionComponent = () => (
  <>
    <Typography variant="h6" gutterBottom>
      Instructions
    </Typography>
    <Typography variant="body1" gutterBottom>
      Please enter your input in the box below and click "Submit"
    </Typography>
    <Typography variant="body2" gutterBottom>
      The first line of input is the upper-right coordinates of the rectangular world, the lower-left coordinates are
      assumed to be 0, 0.
      <br />
      <br />
      The remaining input consists of a sequence of robot positions and instructions (two lines per robot).
      <br />
      <br />
      A position consists of two integers specifying the initial coordinates of the robot and an orientation (N, S, E,
      W), all separated by whitespace on one line.
      <br />
      <br />A robot instruction is a string of the letters “L”, “R”, and “F” on one line.
    </Typography>
  </>
);
