import {
    ApplicationDTO,
    ApplicantRole,
  } from "../../types";
import * as admin from "firebase-admin";
import memberData from "../../graphql/sampleData/members.json";
import IMatchingService from "../interfaces/matchingService";
import IAppDashboardService from "../interfaces/appDashboardService";
import AppDashboardService from "./appDashboardService";

const appDashboardService: IAppDashboardService = new AppDashboardService();

class MatchingService implements IMatchingService {
  /* eslint-disable class-methods-use-this */
  async matchApplicationsForRole(role: ApplicantRole): Promise<any> {
    const application: Array<ApplicationDTO> | null = await appDashboardService.getApplicationsByRole(role);
    const term = memberData.term;   
    const roleMembers = memberData.members.filter((member) => member.term === term && member.role === role);
    const memberRoleBreakdown = {
        role,
        members: roleMembers,
        applications: application
    };

    return memberRoleBreakdown;
  }

  async linkMemberUids(term: number): Promise<any> {
    const members = memberData.members;
    const firebaseUsers = await admin.auth().listUsers();
    const users = firebaseUsers.users;
    const duplicateUsers: Record<string, any[] | undefined> = {};
  
    const updatedMembers = members.map((member) => {
      const membersWithName = users.filter((user) => user.displayName === member.name && member.term === term);
      const numEntries = membersWithName.length;
      if (numEntries > 1) {
        duplicateUsers[member.name] = membersWithName;
        for (const memberWithName of membersWithName) {
          if (memberWithName?.email?.includes("@uwblueprint.org")) {
            return {
              ...member,
              uid: memberWithName.uid,
            };
          }
        }
      } else if (numEntries === 1) {
        return {
          ...member,
          uid: membersWithName[0].uid,
        };
      }
      return member;
    });
  
    return {
        updatedMembers,
        duplicateUsers
    };
  }
}

export default MatchingService;
