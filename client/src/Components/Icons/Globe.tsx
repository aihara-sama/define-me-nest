import React, { FunctionComponent } from 'react';

interface IProps {
  color: string;
  className?: string;
  onClick?: () => void;
  globeIconRef: React.RefObject<SVGSVGElement>;
}
const defaultColor = '#adadad';
const GlobeIcon: FunctionComponent<IProps> = ({
  color = defaultColor,
  className = '',
  onClick,
  globeIconRef,
}) => {
  return (
    <svg
      ref={globeIconRef}
      onClick={onClick}
      xmlns="http://www.w3.org/2000/svg"
      width="24px"
      height="24px"
      viewBox="0 0 24 24"
      fill={defaultColor}
      className={`cursor-pointer transtion duration-200 hover:fill-[#dbdbdb]`}
    >
      <path
        className={`stroke-[${defaultColor}] transtion duration-200`}
        d="M21 12C21 16.9706 16.9706 21 12 21M21 12C21 7.02944 16.9706 3 12 3M21 12H3M12 21C7.02944 21 3 16.9706 3 12M12 21C12 21 16 18 16 12C16 6 12 3 12 3M12 21C12 21 8 18 8 12C8 6 12 3 12 3M3 12C3 7.02944 7.02944 3 12 3"
        strokeWidth="1.5"
      />
    </svg>
  );
};

export default GlobeIcon;
