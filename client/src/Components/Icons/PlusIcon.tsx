import React, { FunctionComponent, SyntheticEvent } from 'react';

interface IProps {
  color: string;
  className?: string;
  onClick?: (e: SyntheticEvent) => void;
}
const defaultColor = '#adadad';
const PlusIcon: FunctionComponent<IProps> = ({
  color = defaultColor,
  className = '',
  onClick,
}) => {
  return (
    <svg
      onClick={onClick}
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="21"
      viewBox="0 0 23 22"
      fill="currentColor"
      className={` cursor-pointer ${className}`}
      // className={`cursor-pointer transtion duration-200 hover:fill-[#dbdbdb]`}
    >
      <rect
        x="9.95569"
        width="2.12903"
        height="22"
        fill={defaultColor}
        className={` transtion duration-200 hover:fill-[#dbdbdb]`}
      />
      <rect
        x="22.0404"
        y="10.1702"
        width="2.12903"
        height="22"
        transform="rotate(91.2214 22.0404 10.1702)"
        fill={defaultColor}
        className={` transtion duration-200 hover:fill-[#dbdbdb]`}
      />
    </svg>
  );
};

export default PlusIcon;
