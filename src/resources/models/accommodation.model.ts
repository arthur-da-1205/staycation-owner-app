import { types } from 'typed-graphqlify';

export const AccommodationStatus = {
  ACTIVE: 'ACTIVE',
  TEMPORARY_CLOSED: 'TEMPORARY_CLOSED',
  PERMANENT_CLOSED: 'PERMANENT_CLOSED',
};

export const AccommodationModel = {
  id: types.number,
  name: types.string,
  type: types.string,
  status: types.oneOf(Object.values(AccommodationStatus)),
  description: types.string,
  price: types.number,
  location: types.string,
};
