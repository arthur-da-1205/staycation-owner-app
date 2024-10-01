import React from 'react';

interface Props {
  image: string;
  title: string;
  children?: React.ReactNode;
  description?: string;
  className?: string;
  classNameImage?: string;
}

const EmptyContent: React.FC<Props> = ({ image, title, description, children, className, classNameImage }) => {
  return (
    <div className={`flex flex-col justify-center items-center w-full h-full gap-3 ${className}`}>
      <img className={classNameImage} src={image} alt="illustration-empty-content" />
      <h6 className="text-black line-height-none">{title}</h6>
      {description && <p className="line-height-none">{description}</p>}
      {children}
    </div>
  );
};

EmptyContent.defaultProps = {
  description: '',
  className: '',
  classNameImage: '',
  children: null,
};

export default EmptyContent;
