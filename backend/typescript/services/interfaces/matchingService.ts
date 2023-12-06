import { ApplicantRole, ApplicationDTO } from "../../types";

interface IMatchingService {
    /**
     * Match current blueprint members to applications
     * @returns true if user is authorized to review the application and authorized, false otherwise
     */
    matchApplicationsForRole(role: ApplicantRole): Promise<any>;

    /**
     * Update members.json with uids for current blueprint members, and resolve duplicates. 
     * Can use this updated members.json as seed data populating the user table
     * @returns Upated members.json and duplicate users
     */
    linkMemberUids(term: number): Promise<any>;

  }
  
  export default IMatchingService;
  