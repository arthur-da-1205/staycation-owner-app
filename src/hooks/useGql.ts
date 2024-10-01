import { QueryOptions } from '@apollo/client/core/watchQueryOptions';
import {
  ApolloQueryResult,
  DefaultContext,
  FetchResult,
  MutationOptions,
  OperationVariables,
} from '@libraries/graphql/apollo';
import { mutate, query, queryPaginate } from '@libraries/graphql/graphql';
import { useAtomicSetter } from '@libraries/state';
import { IPagingInfo, IPagingResponse } from '@resources/models/paginate.model';
import { errorAtom } from '@states/atoms/error.atom';
import { useState } from 'react';

interface IQueryResponse<T> {
  data: ApolloQueryResult<T> | null;
  loading: boolean;
  error: string;
}

interface IMutationResponse<T> {
  data: FetchResult<T> | null;
  loading: boolean;
  error: string;
}

export function useGqlQuery<T = any, TVariables extends OperationVariables = OperationVariables>(
  options?: QueryOptions<TVariables, T>,
) {
  const [data, setData] = useState<ApolloQueryResult<T> | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const setGlobalError = useAtomicSetter(errorAtom);

  async function execute(payload: string): Promise<IQueryResponse<T>> {
    const res: IQueryResponse<T> = { loading: true, data: null, error: '' };

    setLoading(res.loading);
    setData(res.data);
    setError(res.error);

    try {
      res.data = await query<T, TVariables>(payload, options);
      setData(res.data);
    } catch (error: any) {
      setGlobalError(error);

      res.error = error?.message;
      setError(res.error);
    }

    res.loading = false;
    setLoading(res.loading);

    return res;
  }

  return [execute, { data, loading, error }] as const;
}

export function useGqlQueryPaginate<T = any, TVariables extends OperationVariables = OperationVariables>(
  options?: QueryOptions<TVariables, T>,
) {
  const [data, setData] = useState<T[]>([]);
  const [meta, setMeta] = useState<IPagingInfo>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const setGlobalError = useAtomicSetter(errorAtom);

  async function execute(payload: string): Promise<IPagingResponse<T>> {
    const res: IPagingResponse<T> = { loading: true, items: [], error: '', meta: undefined };

    setLoading(!!res.loading);
    setData(res.items);
    setError(res.error || '');

    try {
      const result = await queryPaginate<T, TVariables>(payload, options);

      res.items = result.items;
      res.meta = result.meta;

      setData(res.items);
      setMeta(res.meta);
    } catch (error: any) {
      setGlobalError(error);

      res.error = error?.message;
      setError(res.error || '');
    }

    res.loading = false;
    setLoading(res.loading);

    return res;
  }

  return [execute, { data, meta, loading, error }] as const;
}

export function useGqlMutation<
  TData = any,
  TVariables extends OperationVariables = OperationVariables,
  TContext extends Record<string, any> = DefaultContext,
>(options?: MutationOptions<TData, TVariables, TContext>) {
  const [data, setData] = useState<FetchResult<TData> | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const setGlobalError = useAtomicSetter(errorAtom);

  async function execute(payload: string): Promise<IMutationResponse<TData>> {
    const res: IMutationResponse<TData> = { loading: true, data: null, error: '' };

    setLoading(res.loading);
    setData(res.data);
    setError(res.error);

    try {
      res.data = await mutate<TData, TVariables, TContext>(payload, options);

      setData(res.data);
    } catch (error: any) {
      setGlobalError(error);

      res.error = error?.message;
      setError(res.error);
    }

    res.loading = false;
    setLoading(res.loading);

    return res;
  }

  return [execute, { data, loading, error }] as const;
}

export function useGqlUpload<
  TData = any,
  TVariables extends OperationVariables = OperationVariables,
  TContext extends Record<string, any> = DefaultContext,
>() {
  const [data, setData] = useState<FetchResult<TData> | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const setGlobalError = useAtomicSetter(errorAtom);

  async function execute(
    payload: string,
    options?: MutationOptions<TData, TVariables, TContext>,
  ): Promise<IMutationResponse<TData>> {
    const res: IMutationResponse<TData> = { loading: true, data: null, error: '' };

    setLoading(res.loading);
    setData(res.data);
    setError(res.error);

    try {
      res.data = await mutate<TData, TVariables, TContext>(payload, options);

      setData(res.data);
    } catch (error: any) {
      setGlobalError(error);

      res.error = error?.message;
      setError(res.error);
    }

    res.loading = false;
    setLoading(res.loading);

    return res;
  }

  return [execute, { data, loading, error }] as const;
}
