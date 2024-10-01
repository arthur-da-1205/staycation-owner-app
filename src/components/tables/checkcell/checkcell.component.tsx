import React from 'react';
import { Checkbox, Table } from 'rsuite';

const { Cell } = Table;

const CheckCell = ({ rowData, onChange, checkedKeys, dataKey, ...props }: any) => (
  <Cell className="checkbox-cell" {...props}>
    <Checkbox
      value={rowData[dataKey]}
      inline
      onChange={onChange}
      checked={checkedKeys?.some((item: any) => item === rowData[dataKey])}
      className="top-2 left-2"
    />
  </Cell>
);

export default CheckCell;
