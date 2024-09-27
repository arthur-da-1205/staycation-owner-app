import { ProtectedRoute } from '@guards/app.guard';
import { useApp } from '@providers/app.provider';
import routes from '@routes';
import classNames from 'classnames';
import { camelCase, map, startCase } from 'lodash-es';
import React, { useEffect, useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Avatar, Breadcrumb, Button, Divider, Nav, Popover, Sidenav, Text, Whisper } from 'rsuite';
import useBreadcrumbs from 'use-react-router-breadcrumbs';

import style from './main.module.less';

const UserMenu = React.forwardRef((props, ref: any) => {
  const { setLogout } = useApp();
  const navigate = useNavigate();

  return (
    <Popover ref={ref} {...props} visible>
      <div className="flex-col w-30">
        <Button
          appearance="ghost"
          onClick={() => navigate('/profile')}
          className="w-full justify-start border-transparent focus:border-transparent gap-2 mb-0.5"
        >
          <div className="i-heroicons:user-circle text-xl" />
          <Text>Profile</Text>
        </Button>
        <Button
          appearance="ghost"
          onClick={() => navigate('/settings')}
          className="w-full justify-start border-transparent focus:border-transparent gap-2"
        >
          <div className="i-heroicons:cog-6-tooth text-xl" />
          <Text>Settings</Text>
        </Button>
        <Divider className="my-1.5" />
        <Button
          appearance="ghost"
          onClick={setLogout}
          className="w-full justify-start border-Textparent focus:border-transparent gap-2"
        >
          <div className="i-mdi:logout text-xl text-red" />
          <Text>Sign Out</Text>
        </Button>
      </div>
    </Popover>
  );
});

const MainLayout: React.FC = () => {
  const { user } = useApp();
  const location = useLocation();
  const breadcrumbRouters = useBreadcrumbs(routes);
  const [breadCrumbs, setBreadCrumbs] = useState<{ title: any; link: string; active: boolean }[]>([]);
  const [activePath, setActivePath] = useState<string>('');

  const mainMenuNav = [
    {
      icon: 'i-mdi:home-outline',
      nav: `dashboard`,
      link: 'dashboard',
      permission: 'none',
    },
    {
      icon: 'i-mdi:office-building-outline',
      nav: `myProperties`,
      link: 'my-properties',
      permission: 'order',
    },
    {
      icon: 'i-mdi:shopping-outline',
      nav: `orders`,
      link: 'orders',
      permission: 'outbound',
    },
  ];

  useEffect(() => {
    const arr = location.pathname.split('/').filter((val) => val !== '');

    const path = [];

    for (let index = 0; index < arr.length; index++) {
      path.push(arr[index]);
    }

    setActivePath(path[0]);
  }, [location]);

  useEffect(() => {
    const bc = breadcrumbRouters
      .filter((item) => item.key !== '/dashboard')
      .map(({ breadcrumb, match, location }: any) => {
        const routes: any = breadcrumb?.props.children; // get breadcrumb from route

        return {
          title: match.route?.breadcrumb === 'id' ? match.params.id : routes,
          link: match.pathname,
          active: location.pathname === '/dashboard' ? true : match.pathname === location.pathname,
        };
      });

    setBreadCrumbs(bc);
  }, [location]);

  // const hiddenNavItem = (permission: string) => {
  //   const permissionList: any = user?.role?.permissions || {};

  //   if (permissionList?.all === true) {
  //     return false;
  //   }

  //   if (permission !== 'none') {
  //     return !Object.keys(permissionList).includes(permission);
  //   }

  //   return false;
  // };

  return (
    <ProtectedRoute>
      <div className={style.container}>
        <Sidenav className={style.sidenav}>
          <Sidenav.Header className={style.header}>
            <img src="/images/logo/logo-without-text.svg" alt="logo" className="w-10" />
          </Sidenav.Header>
          <Sidenav.Body>
            <Nav>
              <div className="p-2">
                {map(mainMenuNav, (menu, idx) => {
                  return (
                    <Nav.Item
                      key={idx}
                      eventKey={`${idx}`}
                      className={classNames(style.item, {
                        [style.active]: activePath === menu.link,
                        // [style.hidden]: hiddenNavItem(menu.permission),
                      })}
                      as={Link}
                      to={`/${menu.link}`}
                    >
                      <div
                        className={classNames(`${menu.icon} mx-a text-2xl mb-1`, {
                          [`${menu.icon} mx-a text-2xl mb-1 text-white`]: activePath === menu.link,
                        })}
                      />
                      <span className={style.label}>{startCase(camelCase(menu.nav || ''))}</span>
                    </Nav.Item>
                  );
                })}
              </div>
            </Nav>
          </Sidenav.Body>
        </Sidenav>
        <div className={style.content}>
          <div className={style.header}>
            <div className={classNames(breadCrumbs.length > 0 && [style.breadcrumb])}>
              <Breadcrumb separator={<div className="i-heroicons:chevron-right -mb-0.5" />}>
                {breadCrumbs.length > 0 &&
                  breadCrumbs.map((item) => {
                    return (
                      <Breadcrumb.Item key={item.link} href={item.link} active={item.active}>
                        {startCase(camelCase(item.title))}
                      </Breadcrumb.Item>
                    );
                  })}
              </Breadcrumb>
            </div>
            <div className="flex items-center">
              <div className="i-heroicons:bell text-2xl hover:cursor-pointer mr-3 ml-2" />
              <Whisper trigger="click" placement="bottomEnd" speaker={<UserMenu />}>
                <div className={style.profile}>
                  <div className="flex items-center gap-2">
                    <Avatar src={user?.avatar} circle size="sm" className={style.ava}>
                      {user?.name.charAt(0)}
                    </Avatar>
                  </div>
                </div>
              </Whisper>
            </div>
          </div>
          <div className={style.body}>
            <Outlet />
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default MainLayout;
