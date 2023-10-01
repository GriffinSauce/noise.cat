import * as React from 'react';
import Button from 'components/Button';

const meta = {
  title: 'Button',
};
export default meta;

export const Default = () => <Button>Hello Button</Button>;

export const Gray = () => <Button color="gray">Hello Button</Button>;

export const Green = () => <Button color="green">Hello Button</Button>;

export const GrayLoading = () => (
  <Button color="gray" state="loading">
    Hello Button
  </Button>
);

export const GreenLoading = () => (
  <Button color="green" state="loading">
    Hello Button
  </Button>
);

export const Disabled = () => <Button disabled>Hello Button</Button>;
