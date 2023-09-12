import Validator from '../validator';

test('error testing when entering a single number', () => {
  const result = Validator.parseCheck(58.3);
  expect(result).toEqual({
    result: false,
    err: 'Введите 2 числа с целой и дробной частью',
  });
});

test('error testing when entering a two integers', () => {
  const result = Validator.parseCheck(58, 67);
  expect(result).toEqual({
    result: false,
    err: 'Введите 2 числа с целой и дробной частью',
  });
});

test('error testing when entering one fractional number and one integer', () => {
  const result = Validator.parseCheck(58.7, 67);
  expect(result).toEqual({
    result: false,
    err: 'Введите 2 числа с целой и дробной частью',
  });
});

test('testing when entering two fractional numbers ', () => {
  const result = Validator.parseCheck(58.7, 67.2);
  expect(result).toBeTruthy();
});
