import { useGqlMutation } from '@hooks/useGql';
import { GqlModel } from '@libraries/graphql/model';
import { OwnerModel } from '@resources/models/user.model';
import { rawString, types } from 'typed-graphqlify';
import { AuthLoginInput, AuthRegisterInput } from '../input/auth.input';

export function useAuthRegisterMutation() {
  const model = new GqlModel({
    ownerRegister: {
      access_token: types.string,
      user: OwnerModel,
    },
  });

  const [trigger, { data, ...result }] = useGqlMutation<typeof model.data>();

  function execute(payload: AuthRegisterInput) {
    model.setParams('ownerRegister', {
      name: rawString(payload.name),
      email: rawString(payload.email),
      password: rawString(payload.password),
    });

    return trigger(model.mutation());
  }

  return [execute, { ...result, data: data?.data?.ownerRegister }] as const;
}

export function useAuthLoginMutation() {
  const model = new GqlModel({
    ownerLogin: {
      access_token: types.string,
      user: OwnerModel,
    },
  });

  const [trigger, { data, ...result }] = useGqlMutation<typeof model.data>();

  function execute(payload: AuthLoginInput) {
    model.setParams('ownerLogin', {
      args: {
        email: rawString(payload.email),
        password: rawString(payload.password),
      },
    });

    return trigger(model.mutation());
  }

  return [execute, { ...result, data: data?.data?.ownerLogin }] as const;
}
