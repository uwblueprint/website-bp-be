import members from "../sampleData/members.json"

const testResolver = {
    Query: {
        getPerson: (_: any, args: any) => {
            return members.members.find((person) => person.name === args.name);
        },
    },
};

export default testResolver;