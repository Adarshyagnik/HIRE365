import classnames from "classnames";
import {
  ChangeEvent,
  forwardRef,
  ReactElement,
  Ref,
  useEffect,
  useMemo,
  useState,
} from "react";
import React from "react";
import Icon from "./Icon";

type InputProps = {
  type?: "text" | "number" | "password" | "email" | "date" | "search";
  size?: "lg" | "md" | "sm" | "xs" | "xxs";
  leftIcon?: ReactElement;
  rightIcon?: ReactElement;
  hint?: string;
  message?: boolean;
  value?: string;
  onChange?: (value: ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  name?: string;
  id?: string;
  className?: string;
  placeholder?: string;
  isDisabled?: boolean;
  isFailure?: boolean;
  required?: boolean;
  onClick?: () => void;
  ref: Ref<HTMLInputElement>;
  max?: string | number;
  min?: string | number;
  labelClassName?: string;
};

const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const {
    type = "text",
    size = "xs",
    label,
    leftIcon,
    rightIcon,
    hint,
    message = false,
    value,
    onChange,
    name,
    id,
    className,
    placeholder,
    isDisabled = false,
    isFailure = false,
    required = false,
    onClick,
    max,
    min,
    labelClassName
  } = props;
  const [state, setState] = useState<
    "failure" | "active" | "resting" | "completed"
  >("resting");
  const [isFocused, setIsFocused] = useState(false);
  const [showData, setShowData] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
    if (value === "") {
      setState("active");
    }
  };
  useEffect(() => {
    handleBlur();
  }, []);

  //TODO: Should use input states like :hover , :active to make stylings.
  const handleBlur = () => {
    setIsFocused(false);
    if (value === "") {
      setState("resting");
    } else {
      setState("completed");
    }
  };
  const inputType = showData ? "text" : type;

  const getRightIcon = () => {
    if (type === "password") {
      return (
        <Icon
          src={
            inputType && showData
              ? "/hire-365/src/assets/icon-close-eye.svg"
              : "/hire-365/src/assets/icon-eye.svg"
          }
          onClick={togglePasswordVisibility}
        />
      );
    }
    return rightIcon;
  };

  const togglePasswordVisibility = () => {
    setShowData(!showData);
  };

  const boxClasses = useMemo(() => {
    return classnames(
      "border-[0.063rem] flex flex-row gap-2",
      className,
      {
        "py-[1rem] px-[1rem] h-[3.25rem]": size === "lg",
        "py-[0.625rem] px-[1rem] h-[2.375rem]": size === "md",
        "py-[0.625rem] px-[0.75rem] h-[2.25rem]": size === "sm",
        "py-[0.5rem] px-[0.75rem] h-[2rem]": size === "xs",
        "py-[0.375rem] px-[0.5rem] h-[1.5rem]": size === "xxs",
        "px-[0.25rem]": leftIcon,
      },
      {
        "border-[#E0E7EE]": (value && value.length > 0) || !isFocused,
        "border-[#018079]": isFocused,
        "border-[#E73F3F] h-[2.375rem] ": state === "failure",
      },
      {
        "border-[#018079]": state === "active",
        "border-[#E0E7EE]": state === "resting",
      },
      {
        "bg-[#F9F9FB] placeholder:text-[#939FAC]": isDisabled === true,
      },
      {
        "h-[10rem]": message,
      },
      {
        "border-[#E73F3F]": isFailure === true,
      },
    );
  }, [
    className,
    size,
    leftIcon,
    value,
    isFocused,
    state,
    isDisabled,
    message,
    isFailure,
  ]);

  const labelClasses = classnames(
    "flex font-display font-medium text-[0.875rem] leading-[1.125rem] whitespace-nowrap ",labelClassName,
    {
      "text-[#939FAC]": isDisabled,
    },
    {
      "text-[#E73F3F]": isFailure,
    },
  );

  const hintClasses = classnames(
    "text-[0.625rem] leading-4",
    {
      "text-[#939FAC]": isDisabled,
    },
    {
      "text-[#E73F3F]": isFailure,
    },
  );

  const inputClasses = useMemo(() => {
    return classnames("outline-none bg-none w-full", className, {
      "px-[0.75rem]": !leftIcon,
      "h-[1rem] text-[0.938rem] leading-5 pl-1": size === "lg",
      "h-[1rem] text-sm leading-[1.125rem] pl-1": size === "md",
      "h-[0.938rem] text-xs leading-4 pl-1": size === "sm",
      "h-[0.875rem] text-xs leading-4 pl-1": size === "xs",
      "text-[0.625rem] leading-[0.875rem] pl-1": size === "xxs",
    });
  }, [className, leftIcon, size]);

  return (
    <div className="grid grid-cols-1 gap-1 relative">
      {label && (
        <label className={labelClasses}>
          {required ? (
            <>
              <span>{label}</span>
              <span className="font-display text-[#018079]"> *</span>
            </>
          ) : (
            label
          )}
        </label>
      )}
      <div className={boxClasses}>
        {leftIcon}
        <input
          type={inputType}
          name={name}
          id={id}
          value={value}
          onChange={onChange}
          className={inputClasses}
          placeholder={
            state === "active"
              ? ""
              : `${
                  placeholder ||
                  `Enter ${label || type === "text" ? "text" : "number"}`
                }`
          }
          onFocus={handleFocus}
          onBlur={handleBlur}
          disabled={isDisabled}
          onClick={onClick}
          ref={ref}
          max={max}
          min={min}
        />
        {getRightIcon()}
      </div>
      <p className={hintClasses}>{hint}</p>
    </div>
  );
});

export default Input;