import { FunctionComponent } from 'react';
import ReactModal from 'react-modal';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import Container from 'components/Container';

ReactModal.setAppElement('#__next');

const TRANSITION_TIME_MS = 150;

const Modal: FunctionComponent<
  Omit<ReactModal.Props, 'onRequestClose'> & {
    onClose: () => void;
    blockDrag?: boolean; // Eg. to block drag when selecting text in inputs
    fullScreen?: boolean;
  }
> = ({ children, onClose, blockDrag, fullScreen, ...props }) => {
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
        {/* Keep the modal content around while it closes */}
        <AnimatePresence>
          {props.isOpen && (
            <motion.div
              className="Modal_Content"
              transition={{ duration: TRANSITION_TIME_MS }}
              animate={controls}
              drag={blockDrag ? false : 'y'}
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
              <Container>{children}</Container>
            </motion.div>
          )}
        </AnimatePresence>
      </ReactModal>
      <style jsx>
        {`
          :global(.ReactModal_Overlay) {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: transparent;
          }
          :global(.ReactModal_Content) {
            position: absolute;
            ${fullScreen ? `top: 0;` : ''}
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
          :global(.Modal_Content) {
            ${fullScreen ? `min-height: 100%;` : ''}
            background-color: #fff;
            box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);
          }
        `}
      </style>
    </>
  );
};

export default Modal;
