/* eslint-env jest */
import '@testing-library/jest-dom';
import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';

import Button from '../Button';

test('Passed through classNames', async () => {
  render(<Button className="testing">Test</Button>);
  const button = screen.getByRole('button');
  expect(button).toHaveClass('testing');
});

test('Disabled does not call onClick', async () => {
  const onClick = jest.fn();
  render(
    <Button disabled onClick={onClick}>
      Test
    </Button>,
  );
  const button = screen.getByRole('button');
  fireEvent.click(button);
  expect(button).toHaveAttribute('disabled');
  expect(onClick).not.toHaveBeenCalled();
});

test('state "loading" sets disabled & does not call onClick', async () => {
  const onClick = jest.fn();
  render(
    <Button state="loading" onClick={onClick}>
      Test
    </Button>,
  );
  const button = screen.getByRole('button');
  fireEvent.click(button);
  expect(button).toHaveAttribute('disabled');
  expect(onClick).not.toHaveBeenCalled();
});
