import React, { useEffect } from 'react';

const PageTitle: React.FC<{ title: string }> = ({ title }) => {
  useEffect(() => {
    document.title = `${title} - Staycation App`;
  }, []);

  return <></>;
};

export default PageTitle;
