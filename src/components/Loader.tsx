import { FunctionComponent } from 'react';

type Props = { inline?: boolean; light?: boolean };

const Loader: FunctionComponent<Props> = ({
  inline = false,
  light = false,
}) => {
  return (
    <>
      <div className="loader rounded-full" />
      <style jsx>
        {`
          .loader {
            ${inline ? 'display: inline-block;' : ''}
            border: 0.1em solid ${light ? 'rgba(255,255,255,0.4)' : '#f3f3f3'};
            border-top: 0.1em solid
              ${light ? 'rgba(255,255,255,0.8)' : '#3498db'};
            width: 1em;
            height: 1em;
            animation: spin 1s linear infinite;
          }

          @keyframes spin {
            0% {
              transform: rotate(0deg);
            }
            100% {
              transform: rotate(360deg);
            }
          }
        `}
      </style>
    </>
  );
};

export default Loader;
