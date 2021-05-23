import { gql } from 'apollo-server';

const Character = gql`
    enum Gender {
        male
        female
    }
    
    type TimeAndPlace {
        year: Int
        location: Location
    }
    
    type Character {
        name: String!
        gender: Gender
        aliases: [String]
        born: TimeAndPlace
        died: TimeAndPlace
        relationshipsConnection(
            first: Int,
            after: String,
            last: Int,
            before: String,
            relationshipType: String
        ): CharacterRelationshipsConnection
    }
    
    type CharacterRelationshipsConnection {
        pageInfo: String!
        edges: [CharacterRelationshipsEdge]
    }
    
    type CharacterRelationshipsEdge {
        cursor: String!
        node: Character
    }
`;

export default Character;
