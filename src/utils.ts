export function defaultParam<T>(param: T | undefined, defaultValue: T) {
  return param === undefined ? defaultValue : param;
}
