import { QueryOptions } from '@apollo/client';
import { useGqlMutation, useGqlQuery } from '@hooks/useGql';
import { GqlModel } from '@libraries/graphql/model';
import { PropertyCreateInput } from '@resources/input/property.input';
import { PropertyModel } from '@resources/models/property.model';
import { rawString } from 'typed-graphqlify';

export function useGetPropertyDetailQuery(id: any) {
  const model = new GqlModel({
    ownerPropertyDetail: { ...PropertyModel },
  });

  const [trigger, { data, ...result }] = useGqlQuery<typeof model.data>({ fetchPolicy: 'no-cache' } as QueryOptions);

  function execute() {
    model.setParams('ownerPropertyDetail', {
      id,
    });

    return trigger(model.query());
  }

  return [execute, { ...result, data: data?.data.ownerPropertyDetail }] as const;
}

export function usePropertyAddMutation() {
  const model = new GqlModel({ ownerCreateProperty: PropertyModel });

  const [trigger, { data, ...result }] = useGqlMutation<typeof model.data>();

  function execute(payload: PropertyCreateInput) {
    model.setParams('ownerCreateProperty', {
      args: {
        name: rawString(payload.name),
        description: rawString(payload.description),
        price: payload.price,
        location: rawString(payload.location),
        status: rawString('ACTIVE'),
        type: rawString(payload.type),
      },
    });

    return trigger(model.mutation());
  }

  return [execute, { ...result, data: data?.data?.ownerCreateProperty }] as const;
}
