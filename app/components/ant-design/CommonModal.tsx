import React from "react";

import { CFCloseButton } from "./CFCloseButton";
import { Typography } from "./Typography";
import Header from "./Header";
import Modal from "./Modal";

const CommonModal = React.forwardRef<HTMLDivElement, any>(
  (
    {
      header,
      isOpen,
      centered = true,
      maskClosable = false,
      children,
      footer = "",
      modalBodyClass = "p-4",
      widthSize = 500,
      onCloseModal,
      rootClassName,
      height,
      ...props
    },
    ref
  ) => {
    return (
      <>
        <Modal
          open={isOpen}
          width={widthSize}
          maskClosable={maskClosable}
          centered={centered}
          onCancel={onCloseModal}
          closable={false}
          rootClassName={rootClassName}
          footer={footer}
          {...props}
        >
          {!!header && (
            <div className="flex items-center justify-between w-full py-2.5 px-4 border-b border-gray-200 dark:border-white/10">
              <div className="flex items-center w-[calc(100%-40px)]">
                {!!header?.icon && (
                  <div className="w-8 h-8 flex items-center justify-center bg-[#e4ecf68c] dark:bg-dark-500 mr-2.5 text-primary-900 dark:text-white/90 rounded-full">
                    {header?.icon}
                  </div>
                )}
                <div
                  className={`w-[calc(100%-54px)] ${header?.className || ""} ${
                    !!header?.subTitle && "flex flex-col"
                  }`}
                >
                  <Header
                    level={5}
                    className="truncate !text-[17px] !mb-0 !text-primary-900 font-semibold dark:!text-white/90"
                  >
                    {header?.title}
                  </Header>
                  {!!header?.subTitle && (
                    <Typography
                      className={`truncate text-13 !mb-0 text-[#777] font-normal ${header?.subTitleClass}`}
                    >
                      {header?.subTitle}
                    </Typography>
                  )}
                </div>
              </div>
              <div className={`${header?.rightSideClass}`}>
                {!!header?.rightIcon && header?.rightIcon}
                {header?.closeIcon && <CFCloseButton onClick={onCloseModal} />}
              </div>
            </div>
          )}

          <div ref={ref} className={`${modalBodyClass} px-2`}>
            {children}
          </div>
          {!!footer && (
            <div
              className={`py-2.5 px-4 gap-2.5 justify-center flex border-t border-gray-300`}
            >
              {footer}
            </div>
          )}
        </Modal>
      </>
    );
  }
);

export default CommonModal;
