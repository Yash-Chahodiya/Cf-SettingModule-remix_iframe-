import _ from "lodash";
import pkg from "crypto-js";

const IFRAME_TOKEN = "597bd4f6a2d83cc1087b98a343bed7ef";

const PANEL_URL = "https://cfdev.contractorforeman.net/";

export function removeLeadingSlash(str: string) {
  if (str.startsWith("/")) {
    return str.substring(1);
  }
  return str;
}

const { isEmpty } = _;
const { CryptoJS } = pkg;

export const sendMessageKeys = {
  add_has: "add_has",
  page_change: "page_change",
  global_project: "global_project",
  card_view_change: "card_view_change",
  module_name_change: "module_name_change",
  modal_change: "modal_change",
};

export const isJson = (str: string) => {
  try {
    if (typeof str === "string") {
      const parsed = JSON.parse(str);
      return typeof parsed === "object" && parsed !== null;
    } else {
      return false;
    }
  } catch (e) {
    return false;
  }
  return true;
};

export function getQueryString(url: string, key?: string) {
  let params: { [key: string]: string } = {};
  if (!isEmpty(url)) {
    const qString = url?.split("?")?.[1];
    if (!isEmpty(qString)) {
      params = qString
        ?.split("&")
        ?.reduce((hash: { [key: string]: string }, param: string) => {
          const a: string[] = param?.split("=");
          if (a?.length == 2) {
            return Object.assign(hash, {
              [a?.[0]]: a?.[1],
            });
          }
          return hash;
        }, {});
    }
  }
  if (key && !isEmpty(key)) {
    return params?.[key];
  }
  return params;
}

export const decryptData = (encrypted: string, key: string) => {
  const iv = CryptoJS.enc.Base64.parse("");
  const decryptkey = CryptoJS.SHA256(key);
  let decrypted = CryptoJS.AES.decrypt(encrypted, decryptkey, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });
  return decrypted.toString(CryptoJS.enc.Utf8);
};

export const parseParamsFromURL = (url: string): any => {
  // Logic to parse and extract parameters from the URL
  // Example logic for parsing URL parameters and returning an object
  const urlSegments = url.split("/");
  const params: any = {
    page: urlSegments?.[1] || "",
    id: urlSegments?.[2] || "",
    tab: urlSegments?.[3] || "",
    // Add more parameters as needed based on your URL structure
  };
  return params;
};

export const getIframeUrl = ({
  authorization,
  otherParams,
  path,
  defaultPage,
  isSetting,
}: any) => {
  const tempParams: Partial<any> = parseParamsFromURL(
    window?.location?.pathname
  );
  let pathname: string = path ?? window.location?.pathname;
  const tempSearchParams = getQueryString(window?.location?.href);
  let page = "";

  if (!isEmpty(tempParams?.id)) {
    pathname = pathname?.replace(`/${tempParams?.id}`, "");
    if (tempParams?.page === "manage-settings") {
      page = "#" + tempParams?.id;
      delete tempParams?.id;
    }
  } else {
    delete tempParams?.id;
  }
  if (!isEmpty(tempParams?.tab)) {
    pathname = pathname?.replace(`/${tempParams?.tab}`, "");
  }
  if (!isEmpty(defaultPage) && isSetting) {
    page = "#" + defaultPage;
  } else if (
    tempParams?.page !== "manage-settings" &&
    !isEmpty(tempParams?.tab)
  ) {
    page = "#" + tempParams?.tab;
  }
  delete tempParams?.tab;
  if (pathname?.includes("-")) {
    pathname = pathname?.replaceAll("-", "_");
  }
  if (pathname === "/") {
    pathname = "/index";
  }
  if (pathname.charAt(pathname?.length - 1) === "/") {
    pathname = pathname?.slice(0, -1); // Remove the last character
  }
  let extraParams = {};
  if (
    tempParams?.page === "manage-estimates" &&
    typeof tempSearchParams !== "string" &&
    tempSearchParams?.action !== "new" &&
    !(tempParams?.id && !isEmpty(tempParams?.id))
  ) {
    extraParams = {
      ...extraParams,
      is_card_view: 1,
    };
  }
  delete tempParams?.page;
  let searchParams = {
    authorize_token: authorization,
    iframecall: 1,
    from_remix: 1,
    web_page: `${pathname}.php`,
    ...(tempParams ?? {}),
    ...extraParams,
  } as unknown as URLSearchParams;
  if (typeof tempSearchParams !== "string") {
    searchParams = {
      ...searchParams,
      ...tempSearchParams,
    };
  }
  const param = new URLSearchParams(searchParams).toString();
  if (PANEL_URL) {
    let newUrl: any = new URL(
      `${PANEL_URL}${removeLeadingSlash(pathname)}.php`
    );
    newUrl.search = new URLSearchParams(param);
    return `${newUrl.toString()}${
      otherParams ? "&" + otherParams : ""
    }${page?.replaceAll("-", "_")}`;
  }
  return "";
};

export const messageListenerChangeData = ({
  messageData,
  navigate,
  setNotify,
  gUser,
  onKanbanClose,
}: any) => {
  console.log("cfiframe messageData", messageData);
  let responseData: any = {};
  if (!isEmpty(messageData?.key) && messageData?.token) {
    const decrypt = decryptData(messageData?.token, IFRAME_TOKEN);
    responseData = isJson(decrypt) ? JSON.parse(decrypt) : {};
    console.log("cfiframe responseData", responseData);
    if (!isEmpty(responseData)) {
      switch (messageData?.key) {
        case sendMessageKeys?.page_change:
          if ("is_loaded" in responseData) {
            !Boolean(responseData?.is_loaded);
            return;
          }

          let pageUrl = window.location.pathname; // current url
          if (
            responseData?.page // check new url occur
          ) {
            pageUrl =
              "/" +
              responseData?.page?.replace(".php", "")?.replaceAll("_", "-"); // add new url
          }
          let iframePageParams = parseParamsFromURL(pageUrl); // get url params
          let iframeQueryParams: { [key: string]: string } = {};

          // add url params in url function
          const addIframePathParam = (key: keyof any) => {
            if (key in iframePageParams) {
              // check key exist in params
              if (iframePageParams?.[key]) {
                // check params key is undefined
                pageUrl = pageUrl?.replace(
                  iframePageParams?.[key] as string,
                  responseData?.[key] as string
                ); // replace params key with new key
              } else {
                pageUrl += "/" + responseData?.[key]; // add url params in url
              }
              iframePageParams = {
                ...(iframePageParams ?? {}),
                [key]: responseData?.[key],
              }; // change or add key data in params
            }
          };
          if (responseData?.id && !pageUrl?.includes(responseData?.id)) {
            // check new id occur
            addIframePathParam("id"); // add id in params
          }

          if (pageUrl?.includes("manage-settings")) {
            responseData.tab = responseData?.tab?.replaceAll("_", "-");
            // check current url is manage-settings
            if (responseData?.tab && !pageUrl?.includes(responseData?.tab)) {
              addIframePathParam("tab"); // add tab in params
            }
          }
          console.log("123", iframePageParams);
          if (
            responseData?.tab &&
            !pageUrl?.includes(responseData?.tab) &&
            iframePageParams?.id &&
            window.location.pathname?.includes(iframePageParams?.page) &&
            window.location.pathname !== "/" + iframePageParams?.page
          ) {
            // check new tab occur and id was exists in params
            addIframePathParam("tab"); // add tab in params
          }

          // add url query params in url function
          const addIframeQueryParam = (key: string) => {
            const data = responseData as {
              [key: string]: string | undefined;
            };
            iframeQueryParams = {
              ...iframeQueryParams,
              [key]: data?.[key] as string,
            }; // change or add key data in query params
          };
          if (responseData?.action) {
            // check action occur
            if (responseData?.action === "new") {
              // check action is new
              let project = {};

              // add project function
              const addProject = () => {
                if (responseData?.project) {
                  // check new project occur
                  project = {
                    id: Number(responseData?.project),
                  }; // add id in project
                }
                if (responseData?.project_name) {
                  // check new project name occur
                  project = {
                    ...project,
                    project_name: responseData?.project_name,
                  }; // add project name in project
                }
              };
              switch (
                iframePageParams?.page // check current url
              ) {
                case "manage-project-permits":
                  addProject(); // add or change project
                  // setGOpenPermitSidebar(true, project); // open add manage-project-permits sidebar
                  return;
                case "manage-bills":
                  addProject(); // add or change project
                  // setGOpenBillSidebar(true, project); // open add manage-bills sidebar
                  return;
                default:
                  addIframeQueryParam("action");
                  if (responseData?.project) {
                    addIframeQueryParam("project");
                  }
                  break;
              }
            } else {
              addIframeQueryParam("action"); // add or change query params
              if (responseData?.project) {
                // check new project occur
                addIframeQueryParam("project"); // add or change query params
              }
            }
          }
          if (responseData?.type) {
            // check new type occur
            addIframeQueryParam("type"); // add or change query params
          }
          if (responseData?.from) {
            // check new from occur
            addIframeQueryParam("from"); // add or change query params
          }
          for (const key in iframeQueryParams) {
            // loop for add query params in url
            console.log("iframeQueryParams", key);
            if (Object.prototype.hasOwnProperty.call(iframeQueryParams, key)) {
              // check key exists in query params
              if (!pageUrl?.includes("?")) {
                // check '?' exists in url
                pageUrl += "?"; // add '?' in url
              } else {
                pageUrl += "&"; // add '&' in url
              }
              pageUrl += `${key}=${iframeQueryParams[key] ?? ""}`; // add key and value in url query
            }
          }
          if (
            !pageUrl?.includes("action=") &&
            window.location.href?.includes("action=")
          ) {
            onKanbanClose?.(false);
          }
          if (responseData?.is_back) {
            // check is_back occur
            if (
              !iframePageParams?.id &&
              iframePageParams?.page !== "manage-settings"
            ) {
              // check id have no value
              navigate(-1); // back page
            } else {
              navigate("/" + iframePageParams?.page); // back to list page
            }
          } else if (responseData?.new_tab) {
            // check new_tab occur
            window.open(pageUrl); // open page in new tab
          } else {
            navigate(pageUrl); // change page
          }
          break;

        default:
          break;
      }
    }
  }
};

export const isFullPageIframe = ({
  location,
  params,
}: {
  location?: any;
  params?: {
    id?: string;
    tab?: string;
  };
}) => {
  return (
    location?.pathname?.includes("manage-settings") && !isEmpty(params?.tab)
  );
};
