/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect } from 'react'
import useSocket from '@/socket/index'

const useSocketListener = (
  event: string,
  handler: (arg?: any) => any,
  dependencies: React.DependencyList = [],
  shouldTurnOff = true,
) => {
  const globalSocket = useSocket()

  useEffect(() => {
    globalSocket?.on(event, handler)

    return () => {
      if (shouldTurnOff) globalSocket?.off(event, handler)
    }
  }, [globalSocket, ...dependencies])
}

export default useSocketListener
