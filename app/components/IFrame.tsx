import {
  NavigateFunction,
  useLocation,
  useNavigate,
  useParams,
} from "@remix-run/react";
import { memo, useEffect, useState } from "react";

import _ from "lodash";
import CFIframe from "./CFIframe";
import {
  getIframeUrl,
  isFullPageIframe,
  messageListenerChangeData,
} from "~/helpers/getframeUri";

interface RouteParams {
  id?: string;
  tab?: string;
}

const Iframe = ({
  defaultPage,
  path,
  isSetting,
  otherParams = "",
  isRemixUrl = false,
  onKanbanClose,
}: {
  defaultPage?: string;
  path?: string;
  otherParams?: string;
  isSetting?: boolean;
  isRemixUrl?: boolean;
  onKanbanClose?: (value: boolean) => void;
}) => {
  const { isEmpty } = _;
  const authorization =
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6ImhhcnNoaWwuc2FraGl5YSs4NTQ1QHdlZW5nZ3MuaW4iLCJ1c2VyX2lkIjoxMDk4NzEsImNvbXBhbnlfaWQiOjgyOSwiZW1haWwiOiJoYXJzaGlsLnNha2hpeWErODU0NUB3ZWVuZ2dzLmluIiwiZnVsbE5hbWUiOiJoYXJzaGlsIHRlc3QiLCJyb2xlX2lkIjo5MjQ4NCwiY2ZfdG9rZW4iOiIkMmEkMTIkZTAzMDQ4ZmQxZTI0NmYwNGRiNWJlZTQ5NzV6enE0UkpadTlCT2JRSE9keklpZnJEL0piLzZfMF8wIn0.hlkooYTtEgZ0gIkWx1_4FcqYfStlfQ6kfiaA0KHLRkg";
  const params: RouteParams = useParams();
  const [currentUrl, setCurrentUrl] = useState<string>("");
  const [messageData, setMessageData] = useState<any | undefined>();
  //   const gConfig: GConfig = getGConfig();
  //   const gUser: GUser = getGUser();
  const navigate: NavigateFunction = useNavigate();
  // const { setNotify }: { setNotify: any } = notificationApi();
  const location = useLocation();

  useEffect(() => {
    if (authorization) {
      if (isRemixUrl) {
        setCurrentUrl(`${path}${otherParams}&authorize_token=${authorization}`);
      } else {
        setCurrentUrl(
          getIframeUrl({
            authorization: authorization,
            path,
            otherParams,
            defaultPage,
            isSetting,
          })
        );
      }
    }
  }, [authorization, defaultPage, otherParams, path, isSetting, isRemixUrl]);

  useEffect(() => {
    const messageListener = (event: MessageEvent) => {
      setMessageData(event?.data);
    };
    window.addEventListener("message", messageListener);
    return () => {
      window.removeEventListener("message", messageListener);
    };
  }, []);

  useEffect(() => {
    if (messageData && messageData?.key) {
      // receive iframe data
      messageListenerChangeData({
        messageData,
        navigate,
        // setNotify,
        authorization,
        onKanbanClose,
      });
    }
  }, [messageData]);

  return (
    <div
      className={
        !isFullPageIframe({ location, params })
          ? "max-h-[calc(100vh-144px)]"
          : ""
      }
    >
      <CFIframe
        scrolling="omit"
        src={currentUrl}
        id="global-iframe"
        style={{
          height: !isFullPageIframe({ location, params })
            ? "calc(100vh - 144px)"
            : "100vh",
        }}
      />
    </div>
  );
};

export default memo(Iframe);
