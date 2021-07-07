import { useEffect } from 'react';
import useSingleSong from 'utils/useSingleSong';
import useHlsAudio from 'utils/useHlsAudio';

interface Props {
  file: string;
}

const AudioPlayer = ({ file }: Props) => {
  const playerProps = useHlsAudio({ url: file });

  // Sync across players, only one is allowed to play at once
  const { playingFile, setPlayingFile } = useSingleSong();
  useEffect(() => {
    const setOnPlay = () => setPlayingFile(file);
    playerProps.ref.current?.addEventListener('play', setOnPlay);
    return () =>
      playerProps.ref.current?.removeEventListener('play', setOnPlay);
  }, [file]);

  useEffect(() => {
    if (playingFile && playingFile !== file) playerProps.ref.current?.pause();
  }, [playingFile]);

  return <audio {...playerProps} controls={true} className="w-full" />;
};

export default AudioPlayer;
