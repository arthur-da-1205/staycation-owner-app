import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import style from './link-button.module.less';

interface Props {
  label: string;
  link: any;
  search?: any;
  className?: any;
}

const LinkButton: React.FC<Props> = ({ label, link, search, className }) => {
  return (
    <div className={classNames(style.label, className)}>
      <Link to={{ pathname: link, search }}>{label}</Link>
    </div>
  );
};

LinkButton.defaultProps = {
  className: null,
  search: '',
};

export default LinkButton;
