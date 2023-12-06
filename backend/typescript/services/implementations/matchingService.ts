import {
    ApplicationDTO,
    ApplicantRole,
  } from "../../types";
import * as admin from "firebase-admin";
import memberData from "../../graphql/sampleData/members.json";


import User from "../../models/user.model";
import IMatchingService from "../interfaces/matchingService";
import ApplicationDashboardTable from "../../models/applicationDashboard.model";

import IAppDashboardService from "../interfaces/appDashboardService";
import AppDashboardService from "./appDashboardService";

const appDashboardService: IAppDashboardService = new AppDashboardService();

class MatchingService implements IMatchingService {
  /* eslint-disable class-methods-use-this */
  async matchApplicationsForRole(role: ApplicantRole): Promise<any> {
    const application: Array<ApplicationDTO> | null = await appDashboardService.getApplicationsByRole(role);
    // const roles = Object.values(ApplicantRole);
    const term = memberData.term;   
    const roleMembers = memberData.members.filter((member) => member.term === term && member.role === role);
    // For each role, just do it here no?
    // how do i read from the applicantresponse database?
    const memberRoleBreakdown = {
        role,
        members: roleMembers,
        applications: application
    };

    return memberRoleBreakdown;

    // For each of the roles, I need to get the applications for that role.
    // Then I need to get the members for that role.
    // Then I need to match them, and assign two members to each application.
    // Then I need to save the assignments to the database, so each applicaiton will have two entries in the db, one for each reviewer.
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
