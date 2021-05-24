import { gql } from 'apollo-server';

const Character = gql`
    enum Gender {
        male
        female
    }
    
    enum CharacterType {
        deity
        divine_being
        human
    }
    
    type TimeAndPlace {
        year: Int
        location: Location
        chapterRef: String
    }
    
    type Character {
        name: String!
        gender: Gender
        type: CharacterType
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
