import { Box, Grid, Paper, Typography } from '@material-ui/core';
import { map } from 'ramda';
import React, { FunctionComponent } from 'react';
import { Robot } from '../types/robot';

interface MovementOutputProps {
  robots: Robot[];
}

export const MovementOutput: FunctionComponent<MovementOutputProps> = ({ robots }) => (
  <Grid container spacing={3}>
    <Grid item xs={12}>
      <Typography variant="h6" gutterBottom>
        Output
      </Typography>
    </Grid>

    <Grid item xs={12}>
      <Paper elevation={2}>
        <Box p={3} data-testid="output-container">
          {map(
            (robot) => (
              <Box key={`${robot.location.x}${robot.location.y}`} fontFamily="Monospace" fontSize="h6.fontSize">{`${
                robot.location.x
              } ${robot.location.y} ${robot.orientation} ${robot.lost ? 'LOST' : ''}`}</Box>
            ),
            robots,
          )}
        </Box>
      </Paper>
    </Grid>
  </Grid>
);
