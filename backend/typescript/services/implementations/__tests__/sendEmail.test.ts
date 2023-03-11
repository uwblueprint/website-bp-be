import EmailService from "../emailService";
import IEmailService from "../../interfaces/emailService";
import nodemailerConfig from "../../../nodemailer.config";

const emailService: IEmailService = new EmailService(nodemailerConfig);

describe("sendEmail", () => {
  it("sendEmail", async () => {
    await emailService.sendEmail(
      "hyunzeekim@uwblueprint.org",
      "Test subject",
      "Test body",
    );
  });
});
