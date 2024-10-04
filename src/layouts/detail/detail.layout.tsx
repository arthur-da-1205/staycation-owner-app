import React, { useEffect } from 'react';
import { Nav, Sidenav } from 'rsuite';

import { map } from 'lodash-es';
import { useLocation, useNavigate } from 'react-router-dom';

import style from './detail.module.less';

interface Props {
  nav: any[];
  children: React.ReactNode;
}

const DetailPageLayout: React.FC<Props> = ({ nav, children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [activeKey, setActiveKey] = React.useState('0');
  const [expanded, setExpanded] = React.useState(false);

  useEffect(() => {
    const splitArr = location.pathname.split('/');
    const index = nav.findIndex((val) => val.path === splitArr[3]);

    if (index >= 0) {
      setActiveKey(index.toString());
    }
  }, [location]);

  return (
    <div className="flex gap-3 h-full">
      <Sidenav className={style.sidenav} expanded={expanded}>
        <Sidenav.Body className="h-full">
          <Nav activeKey={activeKey} onSelect={setActiveKey}>
            {map(nav, (menu, index) => {
              return (
                <Nav.Item
                  key={index}
                  className={style.item}
                  eventKey={`${index}`}
                  icon={
                    <>
                      <div className={`${menu.icon} text-xl absolute left-4 z-1055`} />
                    </>
                  }
                  onMouseEnter={() => setExpanded(true)}
                  onMouseLeave={() => setExpanded(false)}
                  onClick={() => navigate({ pathname: menu.path, search: location.search })}
                >
                  {menu.name}
                </Nav.Item>
              );
            })}
          </Nav>
        </Sidenav.Body>
      </Sidenav>

      <div className={style.children}>{children}</div>
    </div>
  );
};

export default DetailPageLayout;
