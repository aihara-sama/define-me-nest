import React, { FunctionComponent, SyntheticEvent } from 'react';

interface IProps {
  color: string;
  className?: string;
  onClick?: (e: SyntheticEvent) => void;
}
const defaultColor = '#494C4E';
const ChangeIcon: FunctionComponent<IProps> = ({
  color = defaultColor,
  className = '',
  onClick,
}) => {
  return (
    <svg
      onClick={onClick}
      xmlns="http://www.w3.org/2000/svg"
      width="27px"
      height="27px"
      viewBox="0 0 13 13"
      fill={color}
      className={className}
    >
      <path
        className=""
        d="M4.86955 13C4.71788 13 4.56621 12.9685 4.42376 12.9052C4.03917 12.7329 3.79163 12.3473 3.79163 11.922V11.7888C2.24138 11.2775 -0.0986183 9.79871 0.00321504 7.02754C0.00321504 6.44688 0.490715 5.95829 1.09196 5.95829C1.44026 5.95829 1.77013 6.12729 1.97488 6.41004L2.03121 6.49996C2.39305 7.06167 2.98455 7.40888 3.79163 7.53725C3.81167 7.14725 4.04892 6.78975 4.40696 6.61479C4.7168 6.44688 5.23842 6.48317 5.56071 6.75021L8.26038 8.91146C8.51767 9.11404 8.66663 9.42279 8.66663 9.75646C8.66663 10.089 8.51821 10.3983 8.25821 10.6036L5.55205 12.7703C5.34621 12.922 5.1068 13 4.86955 13ZM1.10713 7.06492C0.982548 9.96825 4.31813 10.8198 4.46005 10.8544L4.87334 10.9552L4.87496 11.922L7.5833 9.75538L4.87496 7.58871V8.691L4.31434 8.6715C2.46346 8.6065 1.54967 7.76313 1.10767 7.06438L1.10713 7.06492ZM11.9085 7.04163C11.5597 7.04163 11.2298 6.87263 11.0256 6.58988L10.9671 6.49996C10.6058 5.93825 10.0154 5.59104 9.20667 5.46321C9.18771 5.85321 8.95046 6.21179 8.59188 6.38567C8.28205 6.5525 7.7588 6.51567 7.43813 6.24863L4.73955 4.08954C4.48226 3.88642 4.3333 3.57713 4.3333 3.24454C4.3333 2.91142 4.48171 2.60267 4.74171 2.39684L7.44788 0.231252C7.78588 -0.0206228 8.21163 -0.0682894 8.57671 0.0958356C8.9613 0.267002 9.2083 0.653211 9.2083 1.07679V1.21004C10.7585 1.72084 13.0985 3.20013 12.9967 5.97129C12.9967 6.5525 12.5092 7.04054 11.908 7.04054L11.9085 7.04163ZM8.12496 4.30784L8.68559 4.32788C10.5348 4.39288 11.4497 5.23571 11.8912 5.93392C12.0168 3.03059 8.68071 2.18017 8.53826 2.1455L8.12496 2.04475V1.07788L5.41663 3.24454L8.12496 5.41121V4.30729V4.30784Z"
        fill={'inherit'}
      />
    </svg>
  );
};

export default ChangeIcon;
