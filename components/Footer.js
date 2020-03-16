import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import useOnClickOutside from '../utils/useOnClickOutside';
import Link from 'next/link';
import { FiCalendar, FiSettings } from 'react-icons/fi';

const ActiveLink = ({ children, href, ...props }) => {
  const { pathname } = useRouter();
  return (
    <Link href={href} {...props}>
      <a
        className={`p-3 text-2xl flex-center ${
          pathname === href ? 'text-green-400' : 'text-gray-900'
        }`}
      >
        {children}
      </a>
    </Link>
  );
};

const Footer = () => {
  const ref = useRef();
  const [isOpen, setOpen] = useState(false);
  useOnClickOutside(ref, () => setOpen(false));

  const {
    query: { band: slug },
    pathname,
  } = useRouter();
  const route = pathname.replace(slug, '[band]');

  const { data, error } = useSWR(slug ? `/api/bands` : null);
  if (!data) return null;
  if (!data.bands.length) return null;
  if (error) return 'Error';

  const BandPicker = () => (
    <ul className="bg-white modal-shadow">
      {data.bands
        .reduce(
          (acc, band) => (band.slug === slug ? [band, ...acc] : [...acc, band]), // Sort current band to top
          [],
        )
        .map(band => (
          <li key={band.slug}>
            <Link href={route} as={route.replace('[band]', band.slug)}>
              <button
                className={`flex w-full items-center block p-3 text-lg font-semibold leading-none truncate font-display ${
                  band.slug === slug ? 'text-green-400' : 'text-gray-900'
                }`}
                onClick={() => setOpen(false)}
                type="button"
              >
                <img
                  alt={band.name}
                  className="rounded-full w-8 h-8 mr-2"
                  src={band.image}
                />
                <span>{band.name}</span>
              </button>
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
    <nav className="bg-white fixed bottom-0 border-t border-gray-200 grid grid-cols-3 w-full">
      <button
        className="p-2 text-center flex-center"
        onClick={() => setOpen(true)}
        type="button"
      >
        <img
          alt="band switcher"
          className="rounded-full w-8 h-8"
          src={data.bands.find(band => band.slug === slug).image}
        />
      </button>
      <ActiveLink href="/bands/[band]" as={`/bands/${slug}`}>
        <FiCalendar />
      </ActiveLink>
      <ActiveLink href="/bands/[band]/settings" as={`/bands/${slug}/settings`}>
        <FiSettings />
      </ActiveLink>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="absolute bottom-0 left-0 w-full"
            key="band-picker"
            initial={{ bottom: -150 }}
            animate={{ bottom: 0 }}
            exit={{ bottom: -150 }}
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
