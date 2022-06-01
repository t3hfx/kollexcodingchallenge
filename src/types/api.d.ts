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

type ConversionRate = {
  base_code: string;
  conversion_rate: number;
  documentation: string;
  result: string;
  target_code: string;
  terms_of_use: string;
  time_last_update_unix: number;
  time_last_update_utc: string;
  time_next_update_unix: number;
  time_next_update_utc: string;
};

type ConversionApiError = {
  result: string;
  'error-type': string;
};
