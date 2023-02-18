import { gql } from "apollo-server-express";

const testType = gql`
    type Person {
        name: String,
        role: String,
        term: Int,
        teams: [String],
        img: String
    }

    extend type Query {
        getPerson(name: String): Person
    }
`;

export default testType;
