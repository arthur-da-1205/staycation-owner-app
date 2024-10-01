import Badge from '@components/commons/badge/badge.components';
import LinkButton from '@components/commons/link-button/link-button.component';
import PageTitle from '@components/page-title/page-title.component';
import QueryTable from '@components/tables/query-table/query-table.component';
import { AccommodationModel } from '@resources/models/accommodation.model';
import React from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Button, Table, Text } from 'rsuite';

const { Column, HeaderCell, Cell } = Table;

const PropertyPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <>
      <PageTitle title="My Properties" />
      <QueryTable
        query="ownerAccommodationList"
        model={AccommodationModel}
        globalActionClassname="left-40"
        // isSelectable
        refresh={location.state !== null}
        globalAction={
          <Button
            appearance="primary"
            startIcon={<div className="i-heroicons:plus-20-solid text-lg" />}
            onClick={() => navigate({ pathname: 'create', search: location.search })}
          >
            <Text>Add Accommodations</Text>
          </Button>
        }
      >
        <Column flexGrow={1} sortable>
          <HeaderCell>
            <Text>Name</Text>
          </HeaderCell>
          <Cell dataKey="name">
            {(rowData) => <LinkButton label={rowData.name} link={`${rowData.id}/overview`} search={location.search} />}
          </Cell>
        </Column>
        <Column flexGrow={1}>
          <HeaderCell>
            <Text>Type</Text>
          </HeaderCell>
          <Cell dataKey="type">
            {(rowData) => {
              return <Text>{rowData.type}</Text>;
            }}
          </Cell>
        </Column>
        <Column flexGrow={1}>
          <HeaderCell>
            <Text>status</Text>
          </HeaderCell>
          <Cell dataKey="status">
            {(rowData) => {
              return <Badge content={rowData.status} />;
            }}
          </Cell>
        </Column>
      </QueryTable>
      <Outlet />
    </>
  );
};

export default PropertyPage;
