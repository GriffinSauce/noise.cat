import * as React from 'react';
import { MouseEvent } from 'react';
import Loader from 'components/Loader';
import { Color, getButtonStyle } from './Button';

type Props = {
  children: React.ReactNode;
  href?: string;
  className?: string;
  color?: Color;
  inline?: boolean;
  state?: null | 'loading';
  onClick?: (event: MouseEvent<HTMLAnchorElement>) => void;
  group?: boolean;
};

const ButtonLink = React.forwardRef<HTMLAnchorElement, Props>((props) => {
  const { href, state = null, onClick, children } = props;
  const { className, isLight } = getButtonStyle(props);

  return (
    <a className={className} href={href} onClick={onClick}>
      {state === 'loading' ? (
        <>
          <div className="opacity-0">{children}</div>
          <div className="absolute">
            <Loader light={!isLight} />
          </div>
        </>
      ) : (
        children
      )}
    </a>
  );
});

export default ButtonLink;
