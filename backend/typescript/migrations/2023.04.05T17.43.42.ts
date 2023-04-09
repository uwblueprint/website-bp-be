import { DataType } from "sequelize-typescript";
// import ApplicationDashboardTable from "../models/applicationDashboard.model";
// import User from "../models/user.model";

import { Migration } from "../umzug";

const TABLE_NAME = "applicantresponse";

const SEEDED_DATA = [
  {
    "academicYear": "2B",
    "binaryQuestion1": "Academic",
    "binaryQuestion2": "Yes",
    "binaryQuestions": [
      "{\n  \"question\": \"Will you be in an academic (school) term or a co-op term?*\",\n  \"selected\": \"Academic\"\n}",
      "{\n  \"question\": \"Will you be in an academic (school) term or a co-op term?*\",\n  \"selected\": \"Academic\"\n}",
    ],
    "dropdownQuestion1": "Facebook",
    "dropdownQuestions": [
        JSON.stringify({
            "options": [
                {
                    "value": "Facebook"
                },
                {
                    "value": "Instagram"
                },
                {
                    "value": "Word of mouth"
                },
                {
                    "value": "Clubs fair"
                },
                {
                    "value": "Events"
                },
                {
                    "value": "Other"
                }
            ],
            "question": "Where did you hear about us?*",
            "selected": ""
        })
    ],
    "email": "vvsheth@uwaterloo.ca",
    "firstName": "Vishwa",
    "lastName": "Sheth",
    "positions": [
        "Project Developer",
        "Product Designer",
        "Product Manager"
    ],
    "program": "Mechatronics Engineering",
    "question1": "Creating projects for helping improve lives is why I chose to be in engineering. Amongst all the different teams and groups I am able to join, Blueprint is one of the few that shares this goal with me. Bringing my shared passion to the team will not only help me achieve a dream I've had for years, but help make a real impact to others' lives. After all, it's not an understatement to say that now more than ever, humanity needs to learn to help itself. One of the many ways this can be done is through innovation and inspiration from those with the skills. This is exactly the opportunity Blueprint provides, which I'm more than eager to embark upon. I would also have the chance to be amongst like-minded peers that share a vision of the world, which would not only help me grow as a person, but make the projects that much more successful. All in all, I think Blueprint would help me start working towards the goals I've had for myself and also give me the chance to meet some amazing and inspiring people.",
    "question2": "My most recent contribution to a non-profit organization was in my twelfth grade when I was volunteering at a senior residence centre. I was in charge of recreational activities and organization, which meant I would organize anything from poker night to a small game of chess to a game of Wii tennis! I also spent one-on-one time with a lot of the residences simply catching up on their day and helping them with anything they needed. I volunteered at the residence for over a year and came to learn a lot of important skills such as communication with a variety of different people with different needs, organization of various activities that suit as many people as possible, and, most importantly, patience when it comes to tasks not going exactly as I planned.",
    "question3": "A project I'm most proud of also happens to be my most recent project, an Alexa skill that identifies who has arrived at your door and gives further prompts based on if it is a familiar face. This project was done with two of my friends, and involved a lot of different technologies. I took lead in organizing who was in charge of which task, which included writing the code for the Alexa skill itself, implementing the Microsoft Azure facial recognition API, and connecting both ends to a Firebase database for storing familiar faces. In terms of code difficulty, this project was not the most elaborate, but the reason why this has been my best project to date is because of the number of technologies we had to use and how well I was able to organize all of it together to make it work. We presented this at DeltaHacks V and, although we did not win, we definitely learned a lot in terms of project management and organization to make a working product.",
    "question4": "If you drill a hole into the Earth and into an orange with the same height, the remaining volume is exactly equal (Google the napkin ring problem)",
    "question5": "Not much here :)",
    "questions": [
        JSON.stringify({
            "answer": "Creating projects for helping improve lives is why I chose to be in engineering. Amongst all the different teams and groups I am able to join, Blueprint is one of the few that shares this goal with me. Bringing my shared passion to the team will not only help me achieve a dream I've had for years, but help make a real impact to others' lives. After all, it's not an understatement to say that now more than ever, humanity needs to learn to help itself. One of the many ways this can be done is through innovation and inspiration from those with the skills. This is exactly the opportunity Blueprint provides, which I'm more than eager to embark upon. I would also have the chance to be amongst like-minded peers that share a vision of the world, which would not only help me grow as a person, but make the projects that much more successful. All in all, I think Blueprint would help me start working towards the goals I've had for myself and also give me the chance to meet some amazing and inspiring people.",
            "placeholder": "e.g. I want to meet awesome people that are passionate about volunteering and helping non-profits!",
            "question": "Why do you want to join Blueprint?*"
        }),
        JSON.stringify({
            "answer": "My most recent contribution to a non-profit organization was in my twelfth grade when I was volunteering at a senior residence centre. I was in charge of recreational activities and organization, which meant I would organize anything from poker night to a small game of chess to a game of Wii tennis! I also spent one-on-one time with a lot of the residences simply catching up on their day and helping them with anything they needed. I volunteered at the residence for over a year and came to learn a lot of important skills such as communication with a variety of different people with different needs, organization of various activities that suit as many people as possible, and, most importantly, patience when it comes to tasks not going exactly as I planned.",
            "placeholder": "e.g. Red Cross, local soup kitchen, etc.",
            "question": "Describe your contributions to any volunteer/non-profit organizations:*"
        }),
        JSON.stringify({
            "answer": "A project I'm most proud of also happens to be my most recent project, an Alexa skill that identifies who has arrived at your door and gives further prompts based on if it is a familiar face. This project was done with two of my friends, and involved a lot of different technologies. I took lead in organizing who was in charge of which task, which included writing the code for the Alexa skill itself, implementing the Microsoft Azure facial recognition API, and connecting both ends to a Firebase database for storing familiar faces. In terms of code difficulty, this project was not the most elaborate, but the reason why this has been my best project to date is because of the number of technologies we had to use and how well I was able to organize all of it together to make it work. We presented this at DeltaHacks V and, although we did not win, we definitely learned a lot in terms of project management and organization to make a working product.",
            "placeholder": "e.g. I recently worked on a simple website",
            "question": "Tell us about a project you have worked on in the past that you’re most proud of. *"
        }),
        JSON.stringify({
            "answer": "If you drill a hole into the Earth and into an orange with the same height, the remaining volume is exactly equal (Google the napkin ring problem)",
            "placeholder": "e.g. I can lick my elbow!",
            "question": "Tell us a fun fact!*"
        }),
        JSON.stringify({
            "answer": "Not much here :)",
            "placeholder": "(Optional)",
            "question": "Is there anything else you would like to share?"
        })
    ],
    "resumeInput": "https://firebasestorage.googleapis.com/v0/b/uw-blueprint.appspot.com/o/resumes%2Fd7a413bd-b398-777b-fa63-4d1abeca1540?alt=media&token=b6fc580c-f337-43a8-b8ce-7fdabb49a623",
    "resumeUrl": "https://firebasestorage.googleapis.com/v0/b/uw-blueprint.appspot.com/o/resumes%2Fd7a413bd-b398-777b-fa63-4d1abeca1540?alt=media&token=b6fc580c-f337-43a8-b8ce-7fdabb49a623",
    "roleQuestion1": "When I first started programming, I decided to work on a large project which involved generating a 3D fractal mountain. In essence, the way this mountain is generated is by creating an initial triangle and splitting the first large triangle into multiple smaller triangles. I worked on this project in my eleventh grade and was oblivious to a lot of basic programming concepts such as recursion and classes. I was able to get around the different classes I made but splitting the triangle was something I just couldn't figure out. After banging my head for a week, I approached my high school computer science who introduced me to recursion. He taught me how I would be able to \"access\" each smaller triangle after the split and generate the rest of the mountain.",
    "roleQuestion2": "I created a basic portfolio website about myself (vishwasheth03.github.io) for anyone that wanted to look further into my past projects.\nUnfortunately I haven't had time to update the website to my most recent accomplishments but I think it was a good way of demonstrating my skills more in depth!",
    "roleQuestion3": "Seemingly trivial but still very annoying, on the SkipTheDishes app, there is no way for you to message your driver while they are delivering. There is also no way of checking their profile and requesting to change the driver. Perhaps the latter is a more risky feature to implement, but at least contacting the driver is important in case you need to give them additional information or an emergency comes up! One may argue that messaging your driver while they are driving is dangerous because it prompts them to check their phone. To avoid this the app can simply implement a feature that locks the messages while they are in motion, but at least they would be able to see the message when they’ve come to a stop.",
    "roleQuestion4": "",
    "roleQuestion5": "",
    "roleQuestion6": "",
    "roleQuestion7": "",
    "roleQuestion8": "",
    "roleQuestion9": "",
    "roleSpecificQuestions": [JSON.stringify({
        "Product Designer": "I created a basic portfolio website about myself (vishwasheth03.github.io) for anyone that wanted to look further into my past projects.\nUnfortunately I haven't had time to update the website to my most recent accomplishments but I think it was a good way of demonstrating my skills more in depth!",
        "Product Manager": "Seemingly trivial but still very annoying, on the SkipTheDishes app, there is no way for you to message your driver while they are delivering. There is also no way of checking their profile and requesting to change the driver. Perhaps the latter is a more risky feature to implement, but at least contacting the driver is important in case you need to give them additional information or an emergency comes up! One may argue that messaging your driver while they are driving is dangerous because it prompts them to check their phone. To avoid this the app can simply implement a feature that locks the messages while they are in motion, but at least they would be able to see the message when they’ve come to a stop.",
        "Project Developer": "When I first started programming, I decided to work on a large project which involved generating a 3D fractal mountain. In essence, the way this mountain is generated is by creating an initial triangle and splitting the first large triangle into multiple smaller triangles. I worked on this project in my eleventh grade and was oblivious to a lot of basic programming concepts such as recursion and classes. I was able to get around the different classes I made but splitting the triangle was something I just couldn't figure out. After banging my head for a week, I approached my high school computer science who introduced me to recursion. He taught me how I would be able to \"access\" each smaller triangle after the split and generate the rest of the mountain."
    })],
    "status": "pending",
    "timestamp": 1551109692334
  },
  {
      "academicYear": "2B",
      "binaryQuestion1": "Academic",
      "binaryQuestion2": "Yes",
      "binaryQuestions": [
        JSON.stringify({
              "binaryOptions": [
                  {
                      "value": "Academic"
                  },
                  {
                      "value": "Co-op"
                  }
              ],
              "question": "Will you be in an academic (school) term or a co-op term?*",
              "selected": "Academic"
          }),
          JSON.stringify({
              "binaryOptions": [
                  {
                      "value": "Yes"
                  },
                  {
                      "value": "No"
                  }
              ],
              "question": "Will you be in Waterloo during the upcoming term?*",
              "selected": "Yes"
          })
      ],
      "dropdownQuestion1": "Word of mouth",
      "dropdownQuestions": [
        JSON.stringify({
              "options": [
                  {
                      "value": "Facebook"
                  },
                  {
                      "value": "Instagram"
                  },
                  {
                      "value": "Word of mouth"
                  },
                  {
                      "value": "Clubs fair"
                  },
                  {
                      "value": "Events"
                  },
                  {
                      "value": "Other"
                  }
              ],
              "question": "Where did you hear about us?*",
              "selected": ""
          })
      ],
      "email": "k4singha@edu.uwaterloo.ca",
      "firstName": "Kritin",
      "lastName": "Singhal",
      "positions": [
          "Project Developer",
          "Project Lead"
      ],
      "program": "Computer Science",
      "question1": "The industry is slowly moving from good brains to good hearts. I am excited about meeting talented people at Blueprint. But more than that, I am extremely passionate about the idea of contributing towards non-profits through the power of technology.",
      "question2": "During summer 2016, I visited the country of Bhutan to start a community campaign to foster more inclusiveness in the society. Bhutan was raged by disability discrimination which was reflected even at young children going to school. In our campaign, we visited plenty of schools around the capital, hosted workshops among the students and motivated the disabled ones to take up pride and follow their goals. It was a month full of workshops and speeches, collaborated with Disabled Persons' Association of Bhutan that aids blind people in and around the capital. ",
      "question3": "I recently worked on a project that helps university students to conquer mental health. The name of the project is Nova, which is essentially an Artificial Intelligence chatbot that acts as an unbiased, and non-judgemental friend to any student who needs a person to talk to, anytime of the day. Nova also has the ability to detect emergency situations through Natural Language Processing and can inform the authorities, if needs be. We won the best Hackathon project and we also were qualified in the Velocity Fund Finals 5k.",
      "question4": "I can play four instruments",
      "question5": "Portfolio: www.kritinsinghal.com",
      "questions": [
          JSON.stringify({
              "answer": "The industry is slowly moving from good brains to good hearts. I am excited about meeting talented people at Blueprint. But more than that, I am extremely passionate about the idea of contributing towards non-profits through the power of technology.",
              "placeholder": "e.g. I want to meet awesome people that are passionate about volunteering and helping non-profits!",
              "question": "Why do you want to join Blueprint?*"
          }),
          JSON.stringify({
              "answer": "During summer 2016, I visited the country of Bhutan to start a community campaign to foster more inclusiveness in the society. Bhutan was raged by disability discrimination which was reflected even at young children going to school. In our campaign, we visited plenty of schools around the capital, hosted workshops among the students and motivated the disabled ones to take up pride and follow their goals. It was a month full of workshops and speeches, collaborated with Disabled Persons' Association of Bhutan that aids blind people in and around the capital. ",
              "placeholder": "e.g. Red Cross, local soup kitchen, etc.",
              "question": "Describe your contributions to any volunteer/non-profit organizations:*"
          }),
          JSON.stringify({
              "answer": "I recently worked on a project that helps university students to conquer mental health. The name of the project is Nova, which is essentially an Artificial Intelligence chatbot that acts as an unbiased, and non-judgemental friend to any student who needs a person to talk to, anytime of the day. Nova also has the ability to detect emergency situations through Natural Language Processing and can inform the authorities, if needs be. We won the best Hackathon project and we also were qualified in the Velocity Fund Finals 5k.",
              "placeholder": "e.g. I recently worked on a simple website",
              "question": "Tell us about a project you have worked on in the past that you’re most proud of. *"
          }),
          JSON.stringify({
              "answer": "I can play four instruments",
              "placeholder": "e.g. I can lick my elbow!",
              "question": "Tell us a fun fact!*"
          }),
          JSON.stringify({
              "answer": "Portfolio: www.kritinsinghal.com",
              "placeholder": "(Optional)",
              "question": "Is there anything else you would like to share?"
          })
      ],
      "resume": "C:\\fakepath\\resume (3).pdf",
      "resumeInput": "https://firebasestorage.googleapis.com/v0/b/uw-blueprint.appspot.com/o/resumes%2F606575f1-f889-846a-538f-6736baa20f11?alt=media&token=6d515d40-f74b-450e-88d7-7325dc640f9e",
      "resumeUrl": "https://firebasestorage.googleapis.com/v0/b/uw-blueprint.appspot.com/o/resumes%2F606575f1-f889-846a-538f-6736baa20f11?alt=media&token=6d515d40-f74b-450e-88d7-7325dc640f9e",
      "roleQuestion1": "In my most recent coop, I was a given a project to automate snapshot testing for the website by building a web-scraping bot. The biggest issue was to handle logins for the pages that required it. Initially, I tried saving the cookie and hitting the authentication API. This method, though successful, processed really slowly and made the whole testing inefficient. Later, I came up with a new login method, which I named Snake. Snake is essentially a python program that generates random token and session numbers for login and instead of making an intercept request with the credentials, it uses those tokens to make the requests. This method was way faster as it processed 4 times faster than the usual credential authentication method.  ",
      "roleQuestion2": "",
      "roleQuestion3": "",
      "roleQuestion4": "",
      "roleQuestion5": "",
      "roleQuestion6": "",
      "roleQuestion7": "",
      "roleQuestion8": "",
      "roleQuestion9": "",
      "roleSpecificQuestions": [JSON.stringify({
          "Project Developer": "In my most recent coop, I was a given a project to automate snapshot testing for the website by building a web-scraping bot. The biggest issue was to handle logins for the pages that required it. Initially, I tried saving the cookie and hitting the authentication API. This method, though successful, processed really slowly and made the whole testing inefficient. Later, I came up with a new login method, which I named Snake. Snake is essentially a python program that generates random token and session numbers for login and instead of making an intercept request with the credentials, it uses those tokens to make the requests. This method was way faster as it processed 4 times faster than the usual credential authentication method.  "
      })],
      "status": "pending",
      "timestamp": 1551111061254
  },
];

export const up: Migration = async ({ context: sequelize }) => {
  const binaryQuestions = sequelize.define("binaryQuestion", {question: DataType.STRING(4000), selected: DataType.STRING(4000)}, {});

  await sequelize.getQueryInterface().createTable(TABLE_NAME, {
    id: {
      type: DataType.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      unique: true,
    },
    academicYear: {
      type: DataType.STRING(4000),
      allowNull: true,
    },
    binaryQuestion1: {
      type: DataType.STRING(4000),
      allowNull: true,
    },
    binaryQuestion2: {
      type: DataType.STRING(4000),
      allowNull: true,
    },
    binaryQuestions: {
      type: DataType.ARRAY(DataType.STRING(4000)),
      allowNull: true,
    },
    dropdownQuestion1: {
      type: DataType.STRING(4000),
      allowNull: true,
    },
    dropdownQuestions: {
      type: DataType.ARRAY(DataType.STRING(4000)),
      allowNull: true,
    },
    email: {
      type: DataType.STRING(4000),
      allowNull: true,
    },
    firstName: {
      type: DataType.STRING(4000),
      allowNull: true,
    },
    lastName: {
      type: DataType.STRING(4000),
      allowNull: true,
    },
    positions: {
      type: DataType.ARRAY(DataType.STRING(4000)),
      allowNull: true,
    },
    program: {
      type: DataType.STRING(4000),
      allowNull: true,
    },
    question1: {
      type: DataType.STRING(4000),
      allowNull: true,
    },
    question2: {
      type: DataType.STRING(4000),
      allowNull: true,
    },
    question3: {
      type: DataType.STRING(4000),
      allowNull: true,
    },
    question4: {
      type: DataType.STRING(4000),
      allowNull: true,
    },
    question5: {
      type: DataType.STRING(4000),
      allowNull: true,
    },
    questions: {
      type: DataType.ARRAY(DataType.STRING(4000)),
      allowNull: true,
    },
    resume: {
      type: DataType.STRING(4000),
      allowNull: true,
    },
    resumeInput: {
      type: DataType.STRING(4000),
      allowNull: true,
    },
    resumeUrl: {
      type: DataType.STRING(4000),
      allowNull: true,
    },
    roleQuestion1: {
      type: DataType.STRING(4000),
      allowNull: true,
    },
    roleQuestion2: {
      type: DataType.STRING(4000),
      allowNull: true,
    },
    roleQuestion3: {
      type: DataType.STRING(4000),
      allowNull: true,
    },
    roleQuestion4: {
      type: DataType.STRING(4000),
      allowNull: true,
    },
    roleQuestion5: {
      type: DataType.STRING(4000),
      allowNull: true,
    },
    roleQuestion6: {
      type: DataType.STRING(4000),
      allowNull: true,
    },
    roleQuestion7: {
      type: DataType.STRING(4000),
      allowNull: true,
    },
    roleQuestion8: {
      type: DataType.STRING(4000),
      allowNull: true,
    },
    roleQuestion9: {
      type: DataType.STRING(4000),
      allowNull: true,
    },
    roleSpecificQuestions: {
      type: DataType.ARRAY(DataType.STRING(4000)),
      allowNull: true,
    },
    status: {
      type: DataType.ENUM("pending", "accepted", "rejected"),
      allowNull: true,
    },
    timestamp: {
      type: DataType.BIGINT,
      allowNull: true,
    },
    createdAt: DataType.DATE,
    updatedAt: DataType.DATE,
  });
  await sequelize.getQueryInterface().bulkInsert(TABLE_NAME, SEEDED_DATA);
};

export const down: Migration = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface().dropTable(TABLE_NAME);
};
