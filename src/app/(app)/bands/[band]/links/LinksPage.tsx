'use client';
import { useState } from 'react';
import useSWR from 'swr';
import { useParams } from 'next/navigation';
import { FiX } from 'react-icons/fi';
import { useForm } from 'react-hook-form';
import fetcher from 'lib/fetcher';
import Container from 'components/Container';
import Button from 'components/Button';
import Modal from 'components/Modal';
import Links from 'components/Links';

const FormError = ({ children }: { children: React.ReactNode }) => (
  <span className="absolute text-xs font-semibold">{children}</span>
);

const LinksPage = () => {
  const slug = useParams<{ band: string }>()?.band;

  const { data, mutate } = useSWR<{
    band: Band;
  }>(slug ? `/api/bands/${slug}` : null);

  const [isDragBlocked, setDragBlocked] = useState(false);
  const blockDrag = () => setDragBlocked(true);
  const unblockDrag = () => setDragBlocked(false);

  const [isFormOpen, setFormOpen] = useState(false);
  const [editingLink, setEditingLink] = useState<null | Link>(null);

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm();
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
    <>
      <Container>
        <div className="p-4">
          <h1 className="mb-3">Links</h1>
          <Links links={data?.band?.links} editLink={editLink} />
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
            className="p-4 text-2xl text-gray-500"
            onClick={closeForm}
          >
            <FiX />
          </button>
        </div>
        <form onSubmit={onSubmit} className="p-4 pt-0">
          <div className="grid grid-cols-2 gap-4 pb-8">
            <label htmlFor="link-title">
              Title
              <input
                id="link-title"
                placeholder="Stagepl..."
                {...register('title', {
                  required: 'What is it?',
                })}
                onMouseEnter={blockDrag}
                onMouseLeave={unblockDrag}
              />
              <FormError>{errors?.title?.message?.toString()}</FormError>
            </label>
            <label htmlFor="link-url">
              Paste a url
              <input
                id="link-url"
                placeholder="https://w..."
                {...register('url', {
                  required: 'Where is it?',
                })}
                onFocus={(event) => event.target.select()}
                onMouseEnter={blockDrag}
                onMouseLeave={unblockDrag}
              />
              <FormError>{errors?.url?.message?.toString()}</FormError>
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
    </>
  );
};

export default LinksPage;
