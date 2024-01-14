import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { UserState } from '@/store/slices/userSlice'
import socket from './socketInstance'

const useSocket = () => {
  const userId = useSelector((state: UserState) => state?.userState.user?.id)

  useEffect(() => {
    if (userId) {
      socket.io.opts.query = { userId }
      socket.connect()
    }

    return () => {
      if (socket.connected && !userId) socket.disconnect()
    }
  }, [userId])

  return socket
}

export default useSocket
