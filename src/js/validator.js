export default class Validator {
  constructor() {
    this.latitude = null;
    this.longitude = null;
  }

  static parseInput(str) {
    return str.match(/(-?\d+)/gm);
  }

  static collectDecimal(wholeStr, fractionalStr) {
    const wholeDigit = Number(wholeStr);
    const fractionalDigit = Number(fractionalStr) / 10 ** fractionalStr.length;
    if (wholeDigit < 0 || (wholeDigit === 0 && wholeStr.charAt(0) === '-')) {
      return wholeDigit - fractionalDigit;
    }
    return wholeDigit + fractionalDigit;
  }

  static parseCheck(parse) {
    if (!parse || parse.length !== 4) {
      return {
        result: false,
        err: 'Введите 2 числа с целой и дробной частью',
      };
    }

    if (Number(parse[1]) < 0 || Number(parse[3] < 0)) {
      return {
        result: false,
        err: 'Дробная часть не может быть отрицательной',
      };
    }

    this.latitude = Validator.collectDecimal(parse[0], parse[1]);
    this.longitude = Validator.collectDecimal(parse[2], parse[3]);

    if (this.latitude > 90) {
      return {
        result: false,
        err: 'Широта не может быть больше 90',
      };
    }

    if (this.latitude < -90) {
      return {
        result: false,
        err: 'Широта не может быть меньше -90',
      };
    }

    if (this.longitude > 180) {
      return {
        result: false,
        err: 'Долгота не может быть больше 180',
      };
    }

    if (this.longitude < -180) {
      return {
        result: false,
        err: 'Долгота не может быть меньше -180',
      };
    }

    return {
      result: true,
      latitude: this.latitude,
      longitude: this.longitude,
    };
  }
}
