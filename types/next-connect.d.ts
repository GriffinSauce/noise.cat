declare module 'next-connect';

declare type NextConnectRequest = {
  query: {
    [key: string]: any; // eslint-disable-line
  };
  body: {
    [key: string]: any; // eslint-disable-line
  };
};

declare type NextConnectResponse = {
  status: (
    any,
  ) => {
    json: (any) => void;
    send: (string) => void;
  };
  json: (any) => void;
  send: (string) => void;
};
declare type NextConnectNext = () => void;

declare type NextConnectHandler = (
  NextConnectRequest,
  NextConnectResponse,
) => void;
