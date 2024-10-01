import { QueryOptions } from '@apollo/client';
import Pagination from '@components/pagination/pagination.component';
import InputSearch from '@components/commons/input-search/input-search.component';
import { paramsToObject } from '@helpers/utils.helper';
import { useGqlQueryPaginate } from '@hooks/useGql';
import { GqlPaginateModel } from '@libraries/graphql/model';
import { IPaging } from '@resources/input/pagination.input';
import classNames from 'classnames';
import { forEach, snakeCase } from 'lodash-es';
import React, { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Checkbox, Table } from 'rsuite';

import EmptyContent from '@components/commons/empty-content/empty-content.component';
import { useToast } from '@hooks/useToast';
import CheckCell from '../checkcell/checkcell.component';
import style from './query-table.module.less';

const { Column, HeaderCell } = Table;

export interface FilterProps {
  [key: string]: string | undefined;
}

interface Props {
  query: string;
  model: any;
  children: React.ReactNode;
  globalAction?: React.ReactNode;
  isSelectable?: boolean;
  expandedRowKeys?: any[];
  refresh?: any;
  renderRowExpanded?: (rowData: any) => React.ReactNode;
  callbackChecked?: (e: any) => void;
  className?: string;
  bulkAction?: React.ReactNode;
  globalActionClassname?: string;
  withFilter?: boolean;
}

const QueryTable: React.FC<Props> = ({
  query,
  model,
  isSelectable,
  globalAction,
  expandedRowKeys,
  renderRowExpanded,
  refresh,
  children,
  callbackChecked,
  className,
  bulkAction,
  globalActionClassname,
  withFilter,
}) => {
  const toast = useToast();
  const GqlModel = new GqlPaginateModel(query, model);

  const [trigger, { loading }] = useGqlQueryPaginate<typeof GqlModel.nodes>({ fetchPolicy: 'no-cache' } as QueryOptions);
  const [searchParams, setSearchParams] = useSearchParams();

  const tableExpandRef = useRef<any>(null);

  const [expandHeight, setExpandHeight] = useState<number>(0);
  const [filters, setFilters] = useState<FilterProps>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [checkedKeys, setCheckedKeys] = useState<any[]>([]);
  const [sortType, setSortType] = useState<any>();
  const [sortColumn, setSortColumn] = useState<any>();
  const [data, setData] = useState<any[]>([]);
  const [meta, setMeta] = useState<IPaging>({
    page: 1,
    per_page: 10,
    total_count: 1,
    page_count: 1,
  });

  const fetch = async (attribute: any) => {
    setIsLoading(true);

    try {
      const params = {
        page: attribute.page || 1,
        per_page: attribute.per_page || 10,
        sort: snakeCase(attribute.field) || '',
        search: attribute.search ? attribute.search.toString() : '',
      };

      const statusFilter = attribute.status !== 'all' ? attribute.status : '';
      const field = { status: statusFilter, is_bundle: attribute.is_bundle ? attribute.is_bundle : '' };

      if (field.is_bundle === '') {
        delete field.is_bundle;
      }

      const paramsFilter = attribute.status || attribute.is_bundle ? { ...params, field } : params;

      GqlModel.setParams(query, withFilter ? paramsFilter : params);

      // Trigger Query
      const { items, error, meta } = await trigger(GqlModel.query());

      // Handle Response
      if (error) {
        toast.error(error);
      } else {
        setData(items);
        setMeta({
          total_count: meta?.total_count || 1,
          page: meta?.page || 1,
          per_page: meta?.per_page || 10,
          page_count: meta?.page_count || 1,
        });
      }
    } catch (error: any) {
      toast.error(error);
    }

    setIsLoading(false);
  };

  const onFilter = (values: any) => {
    const newVal = { ...filters, ...values };

    setFilters((old) => {
      return { ...old, ...newVal };
    });
  };

  useEffect(() => {
    if (filters) {
      forEach(Object.keys(filters), (key) => {
        if (!filters[key] || typeof filters[key] === 'undefined' || filters[key] === '') {
          searchParams.delete(key);
        } else {
          searchParams.set(key, filters[key] || '');
        }
      });

      setSearchParams(searchParams, { replace: true });
    }
  }, [filters]);

  useEffect(() => {
    const params = paramsToObject(searchParams);

    setFilters(params);

    if (params.per_page > 100) {
      Object.assign(params, { per_page: 100 });
    }

    if (filters?.status) {
      if (params.status !== filters?.status) {
        Object.assign(params, { per_page: 1 });
      }
    } else {
      Object.assign(params, { per_page: params.per_page });
    }

    fetch(params);

    if (params.field && params.direction) {
      setSortType(params.direction);
      setSortColumn(params.field);
    }
  }, [searchParams, refresh]);

  useEffect(() => {
    setExpandHeight((tableExpandRef.current?.clientHeight || 220) + 20);
  }, [expandedRowKeys]);

  return (
    <>
      <div className={style.actionMenu}>
        <div className={style.bulkAction}>{bulkAction}</div>
        <div className={`${style.globalAction} ${checkedKeys.length > 0 && globalActionClassname}`}>
          <InputSearch
            defaultValue={filters?.search}
            onSearch={(search) => onFilter({ search, page: 1 })}
            className="w-300px ml-0 z-0"
          />
          {checkedKeys.length === 0 && globalAction}
          {checkedKeys.length > 0 && <div className={style.layer} />}
        </div>
      </div>
      <div
        className={classNames(
          style.container,
          {
            [style.withoutBorder]: data && data.length <= 11 && !isLoading && data.length > 0,
          },
          className,
        )}
      >
        <Table
          data={data}
          rowKey="id"
          fillHeight
          shouldUpdateScroll={false}
          loading={isLoading || loading}
          headerHeight={50}
          rowHeight={50}
          rowExpandedHeight={expandHeight}
          className={data.length <= 11 ? 'cell-bordered' : ''}
          sortType={sortType}
          sortColumn={sortColumn}
          expandedRowKeys={expandedRowKeys}
          renderRowExpanded={(rowData) => {
            return renderRowExpanded && <div ref={tableExpandRef}>{renderRowExpanded(rowData)}</div>;
          }}
          renderEmpty={() => {
            return (
              <EmptyContent
                image="/images/illustrations/no-quick-data.svg"
                title="Information unavailable"
                description={`We don't have anything yet.`}
              />
            );
          }}
          onSortColumn={(dataKey: string, sortType: any) => {
            setSortType(sortType);
            setSortColumn(dataKey);

            onFilter({ field: dataKey, direction: sortType });
          }}
        >
          {isSelectable && (
            <Column width={40} align="left" fixed="left">
              <HeaderCell className="checkbox-cell">
                <Checkbox
                  inline
                  disabled={data.length === 0}
                  checked={checkedKeys.length === data.length && data.length > 0}
                  indeterminate={checkedKeys.length > 0 && checkedKeys.length < data.length}
                  className="top-2 left-2"
                  onChange={(_, checked) => {
                    const keys = checked ? data.map((item) => item.id) : [];

                    if (callbackChecked) {
                      callbackChecked(keys);
                    }

                    setCheckedKeys(keys);
                  }}
                />
              </HeaderCell>
              <CheckCell
                dataKey="id"
                checkedKeys={checkedKeys}
                onChange={(value: string, checked: boolean) => {
                  const keys = checked ? [...checkedKeys, value] : checkedKeys.filter((item) => item !== value);

                  if (callbackChecked) {
                    callbackChecked(keys);
                  }

                  setCheckedKeys(keys);
                }}
              />
            </Column>
          )}
          {children}
        </Table>
      </div>
      <div className={style.pagination}>
        <Pagination
          meta={meta}
          defaultLimit={filters?.size || 25}
          onChangePage={(page) => onFilter({ current: page })}
          onChangeLimit={(limit) => onFilter({ size: limit, current: 1 })}
        />
      </div>
    </>
  );
};

QueryTable.defaultProps = {
  bulkAction: undefined,
  isSelectable: false,
  refresh: false,
  globalAction: undefined,
  globalActionClassname: '',
  className: undefined,
  expandedRowKeys: [],
  withFilter: true,
  renderRowExpanded: () => undefined,
  callbackChecked: () => undefined,
};

export default QueryTable;
