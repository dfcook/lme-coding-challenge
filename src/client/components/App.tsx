import { Grid, Paper } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { FormikHelpers } from 'formik';
import React, { FunctionComponent, useState } from 'react';
import { processInstructions } from '../logic/instructionsProcessor';
import { Robot } from '../types/robot';
import { AppHeader } from './AppHeader';
import { Instructions } from './Instructions';
import { InstructionsForm, InstructionsFormValues } from './InstructionsForm';
import { MovementOutput } from './MovementOutput';

// This has to be imported last to ensure styles properly applied in production build
import { useStyles } from '../hooks/useStyles';

const App: FunctionComponent = () => {
  const classes = useStyles();
  const [output, setOutput] = useState<Robot[]>([]);
  const [error, setError] = useState<string>();

  const handleSubmit = (values: InstructionsFormValues, { setSubmitting }: FormikHelpers<InstructionsFormValues>) => {
    try {
      setOutput([]);
      setError('');

      const robots = processInstructions(values.instructions);
      setOutput(robots);
    } catch (e) {
      setError(e.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <main className={classes.layout}>
        <AppHeader />
        <Instructions />
        {error && <Alert severity="error">{error}</Alert>}
        <Grid container>
          <Paper elevation={1} className={classes.paper}>
            <InstructionsForm onSubmit={handleSubmit} />
          </Paper>
        </Grid>
        {output.length > 0 && <MovementOutput robots={output} />}
      </main>
    </>
  );
};

export default App;
