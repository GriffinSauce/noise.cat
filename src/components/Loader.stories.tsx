import * as React from 'react';
import Loader from 'components/Loader';

const meta = {
  title: 'Loader',
};
export default meta;

export const Default = () => <Loader />;

export const Light = () => <Loader light />;

export const Inline = () => <Loader inline />;
