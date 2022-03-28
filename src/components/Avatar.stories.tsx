import * as React from 'react';
import Avatar from 'components/Avatar';

export default {
  title: 'Avatar',
};

export const Placeholder = () => <Avatar src={undefined} alt={undefined} />;
export const Loading = () => <Avatar src={undefined} alt={undefined} loading />;
export const Default = () => (
  <Avatar alt="Mr. Lego" src="https://randomuser.me/api/portraits/lego/1.jpg" />
);
