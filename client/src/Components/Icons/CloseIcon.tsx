import React, { FunctionComponent } from 'react';

interface IProps {
  color: string;
  className?: string;
  onClick?: () => void;
}
const defaultColor = '#494C4E';
const CloseIcon: FunctionComponent<IProps> = ({
  color = defaultColor,
  className = '',
  onClick,
}) => {
  return (
    <svg
      onClick={onClick}
      xmlns="http://www.w3.org/2000/svg"
      width="30px"
      height="30px"
      viewBox="0 0 24 24"
      fill={color}
      className={className}
    >
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M12 12 7 7m5 5 5 5m-5-5 5-5m-5 5-5 5"
      />
    </svg>
  );
};

export default CloseIcon;
