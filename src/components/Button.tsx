import * as React from 'react';
import { MouseEvent, FunctionComponent } from 'react';
import Loader from 'components/Loader';

export type Color = 'green' | 'red' | 'gray' | 'disabled';

type Props = {
  className?: string;
  color?: Color;
  inline?: boolean;
  disabled?: boolean;
  state?: null | 'loading';
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  group?: boolean;
  type?: 'button' | 'submit';
};

const colors: { [color in Color]: string } = {
  gray: 'bg-gray-100 text-emerald-500 hover:text-emerald-600',
  green: 'bg-emerald-400 text-white hover:bg-emerald-500',
  red: 'bg-red-400 text-white hover:bg-red-500',
  disabled: 'bg-gray-300 text-white',
};

const lightColors: Array<Color> = ['gray', 'disabled'];

const defaultColor = 'gray';

export const getButtonStyle = ({
  className = '',
  color = defaultColor,
  inline = false,
  disabled = false,
  group = false,
}: Pick<Props, 'className' | 'color' | 'inline' | 'disabled' | 'group'>) => {
  const composedClassName = [
    `font-display font-semibold py-3 px-3 items-center justify-center`,
    colors[disabled ? 'disabled' : color],
    group ? 'first:rounded-l last:rounded-r' : 'rounded',
    inline ? 'inline-flex' : 'flex w-full',
    className,
  ].join(' ');

  const isLight = lightColors.includes(color);

  return { color, isLight, className: composedClassName };
};

const Button: FunctionComponent<Props> = (props) => {
  const {
    disabled = false,
    state = null,
    onClick,
    children,
    type = 'button',
  } = props;
  const { className, isLight } = getButtonStyle(props);

  /* eslint-disable react/button-has-type */
  const isDisabled = state === 'loading' || disabled;
  return (
    <button
      className={className}
      {...(isDisabled ? {} : { onClick })}
      disabled={isDisabled}
      type={type}
    >
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
    </button>
  );
};

export default Button;
