import { useState } from 'react';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import { FiX } from 'react-icons/fi';
import { useForm } from 'react-hook-form';
import fetcher from '../../../utils/fetcher';
import Layout from '../../../components/Layout';
import Container from '../../../components/Container';
import Button from '../../../components/Button';
import Modal from '../../../components/Modal';
import Links from '../../../components/Links';

const FormError = ({ children }: { children: string }) => (
  <span className="text-xs font-semibold absolute">{children}</span>
);

const LinksPage = () => {
  const {
    query: { band: slug },
  } = useRouter();

  const { data, mutate } = useSWR<{
    band: Band;
  }>(slug ? `/api/bands/${slug}` : null);

  const [isFormOpen, setFormOpen] = useState(false);
  const openForm = () => setFormOpen(true);
  const closeForm = () => setFormOpen(false);
  const { handleSubmit, register, errors } = useForm();
  const [postState, setPostState] = useState<null | 'loading'>(null);

  const onSubmit = handleSubmit(async (link) => {
    setPostState('loading');
    try {
      await fetcher(`/api/bands/${slug}/links`, {
        method: 'POST',
        body: {
          link,
        },
      });
    } catch (err) {
      console.error(err);
      return;
    }
    setPostState(null);
    closeForm();
    mutate();
    // mutate({
    //   band: {
    //     ...data.band,
    //     links: [...data.band.links, link],
    //   },
    // });
  });

  return (
    <Layout>
      <Container>
        <div className="p-4">
          <Links slug={slug as string} links={data?.band?.links || []} />
          <Button onClick={openForm}>Add link</Button>
        </div>
      </Container>
      <Modal
        isOpen={isFormOpen}
        onClose={closeForm}
        className="Modal"
        overlayClassName="Overlay"
      >
        <div className="text-right">
          <button
            type="button"
            className="text-2xl text-gray-500 p-4"
            onClick={closeForm}
          >
            <FiX />
          </button>
        </div>
        <form onSubmit={onSubmit} className="p-4 pt-0">
          <div className="grid grid-cols-2 pb-10 gap-4">
            <label htmlFor="link-title">
              Title
              <input
                id="link-title"
                name="title"
                placeholder="Stagepl..."
                ref={register({
                  required: 'What is it?',
                })}
              />
              <FormError>{errors?.title?.message}</FormError>
            </label>
            <label htmlFor="link-url">
              Paste a url
              <input
                id="link-url"
                name="url"
                placeholder="https://w..."
                ref={register({
                  required: 'Where is it?',
                })}
              />
              <FormError>{errors?.url?.message}</FormError>
            </label>
          </div>
          <Button color="green" type="submit" state={postState}>
            Add link
          </Button>
        </form>
      </Modal>
    </Layout>
  );
};

export default LinksPage;
