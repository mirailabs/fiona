// Functional Programming support

// -- core -----------------------------------------------------------

const partial = (fn, ...args) => fn.bind(null, ...args);

// curry :: ((a, b, ...) -> c) -> a -> b -> ... -> c
// from https://mostly-adequate.gitbooks.io/mostly-adequate-guide/appendix_a.html#curry
const curry = (fn) => {
  return function _curry(...args) {
    if (args.length < fn.length) {
      return partial(_curry, ...args);
    }
    return fn.call(null, ...args);
  };
};

const pipe = (...fns) => curry((x) => fns.reduce((acc, fn) => fn(acc), x));

const comp = (...fns) => pipe(...fns.reverse());

// -- pointfree ------------------------------------------------------

// identity :: a -> a
const identity = (a) => a;

// constant :: c -> b -> c
const constant = curry((c, x) => c);

// map :: Functor f => (a -> b) -> f a -> f b
const map = curry((fn, f) => f.map(fn));

// reduce :: ((a, b) -> a) -> [b] -> a
const reduce = curry((fn, f) => f.reduce(fn));

// eq :: a -> b -> Boolean
const eq = curry((a, b) => a === b);

// not :: Boolean -> Boolean
const not = (x) => !x;

// trace! :: a -> a
const trace = (x) => {
  console.debug(x);
  return x;
};

// omit :: prop -> Object -> Object
const omit = (prop, obj) =>
  Object.keys(obj)
    .filter(comp(not, eq(prop)))
    .reduce((acc, k) => {
      acc[k] = obj[k];
      return acc;
    }, {});

// some :: (a -> Boolean) -> [a] -> Boolean
// Returns true if some x in coll satisfies pred.
const some = (pred, coll) => {
  if (!coll) {
    return false;
  }

  for (let x of coll) {
    if (pred(x)) {
      return true;
    }
  }
  return false;
};

// every :: (a -> Boolean) -> [a] -> Boolean
// Returns true if all x in coll satisfies pred.
const every = (pred, coll) => {
  if (!coll) {
    return true;
  }

  for (let x of coll) {
    if (!pred(x)) {
      return false;
    }
  }
  return true;
};

// Returns the first n elements from coll.
// Returns all the elements of coll if coll.length < n
const take = (n, coll) => coll.slice(0, n);

// Returns coll with the first n items removed.
const drop = (n, coll) => coll.slice(n);

// Partitions a sequence into a sequence of lists
// of size n.
// The final sequence may be <= n if coll.length % n != 0.
const partition = (n, coll) => {
  const p = [];
  while (coll.length) {
    p.push(take(n, coll));
    coll = drop(n, coll);
  }
  return p;
};

// Returns a sequence [0, n).
const range = (n) =>
  Array(n)
    .fill()
    .map((_, i) => i);

// Concatenate two strings.
// cat :: String -> String -> String
const cat = (a, b) => a + b;

// Split a string based on a separator.
// split :: String -> String -> String
const split = (sep, s) => s.split(sep);

// Append an item to a list.
// append :: a -> [a] -> [a]
const append = curry((x, xs) => xs.concat([x]));

// Return the nth item in an array.
// nth :: n -> [a] -> a
const nth = curry((n, xs) => (xs ? xs[n] : null));

// Return the first item in an array.
// first :: [a] -> a
const first = nth(0);

// Return the second item in an array.
// second :: [a] -> a
const second = nth(1);

export {
  curry,
  pipe,
  comp,
  identity,
  constant,
  map,
  reduce,
  not,
  omit,
  every,
  some,
  take,
  drop,
  partition,
  range,
  cat,
  split,
  append,
  nth,
  first,
  second,
};
