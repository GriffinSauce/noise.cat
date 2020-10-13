import create from 'zustand';

type State = {
  playingFile: string;
  setPlayingFile: (file: string) => void;
};

const useStore = create<State>((set) => ({
  playingFile: '',
  setPlayingFile: (file) => set(() => ({ playingFile: file })),
}));

const useSingleSong = (): State => {
  return useStore();
};

export default useSingleSong;
