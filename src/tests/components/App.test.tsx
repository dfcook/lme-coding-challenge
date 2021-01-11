import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from '../../client/components/App';

describe('App', () => {
  test('Renders error alert with invalid input', async () => {
    render(<App />);
    const instructionsTextArea = screen.getByLabelText('Instructions');

    userEvent.type(instructionsTextArea, 'foo');

    const submitButton = screen.getByRole('submit');
    await waitFor(() => {
      userEvent.click(submitButton);
    });

    const alert = await screen.findByRole('alert');
    expect(alert).toHaveTextContent('Expected 2 co-ordinates for the surface of Mars, received 1');
  });

  test('generates correct output for supplied input', async () => {
    render(<App />);
    const instructionsTextArea = screen.getByLabelText('Instructions');

    userEvent.type(
      instructionsTextArea,
      `
      5 3
      1 1 E
      RFRFRFRF

      3 2 N
      FRRFLLFFRRFLL

      0 3 W
      LLFFFLFLFL
    `,
    );

    const submitButton = screen.getByRole('submit');
    await waitFor(() => {
      userEvent.click(submitButton);
    });

    const outputBox = await screen.findByTestId('output-container');

    expect(outputBox.childNodes.length).toBe(3);
    expect(outputBox.childNodes[0]).toHaveTextContent('1 1 E');
    expect(outputBox.childNodes[1]).toHaveTextContent('3 3 N LOST');
    expect(outputBox.childNodes[2]).toHaveTextContent('2 3 S');
  });
});
