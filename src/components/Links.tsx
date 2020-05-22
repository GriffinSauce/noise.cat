import { FunctionComponent } from 'react';
import { FiExternalLink, FiEdit2 } from 'react-icons/fi';
import Skeleton from 'react-loading-skeleton';

const Link = ({
  link,
  editLink,
}: {
  link: Link;
  editLink: (link: Link) => void;
}) => (
  <li key={link._id} className="flex items-center h2">
    <a
      target="_blank"
      rel="noopener noreferrer"
      href={link.url}
      className="flex items-center flex-grow py-3 leading-none capitalize hover:text-blue-600"
    >
      <FiExternalLink className="mr-2" /> {link.title}
    </a>
    <button
      className="p-3 rounded hover:bg-gray-100"
      type="button"
      onClick={() => editLink(link)}
    >
      <FiEdit2 />
    </button>
  </li>
);

type Props = {
  links: undefined | Array<Link>;
  editLink: (link: Link) => void;
};

const Links: FunctionComponent<Props> = ({ links, editLink }) => {
  return (
    <>
      <ul className="grid mb-4">
        {links
          ? links.map((link) => <Link link={link} editLink={editLink} />)
          : Array(3)
              .fill('')
              .map(() => (
                <li className="py-3 leading-none">
                  <Skeleton />
                </li>
              ))}
      </ul>
    </>
  );
};

export default Links;
