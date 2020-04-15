import { FunctionComponent } from 'react';
import { FiExternalLink, FiEdit2 } from 'react-icons/fi';

type Props = {
  links: Array<Link>;
  editLink: (link: Link) => void;
};

const Links: FunctionComponent<Props> = ({ links, editLink }) => {
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
              onClick={() => editLink(link)}
            >
              <FiEdit2 />
            </button>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Links;
