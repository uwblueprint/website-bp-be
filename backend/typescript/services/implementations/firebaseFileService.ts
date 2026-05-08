import File from "../../models/file.model";
import IFileStorageService from "../interfaces/fileStorageService";
import IFirebaseFileService from "../interfaces/firebaseFileService";
import { CreateFirebaseFileDTO, FirebaseFileDTO } from "../../types";
import { getErrorMessage } from "../../utilities/errorUtils";
import logger from "../../utilities/logger";

const Logger = logger(__filename);

class FirebaseFileService implements IFirebaseFileService {
  fileStorageService: IFileStorageService;

  constructor(fileStorageService: IFileStorageService) {
    this.fileStorageService = fileStorageService;
  }

  async createFile(
    filePath: string,
    fileDTO: CreateFirebaseFileDTO,
    contentType: string,
  ): Promise<FirebaseFileDTO> {
    try {
      await this.fileStorageService.createFile(
        fileDTO.storagePath,
        filePath,
        contentType,
      );

      const file = await File.create({
        storagePath: fileDTO.storagePath,
        originalFileName: fileDTO.originalFileName,
        uploadedUserId: fileDTO.uploadedUserId,
        sizeBytes: fileDTO.sizeBytes,
      });

      return {
        id: file.id,
        storagePath: file.storagePath,
        originalFileName: file.originalFileName,
        uploadedUserId: file.uploadedUserId,
        sizeBytes: file.sizeBytes,
        createdAt: file.createdAt,
        updatedAt: file.updatedAt,
      };
    } catch (error: unknown) {
      Logger.error(
        `Failed to create firebase file. Reason = ${getErrorMessage(error)}`,
      );
      throw error;
    }
  }
}

export default FirebaseFileService;
