import {db, login} from '@/api/api';
import {validatePassword, validateUsername} from '@/utils/auth';

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

describe('Validation tests', () => {
  test('Can use username more than 5 and less than 20 symbols', () => {
    const username = 'Username';
    const usernameError = validateUsername(username);
    expect(usernameError).toBe(undefined);
  });

  test("Can't use username less than 5 symbols", () => {
    const username = 'User';
    const usernameError = validateUsername(username);
    expect(usernameError).toBe('Username should be at least 5 symbols');
  });

  test("Can't use username more than 20 symbols", () => {
    const username = 'Useruseruseruseruseruser';
    const usernameError = validateUsername(username);
    expect(usernameError).toBe('Username maximum length is 20');
  });

  test('Can use password with minimum 8 and maximum 20 character limit and must have at least 1 uppercase, 1 lowercase and 1 special character', () => {
    const password = 'valIdate5*';
    const usernameError = validatePassword(password);
    expect(usernameError).toBe(undefined);
  });

  test("Can't use password not matching this pattern", () => {
    const password = 'test';
    const usernameError = validatePassword(password);
    expect(usernameError).toBe(
      'Password value has minimum 8 and maximum 20 character limit and must have at least 1 uppercase, 1 lowercase and 1 special character',
    );
  });
});
