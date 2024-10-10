import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CFIconButton } from "./CFIconButton";
import { faXmark } from "@fortawesome/pro-regular-svg-icons/faXmark";
import CFTooltip from "./CFTooltip";

import { TooltipPlacement } from "antd/es/tooltip";

interface CFCloseButton {
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  iconClassName?: string;
  tooltipPlacement?: TooltipPlacement;
}

export const CFCloseButton = ({
  onClick,
  className = "w-6 h-6 max-w-[24px] max-h-[24px]",
  iconClassName = "w-[18px] h-[18px]",
  tooltipPlacement = "bottom",
}: CFCloseButton) => {
  return (
    <CFTooltip content={"Close"} placement={tooltipPlacement}>
      <CFIconButton
        htmlType="button"
        className={`group/cancle ${className}`}
        variant="text"
        onClick={onClick}
      >
        <FontAwesomeIcon
          className={`text-base text-primary-800 dark:text-white/90  group-hover/cancle:text-primary-900 group-hover/cancle:rotate-90 ease-in-out duration-300 dark:group-hover/cancle:text-white/90  ${iconClassName}`}
          icon={faXmark}
        />
      </CFIconButton>
    </CFTooltip>
  );
};
