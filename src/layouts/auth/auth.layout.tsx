import React from 'react';

import { PublicRoute } from '@guards/app.guard';
import { Container, Text } from 'rsuite';

import style from './auth.module.less';

const AuthLayout: React.FC<{ component: React.ReactNode }> = ({ component }) => {
  return (
    <PublicRoute>
      <Container className={style.container}>
        <div className={style.blockBg}>
          <h1 className={style.title}>
            <Text>Get Started with Staycation App</Text>
          </h1>
          <span className={style.subtitle}>
            <Text>Promote and Manage Your Properties Easily</Text>
          </span>
        </div>
        <div className={style.content}>{component}</div>
      </Container>
    </PublicRoute>
  );
};

export default AuthLayout;
