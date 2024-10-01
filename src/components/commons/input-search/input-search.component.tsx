import classNames from 'classnames';
import { debounce } from 'lodash-es';
import React, { useEffect, useRef, useState } from 'react';
import { Input, InputGroup } from 'rsuite';

interface Props {
  onSearch: (e: any) => void;
  className?: string;
  disabled?: boolean;
  defaultValue?: string;
  placeholder?: string;
}

const InputSearch: React.FC<Props> = ({ onSearch, className, disabled, defaultValue, placeholder }) => {
  const [value, setValue] = useState<string>(defaultValue || '');

  const debouncedSearch = useRef(
    debounce((query) => {
      if (query.length >= 3 || query === '' || query === null) {
        onSearch(query);
      }
    }, 300),
  ).current;

  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  useEffect(() => {
    if (defaultValue) {
      setValue(defaultValue);
    }
  }, [defaultValue]);

  return (
    <InputGroup className={classNames(className, 'bg-white')} disabled={disabled}>
      <InputGroup.Addon className={`${!disabled && 'bg-white'} w-8 p-0 flex justify-center`}>
        <div className="i-heroicons:magnifying-glass-solid" />
      </InputGroup.Addon>
      <Input
        placeholder={placeholder || 'Search'}
        className="ps-0"
        value={value}
        onChange={(value: any) => {
          debouncedSearch(value);
          setValue(value);
        }}
      />
      {value !== '' && (
        <InputGroup.Addon
          className={`${!disabled && 'bg-white'} w-8 p-0 flex justify-center hover:cursor-pointer`}
          onClick={() => {
            onSearch('');
            setValue('');
          }}
        >
          <div className="i-heroicons:x-mark-solid text-lg" />
        </InputGroup.Addon>
      )}
    </InputGroup>
  );
};

InputSearch.defaultProps = {
  className: '',
  disabled: false,
  defaultValue: '',
  placeholder: '',
};

export default InputSearch;
