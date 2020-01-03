import {ApiOptions, User} from "./types";

const users: User[] = [...Array(40).keys()].map((n: number) => ({
  id: n + 1,
  name: `User ${n + 1}`
}));

export const fakeApi = ({take, skip}: ApiOptions): Promise<User[]> =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve(users.slice(skip, skip + take));
    }, 1);
  });

