import { Tooltip } from "antd";

const CFTooltip = ({ children, content, placement }: any) => {
  return (
    <Tooltip title={content} placement={placement}>
      {children}
    </Tooltip>
  );
};

export default CFTooltip;
