import { CreateFirebaseFileDTO, FirebaseFileDTO } from "../../types";

interface IFirebaseFileService {
  createFile(
    filePath: string,
    fileDTO: CreateFirebaseFileDTO,
    contentType: string,
  ): Promise<FirebaseFileDTO>;
}

export default IFirebaseFileService;
