import React, { useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Drawer, Text } from 'rsuite';

import PageTitle from '@components/page-title/page-title.component';
import DetailPageLayout from '@layouts/detail/detail.layout';

const PropertyDetailPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [isOpen, setIsOpen] = useState<boolean>(true);

  const nav = [
    {
      path: 'overview',
      name: `Overview`,
      icon: 'i-mdi:file-document-outline',
    },

    {
      path: 'oeder-history',
      name: `Order History`,
      icon: 'i-mdi:history',
    },
  ];

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleExited = () => {
    navigate({
      pathname: `/my-properties`,
      search: location.search,
    });
  };

  return (
    <>
      <PageTitle title="Property Detail" />
      <Drawer size="md" open={isOpen} onClose={handleClose} onExited={handleExited}>
        <Drawer.Header>
          <Drawer.Title>
            <Text>Inventory Detail</Text>
          </Drawer.Title>
        </Drawer.Header>
        <Drawer.Body>
          <DetailPageLayout nav={nav}>
            <div className="flex flex-col h-full">
              <Outlet />
            </div>
          </DetailPageLayout>
        </Drawer.Body>
      </Drawer>
    </>
  );
};

export default PropertyDetailPage;
