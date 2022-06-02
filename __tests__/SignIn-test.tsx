import {db, login} from '@/api/api';

describe('Login tests', () => {
  test('Can login with name from db', async () => {
    let result;
    try {
      result = await login(db.users[0].username, db.users[0].password);
    } catch (e) {
      result = e;
    }
    expect(result).toStrictEqual({
      status: '200',
    });
  });

  test("Can't login with random name", async () => {
    let result;
    try {
      result = await login('imanbeck', '123');
    } catch (e) {
      result = e;
    }
    expect(result).toStrictEqual({
      error: {message: 'Login credentials are wrong.'},
    });
  });
});
