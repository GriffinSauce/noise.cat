import ffmpeg, { FfmpegCommand } from 'fluent-ffmpeg';
import ffmpeg_static from 'ffmpeg-static';
import path from 'path';

interface File {
  name: string;
  path: string;
}

interface Conversion extends File {
  outputDir: string;
}

// Makes an ffmpeg command return a promise.
const promisifyCommand = (command: FfmpegCommand): Promise<string> =>
  new Promise((resolve, reject) => {
    command.on('end', resolve).on('error', reject).run();
  });

const fileExtensionRegex = /\.[^/.]+$/;

// Convert the audio to mono channel using FFMPEG.
const convertToStream = async ({
  name: inputFileName,
  path: inputPath,
  outputDir,
}: Conversion): Promise<File[]> => {
  // We add a '_output.flac' suffix to target audio file name. That's where we'll upload the converted audio.
  const outputFileName =
    inputFileName.replace(fileExtensionRegex, '') + '_output.flac';
  const outputPath = path.join(outputDir, outputFileName);

  let command = ffmpeg(inputPath)
    .setFfmpegPath(ffmpeg_static)
    .audioChannels(1)
    .audioFrequency(16000)
    .format('flac')
    .output(outputPath);

  await promisifyCommand(command);

  return [
    {
      path: outputPath,
      name: outputFileName,
    },
  ];
};

export default convertToStream;
