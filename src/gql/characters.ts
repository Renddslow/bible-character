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
        ref: String
    }
    
    enum RelationshipType {
        father
        mother
        spouse
        concubine
        sibling
        half_sibling
        parent_sibling
        cousin
        grandfather
        grandmother
    }
    
    type Character {
        id: String!
        name: String!
        gender: Gender
        type: CharacterType
        aliases: [String]
        born: TimeAndPlace
        died: TimeAndPlace
        yearsLived: Int
        relationshipsConnection(
            first: Int,
            after: String,
            last: Int,
            before: String,
            relationshipType: RelationshipType
        ): CharacterRelationshipsConnection
    }
    
    type CharacterRelationshipsConnection {
        edges: [CharacterRelationshipsEdge]
    }
    
    type CharacterRelationshipsEdge {
        cursor: String!
        relationshipType: RelationshipType!
        node: Character
    }
`;

export default Character;
