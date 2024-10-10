import { Typography } from "antd";
import { TitleProps } from "antd/es/typography/Title";
import { memo } from "react";

const { Title } = Typography;
const AntdHeader = ({ children, ...props }: TitleProps) => {
  return <Title {...props}>{children}</Title>;
};

export default memo(AntdHeader);
