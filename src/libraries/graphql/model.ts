// eslint-disable-next-line max-classes-per-file
import { INode, IPagingData, ICursorPagingData } from '@resources/models/paginate.model';
import { mutation, params as Payload, query, rawString, types } from 'typed-graphqlify';
import { QueryObject } from 'typed-graphqlify/dist/graphqlify';
import { Params } from 'typed-graphqlify/dist/render';

export function rawStringConverter(node: any) {
  if (node) {
    // eslint-disable-next-line consistent-return
    Object.keys(node).forEach((k) => {
      if (typeof node[k] === 'object') {
        return rawStringConverter(node[k]);
      }

      if (typeof node[k] === 'string') {
        const transform = (text: string) => {
          if (text.toLowerCase() === 'true' || text.toLowerCase() === 'false') {
            return text.toLowerCase() === 'true';
          }

          try {
            return JSON.parse(text);
          } catch (jsonError) {
            return /^-?[\d.]+(?:e-?\d+)?$/.test(text) && !Number.isNaN(parseFloat(text)) ? parseFloat(text) : text;
          }
        };

        // eslint-disable-next-line no-param-reassign
        node[k] = rawString(transform(node[k]));
      }
    });
  }

  return node;
}

export class GqlModel<T extends QueryObject> {
  public data: T;

  constructor(queryObject: T) {
    this.data = queryObject;
  }

  setParams(alias: keyof T, params: Params) {
    if (this.data && this.data[alias]) {
      this.data[alias] = Payload(params, this.data[alias]);
    }
  }

  query(): string {
    const gql = query(this.data as T);

    return gql.toString();
  }

  mutation(): string {
    const gql = mutation(this.data as T);

    return gql.toString();
  }
}

export class GqlCursorPaginateModel<S extends string, T> {
  public data: { [key in S]: ICursorPagingData<T> } = {} as any;

  public nodes: INode<T>;

  constructor(key: S, query: T) {
    this.data[key] = {
      edges: {
        cursor: types.string,
        node: [query],
      },
      total_count: types.number,
      page_info: {
        has_next_page: types.string,
        start_cursor: types.string,
        has_previous_page: types.string,
        end_cursor: types.string,
      },
    };

    this.nodes = { cursor: types.string, ...query };
  }

  setParams(alias: S, params: Params) {
    if (this.data && this.data[alias]) {
      // Set Default Limit
      if (params?.last && params?.first) {
        Object.assign(params, { first: 25 }); // Default Limit is 25
      }

      this.data[alias] = Payload(rawStringConverter(params), this.data[alias]);
    }
  }

  query(): string {
    const gql = query(this.data as typeof this.data);

    return gql.toString();
  }
}

export class GqlPaginateModel<S extends string, T> {
  public data: { [key in S]: IPagingData<T> } = {} as any;

  public nodes: T;

  constructor(key: S, query: T) {
    this.data[key] = {
      items: [query],
      meta: {
        page: types.number,
        page_count: types.number,
        per_page: types.number,
        total_count: types.number,
      },
    };

    this.nodes = query;
  }

  setParams(alias: S, params: Params) {
    if (this.data && this.data[alias]) {
      // Set Default Limit
      if (params?.last && params?.first) {
        Object.assign(params, { first: 25 }); // Default Limit is 25
      }

      this.data[alias] = Payload(rawStringConverter(params), this.data[alias]);
    }
  }

  query(): string {
    const gql = query(this.data as typeof this.data);

    return gql.toString();
  }
}
