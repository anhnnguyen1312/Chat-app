import React from 'react';
type ButtonProps = {
   icon? :string,
  children:React.ReactNode; 
  textColor?:string,
  borderRounded?:string,
  bgColor?:string,
  custom?:string,
  hovercolor?:string,
  borderColor?:string,
  onClick: () => void,
  fullWidth?:boolean,
  style?:string,
  height?:string,
  width?:string,
  fullRounded ?:string,
  title?:string,
}
const Button = ({
  icon,
  children,
  textColor,
  borderRounded,
  bgColor,
  custom,
  hovercolor,
  borderColor,
  onClick,
  fullWidth,
  style,
  height,
  width,
  fullRounded,
  title,
}:ButtonProps) => {
  return (
    <>
      <button
        type="button"
        onClick={onClick}
        title={title}
        className={`  py-1 w-15 ${style} text-base font-thin ${textColor} ${fullRounded} ${custom} ${width} ${height} ${hovercolor} ${fullWidth && 'w-full'} ${bgColor} ${borderColor} ${borderRounded || 'rounded'}  border border-1 rounded `}
      >
        <i className={`${icon}`}></i>
        {children}
      </button>
    </>
  );
};
export default Button;
