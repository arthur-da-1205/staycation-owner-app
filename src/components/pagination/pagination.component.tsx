import { IPaging } from '@resources/input/pagination.input';
import React from 'react';
import { Pagination as Paging, SelectPicker, Text } from 'rsuite';

interface Props {
  meta: IPaging;
  onChangePage: (e: any) => void;
  onChangeLimit: (e: any) => void;
  defaultLimit: any;
}

const Pagination: React.FC<Props> = ({ meta, onChangePage, onChangeLimit, defaultLimit }) => {
  const data = [10, 25, 50, 75, 100].map((item) => ({ label: item, value: item }));

  return (
    <div className="flex justify-between items-center">
      <div className="flex gap-2 items-center">
        <span className="text-stone">
          <Text>Row per page</Text>
        </span>
        <SelectPicker
          data={data}
          value={Number(defaultLimit)}
          placement="topStart"
          size="sm"
          searchable={false}
          cleanable={false}
          onSelect={onChangeLimit}
        />
      </div>
      <Paging
        prev
        next
        first
        last
        ellipsis
        boundaryLinks
        size="sm"
        maxButtons={5}
        layout={['pager']}
        total={meta.total_count}
        limitOptions={[25, 50, 75, 100]}
        limit={meta.per_page}
        activePage={meta.page || 1}
        onChangePage={onChangePage}
      />
    </div>
  );
};

export default Pagination;
