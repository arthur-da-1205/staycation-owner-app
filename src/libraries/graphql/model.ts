// eslint-disable-next-line max-classes-per-file
import { IPagingData } from '@resources/models/paginate.model';
import { includes, omit } from 'lodash-es';
import { mutation, params as Payload, query, rawString, types } from 'typed-graphqlify';
import { QueryObject } from 'typed-graphqlify/dist/graphqlify';

// import { Params } from 'typed-graphqlify/dist/render';
export interface Params {
  [key: string]: string | boolean | number | null | Params | Array<Params>;
}

export function nestedRawString(payload: any, excludeKeys?: string[], forceString?: []) {
  if (payload) {
    // eslint-disable-next-line consistent-return
    Object.keys(payload).forEach((k) => {
      if (!includes(excludeKeys || [], k)) {
        if (typeof payload[k] === 'object') {
          return nestedRawString(payload[k], excludeKeys);
        }

        if (includes(forceString || [], k) || typeof payload[k] === 'string') {
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
          payload[k] = rawString(transform(payload[k]));
        }
      }
    });
  }

  return payload;
}

export class GqlModel<T extends QueryObject> {
  public data: T;

  constructor(queryObject: T) {
    this.data = queryObject;
  }

  setParams(alias: keyof T, params: Params) {
    if (this.data && this.data[alias]) {
      this.data[alias] = Payload(params as any, this.data[alias]);
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

export class GqlPaginateModel<S extends string, T> {
  public data: { [key in S]: IPagingData<T> } = {} as any;

  public nodes: T;

  constructor(key: S, query: T) {
    this.data[key] = {
      items: [query],
      meta: {
        page: types.number,
        per_page: types.number,
        total_count: types.number,
        page_count: types.number,
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

      const filter = {
        field: rawString(JSON.stringify(params.field)),
      };

      if (params.operator) {
        Object.assign(filter, { operator: rawString(JSON.stringify(params.operator)) });
      }

      let paramFil: any;

      if (params.field && !params.search) {
        paramFil = { ...omit(params, ['field', 'operator']), filter };
      } else if (params.search && !params.field) {
        paramFil = { ...omit(params, ['field', 'operator']), search: rawString(params?.search as any) };
      } else if (params.field && params.search) {
        paramFil = { ...omit(params, ['field', 'operator']), search: rawString(params?.search as any), filter };
      } else {
        paramFil = params;
      }

      this.data[alias] = Payload(nestedRawString(paramFil), this.data[alias]);
    }
  }

  query(): string {
    const gql = query(this.data as typeof this.data);

    return gql.toString();
  }
}
