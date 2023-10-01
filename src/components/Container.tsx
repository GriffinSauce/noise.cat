import { FunctionComponent } from 'react';

interface Props {
  children?: React.ReactNode;
}

const Container: FunctionComponent<Props> = ({ children }) => {
  return <div className="container mx-auto">{children}</div>;
};

export default Container;
