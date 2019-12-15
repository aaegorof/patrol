import ApolloClient from "apollo-boost";

export const client = new ApolloClient({
  uri: "http://patrol.sitewanted.ru/graphql"
});