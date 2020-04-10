import Modal from 'react-modal';
import { useState } from 'react';
import Layout from '../../../components/Layout';
import Container from '../../../components/Container';
import Button from '../../../components/Button';

Modal.setAppElement('#__next');

const Links = () => {
  // const [isFormOpen, setFormOpen] = useState(false);
  const [isFormOpen, setFormOpen] = useState(true);
  const openForm = () => setFormOpen(true);
  const closeForm = () => setFormOpen(false);

  return (
    <Layout>
      <Container>
        <div className="p-4">
          <Button onClick={openForm}>Add link</Button>
        </div>
      </Container>
      <Modal
        isOpen={isFormOpen}
        onRequestClose={closeForm}
        className="Modal"
        overlayClassName="Overlay"
      >
        <div className="p-4">Add links form</div>
      </Modal>
      <style jsx>{`
        :global(.Modal) {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          background-color: #fff;
          box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);
        }
        :global(.Modal:focus) {
          outline: none; // TODO: is this ok A11Y-wise?
        }
        :global(.Overlay) {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.1);
        }
      `}</style>
    </Layout>
  );
};

export default Links;
