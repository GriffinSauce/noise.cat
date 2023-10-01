import * as React from 'react';
import { MouseEvent, FunctionComponent } from 'react';
import Loader from 'components/Loader';

type Color = 'green' | 'red' | 'gray' | 'disabled';

type Props = {
  className?: string;
  color?: Color;
  inline?: boolean;
  disabled?: boolean;
  state?: null | 'loading';
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  children?: React.ReactNode;
  group?: boolean;
  type?: 'button' | 'submit';
};

const Button: FunctionComponent<Props> = ({
  className = '',
  color = 'gray',
  inline = false,
  disabled = false,
  state = null,
  onClick,
  children,
  group = false,
  type = 'button',
}) => {
  const colors: { [color in Color]: string } = {
    gray: 'bg-gray-100 text-emerald-500 hover:text-emerald-600',
    green: 'bg-emerald-400 text-white hover:bg-emerald-500',
    red: 'bg-red-400 text-white hover:bg-red-500',
    disabled: 'bg-gray-300 text-white',
  };
  const lightColors: Array<Color> = ['gray', 'disabled'];

  const rounded = group ? 'first:rounded-l last:rounded-r' : 'rounded';
  /* eslint-disable react/button-has-type */
  const isDisabled = state === 'loading' || disabled;
  return (
    <button
      className={`font-display font-semibold py-3 px-3 items-center justify-center ${rounded} ${
        colors[disabled ? 'disabled' : color]
      } ${inline ? 'inline-flex' : 'flex w-full'} ${className}`}
      {...(isDisabled ? {} : { onClick })}
      disabled={isDisabled}
      type={type}
    >
      {state === 'loading' ? (
        <>
          <div className="opacity-0">{children}</div>
          <div className="absolute">
            <Loader light={!lightColors.includes(color)} />
          </div>
        </>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
