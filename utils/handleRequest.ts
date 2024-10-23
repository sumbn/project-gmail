export function handleRequest<T>(
  promise: Promise<T>,
): [T | undefined, Error | undefined] {
  let result: [T | undefined, Error | undefined] = [undefined, undefined];
  promise
    .then((data) => {
      result = [data, undefined];
    })
    .catch((error) => {
      result = [undefined, error];
    });

  return result;
}
