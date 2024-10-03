import { PropertyStatus } from '@resources/models/property.model';

export interface PropertyCreateInput {
  name: string;
  location: string;
  price: number;
  status: PropertyStatus | '';
  type: string;
  description: string;
}
