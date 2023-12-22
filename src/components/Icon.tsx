import classNames from "classnames";
import React from "react";
import { MouseEventHandler } from "react";
import { ReactSVG } from "react-svg";

const Icon = ({
  src,
  iconWrapperClass,
  svgClass,
  onClick,
}: {
  src: string;
  iconWrapperClass?: string;
  svgClass?: string;
  onClick?: MouseEventHandler;
}) => {
  // ToDO : ask and remove below
  const classes = classNames(
    "aspect-square flex flex-col justify-center",
    { "cursor-pointer": onClick },
    iconWrapperClass ?? "w-5",
  );

  return (
    <ReactSVG
      src={src}
      className={classes}
      onClick={onClick}
      afterInjection={(svg) => {
        if (svgClass) svg.classList.add(svgClass);
      }}
    />
  );
};

export default Icon;