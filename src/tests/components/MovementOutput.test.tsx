import React from 'react';
import { render, screen } from '@testing-library/react';

import { MovementOutput } from '../../client/components/MovementOutput';
import { Robot } from '../../client/types/robot';
import { Orientation } from '../../client/types/grid';

describe('MovementOutput', () => {
  test('Renders empty box when no robots supplied', async () => {
    render(<MovementOutput robots={[]} />);
    const outputBox = screen.getByTestId('output-container');

    expect(outputBox.childNodes.length).toBe(0);
  });

  test('Renders robots with correct text', async () => {
    const robots: Robot[] = [
      {
        location: { x: 1, y: 1 },
        orientation: Orientation.E,
        lost: false,
      },
      {
        location: { x: 3, y: 3 },
        orientation: Orientation.N,
        lost: true,
      },
      {
        location: { x: 2, y: 3 },
        orientation: Orientation.S,
        lost: false,
      },
    ];

    render(<MovementOutput robots={robots} />);
    const outputBox = screen.getByTestId('output-container');

    expect(outputBox.childNodes.length).toBe(3);
    expect(outputBox.childNodes[0]).toHaveTextContent('1 1 E');
    expect(outputBox.childNodes[1]).toHaveTextContent('3 3 N LOST');
    expect(outputBox.childNodes[2]).toHaveTextContent('2 3 S');
  });
});
