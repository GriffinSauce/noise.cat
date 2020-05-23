import { useMemo, useEffect, useCallback, useState, useRef } from 'react';
import {
  useAudioPlayer,
  useAudioPosition,
  AudioPlayerProvider,
} from 'react-use-audio-player';
import { FiPlay, FiPause, FiDownload } from 'react-icons/fi';
import Loader from 'components/Loader';
import { useSongContext } from 'context/SongContext';

const msToTime = (ms: number) => {
  const pad = (time: number) => `${time}`.padStart(2, '0');
  const minutes = Math.floor(ms / 60);
  const seconds = Math.floor(ms - minutes * 60);
  return `${pad(minutes)}:${pad(seconds)}`;
};

const Times = () => {
  const { position, duration } = useAudioPosition();
  const positionLabel = useMemo(() => msToTime(position), [position]);
  const durationLabel = useMemo(() => msToTime(duration), [duration]);
  return <span>{`${positionLabel} / ${durationLabel}`}</span>;
};

const ProgressBar = () => {
  const { togglePlayPause, playing, play } = useAudioPlayer();
  const { position, duration, seek } = useAudioPosition({
    highRefreshRate: true,
  });
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    setPercent((position / duration) * 100 || 0);
  }, [position, duration]);

  const buttonRef = useRef<HTMLButtonElement>(null);

  const onKeyUp = (event: React.KeyboardEvent) => {
    event.preventDefault();
    if (event.key === ' ') togglePlayPause();
  };

  const goTo = useCallback(
    (event: React.MouseEvent) => {
      if (!buttonRef.current) return;

      const { pageX: eventOffsetX } = event;
      const elementOffsetX = buttonRef.current.offsetLeft;
      const elementWidth = buttonRef.current.clientWidth;
      const seekPercent = (eventOffsetX - elementOffsetX) / elementWidth;
      seek(seekPercent * duration);
      if (!playing) play();
    },
    [duration, playing, seek],
  );

  return (
    <button
      ref={buttonRef}
      type="button"
      className="w-full h-full px-1"
      onClick={goTo}
      onKeyUp={onKeyUp}
    >
      <div className="h-1 bg-gray-200">
        <div
          className="h-full bg-gray-600 bar"
          style={{ width: `${percent}%` }}
        />
      </div>
    </button>
  );
};

interface Props {
  file: string;
}

const AudioPlayer = ({ file }: Props) => {
  const { togglePlayPause, pause, ready, loading, playing } = useAudioPlayer({
    src: file,
    format: 'mp3',
    autoplay: false,
  });

  // Sync across players, only one is allowed to play at once
  const { playingFile, setPlayingFile } = useSongContext();
  useEffect(() => {
    if (playing) setPlayingFile(file);
  }, [playing]);
  useEffect(() => {
    if (playingFile && playingFile !== file) pause();
  }, [playingFile]);

  if (!ready && !loading) return <div>No audio to play</div>;

  return (
    <div className="flex items-center text-lg bg-gray-200 rounded">
      {loading ? (
        <div className="p-3">
          <Loader />
        </div>
      ) : (
        <>
          <button
            type="button"
            onClick={togglePlayPause}
            className="p-3 text-gray-600"
          >
            {playing ? (
              <FiPause className="fill-current" />
            ) : (
              <FiPlay className="fill-current" />
            )}
          </button>
          <div className="mr-2 text-sm text-gray-600">
            <Times />
          </div>
          <div className="self-stretch flex-grow">
            <ProgressBar />
          </div>
          <a
            href={file}
            download={file.split('/').pop()}
            className="p-3 text-gray-500"
          >
            <FiDownload />
          </a>
        </>
      )}
    </div>
  );
};

// Create one context for all the subcomponents
const AudioPlayerWrapped = (props: Props) => (
  <AudioPlayerProvider>
    <AudioPlayer {...props} />
  </AudioPlayerProvider>
);

export default AudioPlayerWrapped;
