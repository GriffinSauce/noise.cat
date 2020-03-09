import { useState, useRef } from 'react';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import fetcher from '../utils/fetcher';
import useOnClickOutside from '../utils/useOnClickOutside';
import { FiChevronRight } from 'react-icons/fi';
import Link from 'next/link';
import Avatar from '../components/Avatar';

const BandPicker = () => {
  const ref = useRef();
  const [isOpen, setOpen] = useState(false);
  useOnClickOutside(ref, () => setOpen(false));

  const {
    query: { band: slug },
  } = useRouter();

  const { data, error } = useSWR(`/api/bands`, fetcher);
  if (!data) return null;
  if (error) return 'Error';

  return (
    <div className="relative flex-grow">
      <button
        className="p-3 text-lg font-semibold leading-none text-green-300 font-display"
        onClick={() => setOpen(true)}
      >
        {data.bands.find(band => band.slug === slug).name}
      </button>
      {isOpen ? (
        <ul
          className="absolute top-0 left-0 bg-white rounded-lg shadow"
          ref={ref}
        >
          {data.bands.map(band => (
            <li>
              <Link href={`/bands/${band.slug}`}>
                <a
                  className={`block p-3 text-lg font-semibold leading-none truncate font-display ${
                    band.slug === slug ? 'text-green-300' : 'text-gray-900'
                  }`}
                >
                  {band.name}
                </a>
              </Link>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
};

export default BandPicker;
