import { gql } from 'apollo-server';

const Location = gql`
    type Location {
        name: String!
    }
`;

export default Location;

