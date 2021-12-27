import { FC } from "react";
import FAQList from "@components/common/FAQList";
import {
  applicationProcess as APPLICATION_PROCESS_QUESTIONS,
  aboutOurTeam as ABOUT_OUR_TEAM_QUESTIONS,
} from "@constants/join-faq.json";

const FAQ: FC = () => {
  return (
    <section className="content mb-32">
      <div className="mb-14">
        <h2 className="text-blue">FAQ</h2>
        <hr className="w-20 mt-4 mb-10 text-blue" />
      </div>
      <div className="flex flex-col gap-32">
        <div className="flex gap-4">
          <div className="w-52 pt-2 border-t-4 border-t-blue">
            <h6 className="text-blue">Application process</h6>
          </div>
          <FAQList questions={APPLICATION_PROCESS_QUESTIONS} />
        </div>
        <div className="flex gap-4">
          <div className="w-52 pt-2 border-t-4 border-t-blue">
            <h6 className="text-blue">About our team</h6>
          </div>
          <FAQList questions={ABOUT_OUR_TEAM_QUESTIONS} />
        </div>
      </div>
    </section>
  );
};

export default FAQ;
