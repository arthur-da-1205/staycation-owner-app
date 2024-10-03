import { useGqlMutation } from '@hooks/useGql';
import { GqlModel } from '@libraries/graphql/model';
import { PropertyCreateInput } from '@resources/input/property.input';
import { PropertyModel } from '@resources/models/property.model';
import { rawString } from 'typed-graphqlify';

export function useGetPropertyDetailQuery() {}

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
