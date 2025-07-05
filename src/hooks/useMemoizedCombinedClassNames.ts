import { useMemo } from 'react'
import { combineClassNames } from 'helpers/utils/styles'

export const useMemoizedCombinedClassNames = (
  list: ReadonlyArray<string | undefined>,
  deps: ReadonlyArray<unknown>
) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useMemo(() => combineClassNames(...list), [...deps])
}
