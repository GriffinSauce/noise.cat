import { FunctionComponent } from 'react';
import ReactModal from 'react-modal';
import css from 'styled-jsx/css'; // eslint-disable-line import/no-extraneous-dependencies
import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import Container from 'components/Container';

const TRANSITION_TIME_MS = 150;

// Custom scoped styles that depend on order of declaration + transition time constant
const { className, styles } = css.resolve`
  div {
    transition: transform ${TRANSITION_TIME_MS}ms ease;
    transform: translateY(100%);
  }
  div.after-open {
    transform: translateY(0%);
  }
  div.before-close {
    transform: translateY(100%);
  }
`;

const Modal: FunctionComponent<
  Omit<ReactModal.Props, 'onRequestClose'> & {
    onClose: () => void;
    blockDrag?: boolean; // Eg. to block drag when selecting text in inputs
    fullScreen?: boolean;
  }
> = ({ children, isOpen, blockDrag, fullScreen, onClose, ...props }) => {
  const controls = useAnimation();
  return (
    <>
      <ReactModal
        {...props}
        isOpen={isOpen}
        onRequestClose={onClose}
        closeTimeoutMS={TRANSITION_TIME_MS}
        overlayClassName="fixed inset-0 bg-transparent"
        className={{
          base: `${className} outline-none absolute ${
            fullScreen ? 'inset-0' : 'inset-x-0 bottom-0'
          }`,
          afterOpen: 'after-open',
          beforeClose: 'before-close',
        }}
      >
        {/* Keep the modal content around while it closes */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className={`shadow-drawer bg-white ${
                fullScreen ? 'min-h-full' : ''
              }`}
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
      {styles}
    </>
  );
};

export default Modal;
