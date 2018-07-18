export function assert(value) {
  if (!value) {
    throw Error('Assertion failed')
  }
  return value
}

export function* enumerate(it) {
  let i = 0
  for (const x of it) {
    yield [i++, x]
  }
}

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

export function* range(...args) {
  assert(args.length)
  const [start, end, step = 1] = args.length > 1 ? args : [0, args[0]]
  for (let i = start; i < end; i += step) {
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
