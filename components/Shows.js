import { FiMapPin, FiAlignLeft, FiPhone, FiDollarSign } from 'react-icons/fi';
import { IoIosCheckmarkCircle } from 'react-icons/io';

const Shows = ({ shows }) => {
  return (
    <>
      <div>
        <ul>
          {shows.map((show, index) => (
            <li className="pb-6">
              <h2 className="text-lg truncate">{show.title}</h2>
              <h3 className="flex items-center text-sm font-medium text-green-500">
                <div className="mr-1 text-lg icon-fix">
                  <IoIosCheckmarkCircle />
                </div>
                <span>{show.date.replace(/-/g, ' ')}</span>
              </h3>
              <div className="flex items-center min-w-0 text-gray-500">
                <FiMapPin className="mr-1" />
                <div className="truncate">{show.location}</div>
              </div>
              <div className="flex items-center pt-1 italic text-gray-500">
                <FiAlignLeft className="mr-1" />
                <div>{show.note || 'Notes'}</div>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <style jsx>{`
        .icon-fix {
          transform: translate(-1px, -1px);
        }
      `}</style>
    </>
  );
};

export default Shows;
