declare namespace NodeJS {
  interface Process {
    browser: boolean;
  }
}

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
