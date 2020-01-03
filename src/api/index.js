import {ApolloClient, ApolloLink, HttpLink, InMemoryCache} from "apollo-boost";
import {KEY_TOKEN} from "./keys";
import {getServer} from "./url";

const httpLink = new HttpLink({uri: getServer() + "/graphql"});

const authLink = new ApolloLink((operation, forward) => {
  // Retrieve the authorization token from local storage.
  const token = localStorage.getItem(KEY_TOKEN);

  // Use the setContext method to set the HTTP headers.
  operation.setContext({
    headers: {
      authorization: token ? `Bearer ${token}` : "",
    },
    uri: getServer() + "/graphql",
  });

  // Call the next link in the middleware chain.
  return forward(operation);
});

export const gqlClient = new ApolloClient({
  link: authLink.concat(httpLink),
  connectToDevTools: true,
  cache: new InMemoryCache({addTypename: false}),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: "no-cache",
      errorPolicy: "ignore",
    },
    query: {
      fetchPolicy: "no-cache",
      errorPolicy: "all",
    },
  },
});
