import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { Storage } from '@google-cloud/storage';
import path from 'path';
import os from 'os';
import fs from 'fs';
import convertToStream from './convertToStream';

const gcs = new Storage();

admin.initializeApp();

const log = console.log;

/**
 * When an audio is uploaded in the Storage bucket We generate a mono channel audio automatically using
 * node-fluent-ffmpeg.
 */
exports.generateMonoAudio = functions.storage
  .object()
  .onFinalize(async (object) => {
    const {
      bucket: fileBucket, // The Storage bucket that contains the file
      name: filePath, // File path in the bucket.
      contentType,
    } = object;

    // TODO: limit to allowed bucket?

    // Exit if this is triggered on a file that is not audio.
    if (!contentType?.startsWith('audio/')) {
      log('This is not an audio file');
      return null;
    }

    // Get the file name.
    if (!filePath) {
      log('Object filePath is missing');
      return null;
    }
    const fileName = path.basename(filePath);
    const fileDir = path.dirname(filePath);

    // Exit if the audio is already converted.
    if (fileName.endsWith('_output.flac')) {
      log('Already a converted audio');
      return null;
    }

    // Download file from bucket
    const bucket = gcs.bucket(fileBucket);
    const tempFilePath = path.join(os.tmpdir(), fileName);
    await bucket.file(filePath).download({ destination: tempFilePath });
    log('Audio downloaded locally to', tempFilePath);

    // Convert
    const outputFiles = await convertToStream({
      name: fileName,
      path: tempFilePath,
      outputDir: os.tmpdir(),
    });
    log('Output audio created at', outputFiles.map((f) => f.path).join(','));

    // Upload the converted files
    for (const outputFile of outputFiles) {
      const destination = path.join(fileDir, outputFile.name);
      await bucket.upload(outputFile.path, {
        destination,
      });
      log('Output audio uploaded to', destination);
    }

    // Once the audio has been uploaded delete the local file to free up disk space.
    fs.unlinkSync(tempFilePath);
    outputFiles.forEach((file) => {
      fs.unlinkSync(file.path);
    });
    log('Temporary files removed');

    return;
  });
