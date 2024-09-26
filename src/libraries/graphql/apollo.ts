import { ApolloCache } from '@apollo/client/cache';
import { ApolloClient, ApolloLink, gql, HttpLink, InMemoryCache } from '@apollo/client/core';
import { ApolloQueryResult, DefaultContext, OperationVariables } from '@apollo/client/core/types';
import { MutationOptions, QueryOptions } from '@apollo/client/core/watchQueryOptions';
import { setContext } from '@apollo/client/link/context';
import { FetchResult } from '@apollo/client/link/core';
import { LocalStorage } from '@libraries/storage';

export { gql, ApolloCache };

export type { ApolloQueryResult, DefaultContext, OperationVariables, MutationOptions, QueryOptions, FetchResult };

const httpLink = new HttpLink({
  uri: import.meta.env.VITE_GQL_URL,
});

// ERROR DEBUG
// const errorLink = onError(({ graphQLErrors, networkError }) => {
//   if (!environment.production) {
//     if (graphQLErrors)
//       graphQLErrors.forEach(({ message, locations, path }) =>
//         console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`)
//       );
//
//     if (networkError) {
//       console.log(`[Network error]: ${networkError}`);
//     }
//   }
// });

const authLink = setContext((_, { headers }) => {
  const customHeaders = {};
  const token: string | null = LocalStorage.getItem('user_token');
  if (token) {
    const opts = { Authorization: `Bearer ${token}` };

    Object.assign(customHeaders, opts);
  }

  return {
    headers: {
      ...headers,
      ...customHeaders,
    },
  };
});

export const apollo = new ApolloClient({
  link: ApolloLink.from([authLink, httpLink]),
  cache: new InMemoryCache(),
});
