import { useGetPropertyDetailQuery } from '@resources/gql/property.gql';
import { PropertyCreateInput } from '@resources/input/property.input';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import Card from '@components/commons/card/card.component';
import classNames from 'classnames';
import { Text } from 'rsuite';

import Currency from '@components/commons/currency/currency.component';
import style from './style.module.less';

const PropertyOverviewPage: React.FC = () => {
  const params = useParams();

  const [getPropertyDetail, { loading }] = useGetPropertyDetailQuery(params?.id);

  const [initialValue, setInitialValue] = useState<PropertyCreateInput>({
    name: '',
    description: '',
    price: 0,
    location: '',
    status: '',
    type: '',
  });

  useEffect(() => {
    getPropertyDetail().then(({ data }) => {
      const values = data?.data.ownerPropertyDetail;

      if (values) {
        setInitialValue({
          name: values.name,
          description: values.description,
          price: values.price,
          location: values.location,
          status: values.status,
          type: values.type,
        });
      }
    });
  }, []);

  return (
    <div className={style.container}>
      <Card title="Info" className="mb-5 p-4 flex flex-col gap-2">
        <table className={classNames('detail-table', { initializing: loading })}>
          <tbody>
            <tr>
              <th>
                <Text>Property Name</Text>
              </th>
              <td>{initialValue.name}</td>
            </tr>
            <tr>
              <th>
                <Text>Location</Text>
              </th>
              <td>{initialValue.location}</td>
            </tr>
            <tr>
              <th>
                <Text>Type</Text>
              </th>
              <td>{initialValue.type}</td>
            </tr>
            <tr>
              <th>
                <Text>Price</Text>
              </th>
              <td>
                <Currency value={initialValue.price} />
              </td>
            </tr>
            <tr>
              <th>
                <Text>Status</Text>
              </th>
              <td>{initialValue.status}</td>
            </tr>
            <tr>
              <th>
                <Text>Description</Text>
              </th>
              <td>{initialValue.description}</td>
            </tr>
          </tbody>
        </table>
      </Card>
    </div>
  );
};

export default PropertyOverviewPage;
