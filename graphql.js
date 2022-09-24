const { ApolloServer, gql } = require("apollo-server-lambda");
const {
  ApolloServerPluginLandingPageLocalDefault,
} = require("apollo-server-core");

// Hardcode example data.
const books = [
  {
    title: "The Awakening",
    author: "Kate Chopin Soto",
  },
  {
    title: "City of Glass",
    author: "Paul Auster Cortez",
  },
];

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  type Book {
    title: String
    author: String
  }

  type Query {
    books: [Book]
  }
`;

// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    books: () => books,
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  csrfPrevention: true,
  cache: "bounded",
  plugins: [ApolloServerPluginLandingPageLocalDefault({ embed: true })],
});

exports.graphqlHandler = server.createHandler();
