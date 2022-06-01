import {API_KEY, BASE_URL} from '@/constants/api';
import {Database} from '@/types/api';

const db: Database = {
  users: [
    {
      username: 'JohnyDepp',
      password: 'asD*dddd',
    },
  ],
};

export const login = async (username: string, password: string) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (
        db.users.find(i => i.username === username && i.password === password)
      )
        resolve({status: '200'});
      else reject({error: {message: 'Login credentials are wrong.'}});
    }, 300);
  });
};

const currencyRequestOptions = {
  method: 'GET',
};

export const fetchCurrencyResults = async (from: string, to: string) => {
  const result = await fetch(
    `${BASE_URL}/${API_KEY}/pair/${from}/${to}`,
    currencyRequestOptions,
  );
  return result.json();
};
