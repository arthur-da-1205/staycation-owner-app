import { camelCase, startCase } from 'lodash-es';
import React from 'react';
import { Badge as RsBadge } from 'rsuite';
import classNames from 'classnames';

import style from './badge.module.less';

interface IBadgeProps {
  content?: string;
}

const Badge: React.FC<IBadgeProps> = ({ content }) => {
  const capitalize = camelCase(content);

  return content ? (
    <RsBadge content={startCase(capitalize)} className={classNames(style.badge, style[capitalize])} />
  ) : (
    startCase(content)
  );
};

export default Badge;

Badge.defaultProps = {
  content: undefined,
};
