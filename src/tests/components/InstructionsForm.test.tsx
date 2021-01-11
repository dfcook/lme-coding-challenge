import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { InstructionsForm } from '../../client/components/InstructionsForm';

describe('InstructionsForm', () => {
  test('Errors with no input', async () => {
    const nullOp = () => null;
    render(<InstructionsForm onSubmit={nullOp} />);
    const instructionsTextArea = screen.getByLabelText('Instructions');

    userEvent.type(instructionsTextArea, 'foo');
    expect(instructionsTextArea).toHaveValue('foo');

    userEvent.clear(instructionsTextArea);
    expect(instructionsTextArea).toHaveValue('');

    fireEvent.blur(instructionsTextArea);
    const errorText = await screen.findByText('instructions is a required field');

    expect(errorText).not.toBeNull();
  });

  test('Submits when instructions supplied', async () => {
    const onSubmit = jest.fn();
    render(<InstructionsForm onSubmit={onSubmit} />);

    const instructionsTextArea = screen.getByLabelText('Instructions');
    userEvent.type(instructionsTextArea, 'foo');

    const submitButton = screen.getByRole('submit');
    await waitFor(() => {
      userEvent.click(submitButton);
    });

    expect(onSubmit).toHaveBeenCalledWith({ instructions: 'foo' }, expect.any(Object));
  });
});
