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

  const [isDragBlocked, setDragBlocked] = useState(false);
  const blockDrag = () => setDragBlocked(true);
  const unblockDrag = () => setDragBlocked(false);

  const [isFormOpen, setFormOpen] = useState(false);
  const [editingLink, setEditingLink] = useState<null | Link>(null);

  const { handleSubmit, register, errors, reset } = useForm();
  const [postState, setPostState] = useState<null | 'loading'>(null);

  const closeForm = () => {
    setFormOpen(false);
    setEditingLink(null);
    reset({});
  };
  const addLink = () => setFormOpen(true);
  const editLink = (link: Link) => {
    setFormOpen(true);
    setEditingLink(link);
    reset(link);
  };

  const onSubmit = handleSubmit(async (link) => {
    setPostState('loading');
    try {
      if (editingLink) {
        await fetcher(`/api/bands/${slug}/links/${editingLink?._id}`, {
          method: 'PUT',
          body: {
            ...editingLink,
            link,
          },
        });
      } else {
        await fetcher(`/api/bands/${slug}/links`, {
          method: 'POST',
          body: {
            link,
          },
        });
      }
    } catch (err) {
      console.error(err);
      return;
    }
    setPostState(null);
    closeForm();
    mutate();
  });

  const onDelete = async () => {
    if (!editingLink) return;
    setPostState('loading');
    try {
      await fetcher(`/api/bands/${slug}/links/${editingLink._id}`, {
        method: 'DELETE',
      });
    } catch (err) {
      console.error(err);
      return;
    }
    setPostState(null);
    closeForm();
    mutate();
  };

  return (
    <Layout>
      <Container>
        <div className="p-4">
          <Links links={data?.band?.links || []} editLink={editLink} />
          <Button onClick={addLink}>Add link</Button>
        </div>
      </Container>
      <Modal
        isOpen={isFormOpen}
        onClose={closeForm}
        blockDrag={isDragBlocked}
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
          <div className="grid grid-cols-2 pb-8 gap-4">
            <label htmlFor="link-title">
              Title
              <input
                id="link-title"
                name="title"
                placeholder="Stagepl..."
                ref={register({
                  required: 'What is it?',
                })}
                onMouseEnter={blockDrag}
                onMouseLeave={unblockDrag}
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
                onFocus={(event) => event.target.select()}
                onMouseEnter={blockDrag}
                onMouseLeave={unblockDrag}
              />
              <FormError>{errors?.url?.message}</FormError>
            </label>
          </div>
          {editingLink ? (
            <div className="flex">
              <div className="flex-shrink-0 pr-4">
                <Button
                  color="red"
                  type="button"
                  state={postState}
                  onClick={onDelete}
                >
                  Remove
                </Button>
              </div>
              <div className="flex-grow">
                <Button color="green" type="submit" state={postState}>
                  Save changes
                </Button>
              </div>
            </div>
          ) : (
            <Button color="green" type="submit" state={postState}>
              Add link
            </Button>
          )}
        </form>
      </Modal>
    </Layout>
  );
};

export default LinksPage;
