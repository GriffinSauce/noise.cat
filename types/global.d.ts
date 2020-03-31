declare namespace NodeJS {
  interface Process {
    browser: boolean;
  }
}

declare type User = {
  sub: string;
  name: string;
  picture: string;
};

declare type Band = {
  slug: string;
  name: string;
  image: string;
  members: Array<string>;
};

declare type Show = {
  title: string;
  date: string;
  location: string;
  note: string;
  contact: string;
  pay: string;
  status: string;
};
