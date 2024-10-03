import { types } from 'typed-graphqlify';

export enum PropertyStatus {
  ACTIVE = 'ACTIVE',
  TEMPORARY_CLOSED = 'TEMPORARY_CLOSED',
  PERMANENT_CLOSED = 'PERMANENT_CLOSED',
}

export const PropertyModel = {
  id: types.number,
  name: types.string,
  type: types.string,
  status: types.oneOf(Object.values(PropertyStatus)),
  description: types.string,
  price: types.number,
  location: types.string,
};
