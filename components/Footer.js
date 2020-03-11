import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import fetcher from '../utils/fetcher';
import useOnClickOutside from '../utils/useOnClickOutside';
import Link from 'next/link';
import { FiCalendar } from 'react-icons/fi';

const Footer = () => {
  const ref = useRef();
  const [isOpen, setOpen] = useState(false);
  useOnClickOutside(ref, () => setOpen(false));

  const {
    query: { band: slug },
  } = useRouter();

  const { data, error } = useSWR(slug ? `/api/bands` : null, fetcher);
  if (!data) return null;
  if (error) return 'Error';

  const BandPicker = () => (
    <ul className="bg-white modal-shadow">
      {data.bands
        .reduce(
          (acc, band) => (band.slug === slug ? [band, ...acc] : [...acc, band]), // Sort current band to top
          [],
        )
        .map(band => (
          <li>
            <Link href={`/bands/[band]`} as={`/bands/${band.slug}`}>
              <a
                className={`flex items-center block p-3 text-lg font-semibold leading-none truncate font-display ${
                  band.slug === slug ? 'text-green-400' : 'text-gray-900'
                }`}
                onClick={() => setOpen(false)}
              >
                <img className="rounded-full w-8 h-8 mr-2" src={band.image} />
                <span>{band.name}</span>
              </a>
            </Link>
          </li>
        ))}
      <style jsx>{`
        .modal-shadow {
          box-shadow: 0 10px 30px 0px rgba(0, 0, 0, 0.2);
        }
      `}</style>
    </ul>
  );

  return (
    <nav className="bg-white fixed bottom-0 border-t border-gray-200 grid grid-cols-2 w-full">
      <button
        className="p-2 text-center flex-center"
        onClick={() => setOpen(true)}
      >
        <img
          className="rounded-full w-8 h-8"
          src={data.bands.find(band => band.slug === slug).image}
        />
      </button>
      <Link href="/bands/[band]" as={`/bands/${slug}`}>
        <a className="p-3 text-2xl flex-center">
          <FiCalendar />
        </a>
      </Link>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="absolute bottom-0 left-0 w-full"
            initial={{ bottom: -100 }}
            animate={{ bottom: 0 }}
            exit={{ bottom: -100 }}
            ref={ref}
          >
            <BandPicker />
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Footer;
