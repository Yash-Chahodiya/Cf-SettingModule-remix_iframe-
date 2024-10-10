import { Button as AntdButton, ButtonProps } from "antd";
import React from "react";

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => {
    return <AntdButton {...props} ref={ref} />;
  }
);
