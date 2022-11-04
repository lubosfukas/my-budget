export const groupBy = <T>(array: Array<T>, property: (x: T) => string): { [key: string]: Array<T> } =>
  array.reduce((memo: { [key: string]: Array<T> }, x: T) => {
    if (!memo[property(x)]) {
      // eslint-disable-next-line no-param-reassign
      memo[property(x)] = [];
    }

    memo[property(x)].push(x);
    return memo;
  }, {});

export const toCamelCase = (str: string) =>
  str.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (_, chr) => chr.toUpperCase());
