import Loader from './Loader';

const Button = ({
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
  const colors = {
    gray: 'bg-gray-100 text-green-500 hover:text-green-600',
    green: 'bg-green-400 text-white hover:bg-green-500',
    disabled: 'bg-gray-300 text-white',
  };

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
      {state === 'loading' ? <Loader /> : children}
    </button>
  );
};

export default Button;
