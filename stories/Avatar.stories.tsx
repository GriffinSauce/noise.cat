import * as React from 'react';
import Avatar from '../components/Avatar';

export default {
  title: 'Avatar',
};

export const Placeholder = () => <Avatar />;
export const Loading = () => <Avatar loading />;
export const Default = () => (
  <Avatar alt="Mr. Lego" src="https://randomuser.me/api/portraits/lego/1.jpg" />
);
