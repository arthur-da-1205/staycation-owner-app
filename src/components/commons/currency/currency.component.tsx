import classNames from 'classnames';
import React from 'react';
import { NumericFormat } from 'react-number-format';

interface Props {
  value?: number | string | null;
  className?: string;
  onChange?: (val: any) => void;
  displayType?: 'text' | 'input';
  disabled?: boolean;
}

const Currency: React.FC<Props> = ({ value, className, onChange, displayType, disabled }) => {
  return (
    <NumericFormat
      displayType={displayType}
      value={value}
      disabled={disabled}
      thousandSeparator
      prefix={displayType !== 'input' || disabled ? 'Rp' : ''}
      className={classNames({ 'rs-input': displayType === 'input' }, className)}
      onValueChange={(val) => {
        if (onChange) {
          onChange(val);
        }
      }}
    />
  );
};

Currency.defaultProps = {
  value: null,
  className: '',
  displayType: 'text',
  disabled: false,
  onChange: () => undefined,
};

export default Currency;
