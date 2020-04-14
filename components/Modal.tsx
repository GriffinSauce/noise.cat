import { FunctionComponent } from 'react';
import ReactModal from 'react-modal';

ReactModal.setAppElement('#__next');

const TRANSITION_TIME_MS = 150;

const Modal: FunctionComponent<ReactModal.Props> = (props) => {
  return (
    <>
      <ReactModal
        {...props}
        closeTimeoutMS={TRANSITION_TIME_MS}
        className="ReactModal_Content"
        overlayClassName="ReactModal_Overlay"
      />
      <style jsx>{`
        :global(.ReactModal_Content) {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          background-color: #fff;
          box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);
          transition: transform ${TRANSITION_TIME_MS}ms ease;
          transform: translateY(100%);
        }
        :global(.ReactModal__Content--after-open) {
          transform: translateY(0%);
        }
        :global(.ReactModal__Content--before-close) {
          transform: translateY(100%);
        }
        :global(.ReactModal__Content:focus) {
          outline: none; // TODO: is this ok A11Y-wise?
        }
        :global(.ReactModal_Overlay) {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: transparent;
        }
      `}</style>
    </>
  );
};

export default Modal;
