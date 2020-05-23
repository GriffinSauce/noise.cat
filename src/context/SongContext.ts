import { createContext, useContext } from 'react';

type Context = {
  playingFile: string | null;
  setPlayingFile: (file: string | null) => void;
};

const SongContext = createContext<Context | null>(null);

export const useSongContext = (): Context => {
  const songContext = useContext(SongContext);
  if (!songContext)
    throw new Error('Component needs to be wrapped in SongContext');
  return songContext;
};

export default SongContext;
