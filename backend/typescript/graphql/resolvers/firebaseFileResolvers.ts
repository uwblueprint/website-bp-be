import fs from "fs";
import { FileUpload } from "graphql-upload";
/* eslint-disable-next-line import/no-extraneous-dependencies */
import { ReadStream } from "fs-capacitor";
import { v4 as uuidv4 } from "uuid";
import FirebaseFileService from "../../services/implementations/firebaseFileService";
import FileStorageService from "../../services/implementations/fileStorageService";
import IFirebaseFileService from "../../services/interfaces/firebaseFileService";
import { FirebaseFileDTO } from "../../types";
import {
  validateFileType,
  getFileTypeValidationError,
} from "../../middlewares/validators/util";

const defaultBucket = process.env.FIREBASE_STORAGE_DEFAULT_BUCKET || "";
const fileStorageService = new FileStorageService(defaultBucket);
const firebaseFileService: IFirebaseFileService = new FirebaseFileService(
  fileStorageService,
);

const writeFile = (readStream: ReadStream, filePath: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const out = fs.createWriteStream(filePath);
    readStream.pipe(out);
    out.on("finish", () => {
      resolve();
    });
    out.on("error", (err) => reject(err));
  });
};

const firebaseFileResolvers = {
  Mutation: {
    createFirebaseFile: async (
      _parent: undefined,
      {
        file,
        uploadedUserId,
      }: { file: Promise<FileUpload>; uploadedUserId: number },
    ): Promise<FirebaseFileDTO> => {
      const { createReadStream, mimetype, filename } = await file;

      if (!validateFileType(mimetype)) {
        throw new Error(getFileTypeValidationError(mimetype));
      }

      const uploadDir = "uploads";
      const tempFilePath = `${uploadDir}/${filename}`;

      await writeFile(createReadStream(), tempFilePath);

      const sizeBytes = BigInt(fs.statSync(tempFilePath).size);
      const storagePath = `interview_notes/${uuidv4()}/${filename}`;

      try {
        const newFile = await firebaseFileService.createFile(
          tempFilePath,
          {
            storagePath,
            originalFileName: filename,
            uploadedUserId,
            sizeBytes,
          },
          mimetype,
        );
        return newFile;
      } finally {
        fs.unlinkSync(tempFilePath);
      }
    },
  },
};

export default firebaseFileResolvers;
