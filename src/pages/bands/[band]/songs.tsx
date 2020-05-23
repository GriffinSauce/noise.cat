import { useState } from 'react';
import { FiMusic, FiZap } from 'react-icons/fi';
import { parseISO, format } from 'date-fns';
import Layout from 'components/Layout';
import Container from 'components/Container';
import Modal from 'components/Modal';
import AudioPlayer from 'components/AudioPlayer';
import SongContext from 'context/SongContext';

type Song = {
  id: string;
  title: string;
  demos: Array<{
    id: string;
    created: string;
    url: string;
    description: string;
  }>;
  note: string;
};

const mockSongs: Array<Song> = [
  {
    id: '1',
    title: 'This won’t last (Monkeys)',
    demos: [
      {
        id: '1',
        created: '2020-01-01T12:00:00',
        url: '/demo.mp3',
        description: 'Eerste conceptje',
      },
      {
        id: '2',
        created: '2020-01-01T12:00:00',
        url: '/demo2.mp3',
        description: 'Vocals',
      },
    ],
    note: 'Iets bedenken voor de intro, verder vet',
  },
  {
    id: '2',
    title: 'Survive',
    demos: [],
    note:
      'Refrein text werkt nog niet zo lekker en kijken of we couplet zang+ritme nog meer kunnen matchen. Iets bedenken voor de intro, verder vet.',
  },
  {
    id: '3',
    title: 'Late night cake',
    demos: [],
    note:
      'Proberen de twee versies te combineren? Joris of Jo ermee gaan kutten',
  },
];

const Song = ({ song }: { song: Song }) => {
  const [playingFile, setPlayingFile] = useState<string | null>(null);
  return (
    <div className="p-4">
      <div className="grid gap-3">
        <h1>{song.title}</h1>
        <h2 className="flex items-center">
          <FiMusic className="mr-2" /> Demos
        </h2>
        <SongContext.Provider
          value={{
            playingFile,
            setPlayingFile,
          }}
        >
          {song.demos.map((demo) => (
            <div key={demo.id}>
              <h3 className="mb-1 text-xs italic font-normal text-gray-700">
                {format(parseISO(demo.created), 'd MMM yyyy - hh:mm')} -{' '}
                {demo.description}
              </h3>
              <AudioPlayer file={demo.url} />
            </div>
          ))}
        </SongContext.Provider>
        <h2 className="flex items-center">
          <FiZap className="mr-2" /> Note
        </h2>
        <p className="text-gray-600">{song.note}</p>
      </div>
    </div>
  );
};

const SongsPage = () => {
  const [viewingSong, viewSong] = useState<Song | null>(null);

  const onClose = () => viewSong(null);

  return (
    <Layout>
      <Container>
        <div className="grid grid-cols-2 gap-3 p-4">
          {mockSongs.map((song) => (
            <button
              key={song.id}
              className="h-full"
              type="button"
              onClick={() => viewSong(song)}
            >
              <div className="grid h-full gap-2 p-3 text-left border rounded-lg">
                <h2 className="leading-none h3">{song.title}</h2>
                <div className="flex flex-wrap items-start">
                  {song.demos.map(({ id }) => (
                    <div key={id} className="p-2 mb-2 mr-2 bg-gray-200 rounded">
                      <FiMusic />
                    </div>
                  ))}
                </div>
                <div className="flex text-sm text-gray-600">
                  <FiZap className="flex-shrink-0 mt-1 mr-2" />
                  <p className="clamp-2">{song.note}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
        <Modal fullScreen isOpen={!!viewingSong} onClose={onClose}>
          {/* TODO: this switch kills the out-animation */}
          {viewingSong ? <Song song={viewingSong} /> : null}
        </Modal>
      </Container>
    </Layout>
  );
};

export default SongsPage;