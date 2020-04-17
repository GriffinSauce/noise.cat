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
  _id: string;
  slug: string;
  name: string;
  image: string;
  members: Array<string>;
  links: Array<Link>;
};

declare type Invite = {
  _id: string;
  token: string;
  slug: string;
};

declare type Link = {
  _id?: string;
  created?: string;
  creatorId?: string;
  title: string;
  url: string;
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
