import * as React from 'react';
import Button from '../components/Button';

export default {
  title: 'Button',
};

export const Default = () => <Button>Hello Button</Button>;

export const Gray = () => <Button color="gray">Hello Button</Button>;

export const Green = () => <Button color="green">Hello Button</Button>;

export const Disabled = () => <Button disabled>Hello Button</Button>;