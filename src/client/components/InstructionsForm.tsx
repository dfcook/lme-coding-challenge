import { Grid, TextField, Button, Box } from '@material-ui/core';
import { Formik, Form, FormikHelpers } from 'formik';
import React, { FunctionComponent } from 'react';
import * as Yup from 'yup';

export interface InstructionsFormValues {
  instructions: string;
}

export interface InstructionsFormProps {
  onSubmit: (values: InstructionsFormValues, helpers: FormikHelpers<InstructionsFormValues>) => void;
}

export const InstructionsForm: FunctionComponent<InstructionsFormProps> = ({ onSubmit }) => {
  const initialValues: InstructionsFormValues = {
    instructions: '',
  };

  const schema = Yup.object().shape({
    instructions: Yup.string().required(),
  });

  return (
    <Formik validationSchema={schema} initialValues={initialValues} onSubmit={onSubmit}>
      {({ errors, handleBlur, handleChange, isSubmitting, isValid, touched, values }) => {
        return (
          <Form>
            <Grid item xs={12}>
              <TextField
                id="instructions"
                name="instructions"
                label="Instructions"
                multiline
                rows={7}
                value={values.instructions}
                fullWidth
                onBlur={handleBlur}
                onChange={handleChange}
                variant="outlined"
                helperText={errors.instructions}
                error={!!errors.instructions && !!touched.instructions}
              />
            </Grid>
            <Grid item xs={12}>
              <Box m={2} justifyContent="flex-end" display="flex">
                <Button
                  variant="contained"
                  role="submit"
                  color="primary"
                  disabled={!isValid || isSubmitting}
                  type="submit"
                >
                  Submit
                </Button>
              </Box>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};
