export function isString(value) {
  return (
    typeof value === 'string'
      || (
        typeof value === 'object'
        && Object.prototype.toString.call(value) === '[object String]'
      )
  );
}

export function isObject(value) {
  const type = typeof value;
  return value != null && (type == 'object' || type == 'function');
}

export function isFunction(value) {
  if (!isObject(value)) {
    return false;
  }
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 9 which returns 'object' for typed arrays and other constructors.
  const tag = Object.prototype.toString.call(value);
  const asyncTag = '[object AsyncFunction]';
  const funcTag = '[object Function]';
  const genTag = '[object GeneratorFunction]';
  const proxyTag = '[object Proxy]';
  return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
}

export function each(collection, handler) {
  return collection && (Array.isArray(collection)
    ? collection.forEach(handler)
    : Object.keys(collection).forEach(key => handler(collection[key], key)));
}
