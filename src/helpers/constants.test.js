import { SET_GUEST, SET_USER, SET_AD, SET_MN, LIST_FILTER } from './constants';

test('check variable', () => {
  expect(SET_GUEST).toBe(0);
  expect(SET_USER).toBe(1);
  expect(SET_AD).toBe(2);
  expect(SET_MN).toBe(3);
  expect(LIST_FILTER).toHaveLength(3);
});
