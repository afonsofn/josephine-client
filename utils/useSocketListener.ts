import { useEffect } from 'react'
import useSocket from '@/socket/index'
import { Socket } from 'socket.io-client'

const useSocketListener = (
  event: string,
  handler: (arg?: any) => void,
  localSocket?: Socket | null,
  options: { shouldTurnOff?: boolean; useLocalSocket?: boolean } = {
    shouldTurnOff: true,
    useLocalSocket: false,
  },
) => {
  const globalSocket = useSocket()

  useEffect(() => {
    if (options.useLocalSocket && localSocket) {
      localSocket.on(event, handler)

      return () => {
        localSocket.disconnect()
        handler()
      }
    }

    globalSocket?.on(event, handler)

    return () => {
      if (options?.shouldTurnOff) globalSocket?.off(event, handler)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [globalSocket])
}

export default useSocketListener
