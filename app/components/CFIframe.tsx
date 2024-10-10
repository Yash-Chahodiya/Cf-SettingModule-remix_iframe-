import IframeResizer, { IframeResizerProps } from "iframe-resizer-react";
import React from "react";

const CFIframe = React.forwardRef<HTMLIFrameElement, IframeResizerProps>(
  ({ style, ...props }, ref) => {
    return (
      <IframeResizer
        {...props}
        ref={ref}
        style={{ width: "1px", minWidth: "100%", ...style }}
      />
    );
  }
);

export default CFIframe;
