import React from 'react';
import classNames from 'classnames';

import style from './card.module.less';

interface Props {
  children: React.ReactNode;
  title?: string;
  className?: string;
  withTitle?: boolean;
}

const Card: React.FC<Props> = ({ children, title, className, withTitle }) => {
  return (
    <div className={classNames(style.card, className)}>
      {withTitle && <h5>{title}</h5>}
      {children}
    </div>
  );
};

Card.defaultProps = {
  title: '',
  className: undefined,
  withTitle: true,
};

export default Card;
