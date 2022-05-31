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
