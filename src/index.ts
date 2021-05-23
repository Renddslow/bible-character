import { ApolloServer, gql } from 'apollo-server';
import Character from './gql/characters';
import getCharacter from './controllers/getCharacter';

const typeDefs = [
  Character,
  gql`
    type Query {
        character(ref: String!): Character
        characters: [Character]
    }
  `,
];

const resolvers = {
  Query: {
    character: getCharacter,
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => {
  console.log(`📕 Running Bible GQL server at ${url}`);
})
