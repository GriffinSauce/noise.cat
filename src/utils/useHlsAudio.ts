import { useRef, MutableRefObject } from 'react';
import Hls from 'hls.js';
import useDeepCompareEffect from 'use-deep-compare-effect';

const useHlsAudio = <Element extends HTMLMediaElement = HTMLAudioElement>({
  url,
  autoplay = false,
  hlsConfig = {},
}: {
  url: string;
  autoplay?: boolean;
  hlsConfig?: Partial<Hls.Config>;
}): { ref: MutableRefObject<Element | undefined> } => {
  const ref = useRef<Element>();

  // Deep compare because the options are an object that can get recreated
  useDeepCompareEffect(() => {
    let hls: Hls;

    const initPlayer = () => {
      if (!ref.current) return;

      const newHls = new Hls({
        enableWorker: false,
        ...hlsConfig,
      });

      newHls.attachMedia(ref.current);

      newHls.on(Hls.Events.MEDIA_ATTACHED, () => {
        newHls.loadSource(url);
      });

      newHls.on(Hls.Events.MANIFEST_PARSED, () => {
        if (ref.current && autoplay) ref.current.play();
      });

      newHls.on(Hls.Events.ERROR, (event, data) => {
        if (data.fatal) {
          switch (data.type) {
            case Hls.ErrorTypes.NETWORK_ERROR:
              newHls.startLoad();
              break;
            case Hls.ErrorTypes.MEDIA_ERROR:
              newHls.recoverMediaError();
              break;
            default:
              initPlayer();
              break;
          }
        }
      });

      hls = newHls;
    };

    initPlayer();

    return () => {
      if (hls != null) hls.destroy();
    };
  }, [autoplay, hlsConfig, ref, url]);

  return {
    ref,
  };
};

export default useHlsAudio;
