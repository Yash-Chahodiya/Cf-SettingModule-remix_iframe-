import { Modal, ModalProps } from "antd";

const AntdModal = ({ children, ...props }: ModalProps) => {
  return <Modal {...props}>{children}</Modal>;
};

export default AntdModal;
