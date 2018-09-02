export function assert(value) {
  if (!value) {
    throw Error('Assertion failed')
  }
  return value
}

const binarySearchWith = compare => (xs, x, key = x => x) => {
  let start = 0
  let end = xs.length
  while (start < end) {
    const i = Math.floor((start + end) / 2)
    if (compare(key(xs[i]), x)) {
      start = i + 1
    } else {
      end = i
    }
  }
  return start
}
export const lowerBound = binarySearchWith((a, b) => a < b)
export const upperBound = binarySearchWith((a, b) => a <= b)

export function* enumerate(it) {
  let i = 0
  for (const x of it) {
    yield [i++, x]
  }
}

export function getLast(xs, default_) {
  return xs.length ? xs[xs.length - 1] : default_
}

export const makeExponential = (x0, x1, y0, y1) => x =>
  y0 * (y1 / y0) ** ((x - x0) / (x1 - x0))

export function makeObject(entries) {
  const object = {}
  for (const [name, value] of entries) {
    object[name] = value
  }
  return object
}

export function makePromise() {
  let resolve, reject
  const promise = new Promise((resolver, rejector) => {
    resolve = resolver
    reject = rejector
  })
  return {promise, resolve, reject}
}

export function* map(it, f) {
  for (const [i, x] of enumerate(it)) {
    yield f(x, i)
  }
}

export function maxBy(xs, key) {
  assert(xs.length)
  let max = xs[0]
  for (const x of xs) {
    if (key(x) > key(max)) {
      max = x
    }
  }
  return max
}

export function mod(dividend, divisor) {
  let remainder = dividend % divisor
  if (remainder && Math.sign(dividend) != Math.sign(divisor)) {
    remainder += divisor
  }
  return remainder
}

export function* range(...args) {
  assert(args.length)
  const [start, end, step = 1] = args.length > 1 ? args : [0, args[0]]
  const sign = assert(Math.sign(end - start))
  for (let i = start; (end - i) * sign > 0; i += step) {
    yield i
  }
}

export async function sha256(s) {
  const data = new TextEncoder().encode(s)
  const digest = await crypto.subtle.digest('SHA-256', data)
  return [...new Uint8Array(digest)].map(i => i.toString(16)).join('')
}

export function switchOnKey(object, handlers, defaultHandler) {
  let foundKey
  let handler = defaultHandler
  for (const [key, h] of Object.entries(handlers)) {
    if (Object.hasOwnProperty.call(object, key)) {
      assert(!foundKey)
      foundKey = key
      handler = h
    }
  }
  return assert(handler)(object)
}

export function* zip(...iterables) {
  const iterators = iterables.map(it => it[Symbol.iterator]())
  for (;;) {
    const items = iterators.map(it => it.next())
    if (items.every(({done}) => done)) {
      return
    }
    yield items.map(({value}) => value)
  }
}
