import { useState, useCallback, FunctionComponent } from 'react';
import { useForm } from 'react-hook-form';
import { mutate } from 'swr';
import { FiExternalLink, FiEdit2, FiX } from 'react-icons/fi';
import fetcher from '../utils/fetcher';
import Button from './Button';
import Modal from './Modal';

const FormError = ({ children }: { children: string }) => (
  <span className="text-xs font-semibold absolute">{children}</span>
);

type Props = {
  slug: string;
  links: Array<Link>;
};

const Links: FunctionComponent<Props> = ({ slug, links }) => {
  const [editingLink, setEditingLink] = useState<null | Link>(null);
  const closeForm = () => setEditingLink(null);
  const { handleSubmit, register, errors, reset } = useForm({});
  const [postState, setPostState] = useState<null | 'loading'>(null);

  const onSubmit = useCallback(
    handleSubmit(async (link) => {
      setPostState('loading');
      try {
        await fetcher(`/api/bands/${slug}/links/${editingLink?._id}`, {
          method: 'PUT',
          body: {
            ...editingLink,
            link,
          },
        });
      } catch (err) {
        console.error(err);
        return;
      }
      setPostState(null);
      closeForm();
      mutate(`/api/bands/${slug}`);
    }),
    [slug, editingLink],
  );

  return (
    <>
      <ul className="grid mb-4">
        {links.map((link) => (
          <li className="flex items-center h2">
            <a
              href={link.url}
              className="flex items-center capitalize flex-grow py-3 leading-none hover:text-blue-600"
            >
              <FiExternalLink className="mr-2" /> {link.title}
            </a>
            <button
              className="p-3 hover:bg-gray-100 rounded"
              type="button"
              onClick={() => {
                setEditingLink(link);
                reset(link);
              }}
            >
              <FiEdit2 />
            </button>
          </li>
        ))}
      </ul>
      <Modal
        isOpen={!!editingLink}
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
            Update link
          </Button>
        </form>
      </Modal>
    </>
  );
};

export default Links;
