import { useState, FunctionComponent } from 'react';
import useSWR from 'swr';
import { useParams, usePathname } from 'next/navigation';
import Link from 'next/link';
import { FiCalendar, FiSettings, FiExternalLink } from 'react-icons/fi';
import Modal from 'components/Modal';
import Container from 'components/Container';
import Image from 'next/image';

const ActiveLink: FunctionComponent<{
  href: string;
  children?: React.ReactNode;
}> = ({ children, href, ...props }) => {
  const pathname = usePathname();
  return (
    <Link
      href={href}
      {...props}
      className={`p-3 text-2xl flex-center ${
        pathname === href ? 'text-emerald-400' : 'text-gray-900'
      }`}
    >
      {children}
    </Link>
  );
};

const Footer: FunctionComponent = () => {
  const [isOpen, setOpen] = useState(false);
  const slug = useParams<{ band: string }>()?.band;
  const pathname = usePathname();

  const { data, error } = useSWR<{ bands: Array<Band> }>(
    slug ? `/api/bands` : null,
  );
  if (!data) return null;
  if (!data.bands) return null;
  if (!data.bands.length) return null;
  if (error) return <div>Error</div>;

  const BandPicker = () => (
    <ul>
      {data.bands
        .sort(
          (a) => (a.slug === slug ? -1 : 1), // Sort current band to top
        )
        .map((band) => (
          <li key={band.slug}>
            <Link
              href={pathname && slug ? pathname.replace(slug, band.slug) : ''}
              legacyBehavior
            >
              <button
                className={`flex w-full items-center p-3 text-lg font-semibold leading-none truncate font-display ${
                  band.slug === slug ? 'text-emerald-400' : 'text-gray-900'
                }`}
                onClick={() => setOpen(false)}
                type="button"
              >
                <Image
                  alt={band.name}
                  className="w-8 h-8 mr-2 rounded-full"
                  src={band.image}
                  width={30}
                  height={30}
                />
                <span>{band.name}</span>
              </button>
            </Link>
          </li>
        ))}
    </ul>
  );

  const selectedBandImage = data.bands.find((band) => band.slug === slug)
    ?.image;

  return (
    <>
      <div className="w-full h-8 my-2 shrink-0"></div>
      <div className="fixed bottom-0 w-full bg-white border-t border-gray-200">
        <Container>
          <nav className="grid grid-cols-4">
            <button
              className="p-2 text-center flex-center"
              onClick={() => setOpen(true)}
              type="button"
            >
              {selectedBandImage ? (
                <Image
                  alt="band switcher"
                  className="w-8 h-8 rounded-full"
                  src={selectedBandImage}
                  width={30}
                  height={30}
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-gray-300" />
              )}
            </button>
            <ActiveLink href={`/bands/${slug}`}>
              <FiCalendar />
            </ActiveLink>
            <ActiveLink href={`/bands/${slug}/links`}>
              <FiExternalLink />
            </ActiveLink>
            <ActiveLink href={`/bands/${slug}/settings`}>
              <FiSettings />
            </ActiveLink>
          </nav>
        </Container>
        <Modal isOpen={isOpen} onClose={() => setOpen(false)}>
          <BandPicker />
        </Modal>
      </div>
    </>
  );
};

export default Footer;
