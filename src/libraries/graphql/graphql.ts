import { QueryOptions } from '@apollo/client/core/watchQueryOptions';
import { ErrorHelper } from '@libraries/error';
import {
  apollo,
  ApolloQueryResult,
  DefaultContext,
  FetchResult,
  gql,
  MutationOptions,
  OperationVariables,
} from '@libraries/graphql/apollo';
import { ICursorPagingResponse, IPagingResponse } from '@resources/models/paginate.model';
import { map } from 'lodash-es';

export async function query<T = any, TVariables extends OperationVariables = OperationVariables>(
  query: string,
  options?: QueryOptions<TVariables, T>,
): Promise<ApolloQueryResult<T>> {
  // eslint-disable-next-line no-console
  console.log(query);

  return new Promise((resolve, reject) => {
    apollo
      .query<T, TVariables>({
        query: gql`
          ${query}
        `,
        ...(options || {}),
      })
      .then((result) => resolve(result))
      .catch((error) => {
        reject(ErrorHelper.parse(error));
      });
  });
}

export async function queryCursorPaginate<T = any, TVariables extends OperationVariables = OperationVariables>(
  query: string,
  options?: QueryOptions<TVariables, T>,
): Promise<ICursorPagingResponse<T>> {
  // eslint-disable-next-line no-console
  console.log(query);

  return new Promise((resolve, reject) => {
    apollo
      .query<T, TVariables>({
        query: gql`
          ${query}
        `,
        ...(options || {}),
      })
      .then(({ data: result }) => {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        const { edges = [], page_info = {}, total_count = null } = Object.values(result || {})[0] as any;
        const data: any[] = map(edges, (edge) => {
          const { cursor, node } = edge;

          return { cursor, ...node };
        });

        resolve({ data, paging: { total_count, ...page_info } });
      })
      .catch((error) => {
        reject(ErrorHelper.parse(error));
      });
  });
}

export async function queryPaginate<T = any, TVariables extends OperationVariables = OperationVariables>(
  query: string,
  options?: QueryOptions<TVariables, T>,
): Promise<IPagingResponse<T>> {
  // eslint-disable-next-line no-console
  console.log(query);

  return new Promise((resolve, reject) => {
    apollo
      .query<T, TVariables>({
        query: gql`
          ${query}
        `,
        ...(options || {}),
      })
      .then(({ data: result }) => {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        const { items = [], meta = {} } = Object.values(result || {})[0] as any;

        resolve({ items, meta });
      })
      .catch((error) => {
        reject(ErrorHelper.parse(error));
      });
  });
}

export async function mutate<
  TData = any,
  TVariables extends OperationVariables = OperationVariables,
  TContext extends Record<string, any> = DefaultContext,
>(query: string, options?: MutationOptions<TData, TVariables, TContext>): Promise<FetchResult<TData>> {
  // eslint-disable-next-line no-console
  console.log(query);

  return new Promise((resolve, reject) => {
    apollo
      .mutate<TData, TVariables, TContext>({
        mutation: gql`
          ${query}
        `,
        ...(options || {}),
      })
      .then((result) => resolve(result))
      .catch((error) => {
        reject(ErrorHelper.parse(error));
      });
  });
}
