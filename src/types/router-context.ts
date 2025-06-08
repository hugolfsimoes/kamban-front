
export type RouterContext = {
  auth: {
    user: {
      id: string;
      name: string;
      email: string;
    } | null;
  };
};
