import PropertyCreateForm from '@components/forms/property-create/property-create.component';
import { useToast } from '@hooks/useToast';
import { usePropertyAddMutation } from '@resources/gql/property.gql';
import { PropertyCreateInput } from '@resources/input/property.input';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Drawer, Text } from 'rsuite';

const PropertyCreatePage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState<boolean>(true);

  const toast = useToast();
  const [propertyAdd, { data, loading, error }] = usePropertyAddMutation();

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleExited = () => {
    navigate(
      {
        pathname: '/my-properties',
        search: location.search,
      },
      {
        replace: true,
        state: JSON.stringify(''),
      },
    );
  };

  const onSubmit = (value: PropertyCreateInput) => {
    if (value) {
      propertyAdd(value);
    }
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
    }

    if (data) {
      toast.success(`Property created successfully`);

      //   navigate({ pathname: `/location-types/${data.id}`, search: location.search }, { replace: true });
    }
  }, [data, loading, error]);

  return (
    <Drawer size="sm" backdrop="static" open={isOpen} onClose={handleClose} onExited={handleExited}>
      <Drawer.Header>
        <div className="flex-col">
          <Drawer.Title>
            <Text>Add New Property</Text>
          </Drawer.Title>
          <Text>Fill in the form below to create your new data property</Text>
        </div>
      </Drawer.Header>
      <Drawer.Body>
        <PropertyCreateForm isLoading={loading} onCancel={handleClose} onSubmit={onSubmit} />
      </Drawer.Body>
    </Drawer>
  );
};

export default PropertyCreatePage;
