export type Database = {
  users: User[];
};

type User = {
  username: string;
  password: string;
};

type ApiError = {
  error: {
    message: string;
  };
};
