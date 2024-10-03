import React, { useRef, useState } from 'react';
import { Button, ButtonToolbar, Form, Schema, SelectPicker, Text } from 'rsuite';

import { PropertyCreateInput } from '@resources/input/property.input';
import style from './property-create.module.less';

interface IProps {
  initialValue?: PropertyCreateInput;
  isLoading: boolean;
  onSubmit?: (val: PropertyCreateInput) => void;
  onCancel: () => void;
}

const PropertyCreateForm: React.FC<IProps> = ({ initialValue, isLoading, onSubmit, onCancel }) => {
  const formRef = useRef<any>(null);

  const propertyType = [
    { value: 'VILLA', label: 'Villa' },
    { value: 'HOTEL', label: 'Hotel' },
    { value: 'APPARTMENT', label: 'Appartment' },
  ];

  const [formValue, setFormValue] = useState<any>({
    name: initialValue?.name || '',
    description: initialValue?.description || '',
    type: initialValue?.type || '',
    price: initialValue?.price || '',
    location: initialValue?.location,
  });

  const model = Schema.Model({
    name: Schema.Types.StringType().isRequired(`Required`),
    type: Schema.Types.StringType().isRequired('Required'),
    price: Schema.Types.NumberType().isRequired('Required'),
    location: Schema.Types.StringType().isRequired('Required'),
    description: Schema.Types.StringType().isRequired('Required'),
  });

  const handleSubmit = () => {
    if (formRef.current.check()) {
      if (onSubmit) {
        onSubmit(formValue);

        // setFormValue(formValue);
      }
    }
  };

  return (
    <div className={style.wrapper}>
      <Form ref={formRef} fluid model={model} formValue={formValue} onChange={setFormValue} className={style.form}>
        <Form.Group>
          <Form.ControlLabel className="required">Property Name</Form.ControlLabel>
          <Form.Control name="name" placeholder="Enter property name" />
        </Form.Group>
        <Form.Group>
          <Form.ControlLabel className="required">Location</Form.ControlLabel>
          <Form.Control name="location" placeholder="Enter property location" />
        </Form.Group>
        <Form.Group>
          <Form.ControlLabel className="required">Price</Form.ControlLabel>
          <Form.Control name="price" placeholder="Enter property price" />
        </Form.Group>
        <Form.Group>
          <Form.ControlLabel className="required">Description</Form.ControlLabel>
          <Form.Control name="description" placeholder="Enter property description" />
        </Form.Group>
        <Form.Group>
          <Form.ControlLabel className="required">Property Type</Form.ControlLabel>
          <Form.Control
            className="w-full"
            name="type"
            accepter={SelectPicker}
            menuMaxHeight={235}
            data={propertyType}
            placeholder="Select type"
            onClean={() => fetch('')}
          />
        </Form.Group>
      </Form>
      <ButtonToolbar className="button-drawer">
        <Button appearance="ghost" disabled={isLoading} onClick={onCancel}>
          <Text>Cancel</Text>
        </Button>
        <Button type="submit" appearance="primary" disabled={isLoading} loading={isLoading} onClick={handleSubmit}>
          <Text>Save</Text>
        </Button>
      </ButtonToolbar>
    </div>
  );
};

export default PropertyCreateForm;

PropertyCreateForm.defaultProps = {
  onSubmit: () => null,
  initialValue: {
    name: '',
    description: '',
    location: '',
    price: 0,
    status: '',
    type: '',
  },
};
