import { FunctionComponent, MouseEvent } from 'react';
import ReactModal from 'react-modal';
import { motion, useAnimation } from 'framer-motion';

ReactModal.setAppElement('#__next');

const TRANSITION_TIME_MS = 150;

const Modal: FunctionComponent<
  Omit<ReactModal.Props, 'onRequestClose'> & {
    onClose: () => void;
  }
> = ({ children, onClose, ...props }) => {
  const controls = useAnimation();
  return (
    <>
      <ReactModal
        {...props}
        onRequestClose={onClose}
        closeTimeoutMS={TRANSITION_TIME_MS}
        className="ReactModal_Content"
        overlayClassName="ReactModal_Overlay"
      >
        <motion.div
          className="Modal_Content"
          animate={controls}
          drag="y"
          dragConstraints={{ top: 0 }}
          dragElastic={0}
          onDragEnd={(event, info) => {
            if (info.point.y > 30 || info.velocity.y > 200) {
              onClose();
              return;
            }

            // Or reset
            controls.start({
              y: 0,
              transition: { duration: 0.1 },
            });
          }}
        >
          {children}
        </motion.div>
      </ReactModal>
      <style jsx>{`
        :global(.Modal_Content) {
          background-color: #fff;
          box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);
        }
        :global(.ReactModal_Content) {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
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
