import * as React from 'react';
import Loader from '../components/Loader';

export default {
  title: 'Loader',
};

export const Default = () => <Loader />;

export const Light = () => <Loader light />;

export const Inline = () => <Loader inline />;
