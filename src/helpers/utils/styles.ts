export const combineClassNames = (...classNames: ReadonlyArray<string | undefined>) => {
  return classNames.filter((className) => !!className).join(' ')
}