export const linkHeaderToObject = <TKey extends string, TValue>(
  linkHeader: ReturnType<Headers["get"]>,
  callback?: (url: string) => TValue,
) => {
  if (linkHeader === null) return null

  const result = {} as Record<TKey, TValue>

  linkHeader.split(", ").forEach(link => {
    const matches = link.match(/<(.*?)>; rel="(.*?)"/)
    if (matches === null) return

    const url = matches[1]
    result[matches[2] as TKey] = callback ? callback(url) : url as TValue
  })

  return result
}
