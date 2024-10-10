import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ButtonProps } from "antd";
import { ButtonType } from "antd/es/button";
import React from "react";

import { ClientOnly } from "remix-utils/client-only";
import { Button } from "./Button";

export interface CFIconButtonProps extends Omit<ButtonProps, "icon"> {
  variant?: ButtonType;
  icon?: IconProp;
  iconClass?: string;
}

export const CFIconButton = React.forwardRef<
  HTMLButtonElement,
  CFIconButtonProps
>(
  (
    {
      icon,
      iconClass = "w-4 h-4 ",
      shape = "default",
      type,
      className = "",
      variant = "primary",
      ...props
    },
    ref
  ) => {
    const getButtonColor = () => {
      if (variant === "primary") {
        return "hover:bg-primary-900 dark:hover:bg-[#121f36] dark:hover:text-white hover:text-primary-900 active:bg-primary-gray-20";
      } else if (variant === "default") {
        return "border-[#ccc] hover:bg-primary-gray-20";
      }
    };

    return (
      <ClientOnly>
        {() => (
          <Button
            type={variant}
            shape={shape}
            icon={
              icon && (
                <FontAwesomeIcon
                  className={`text-base text-primary-gray-80 dark:!text-white/90 group-hover/buttonHover:text-white ${iconClass}`}
                  icon={icon}
                />
              )
            }
            ref={ref}
            className={`p-0 group/buttonHover flex items-center justify-center shadow-none rounded focus-visible:!outline-0 ${getButtonColor()} ${
              className ?? ""
            }`}
            {...props}
          />
        )}
      </ClientOnly>
    );
  }
);
