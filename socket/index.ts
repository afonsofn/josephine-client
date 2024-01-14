import { Socket, io } from 'socket.io-client'
import { API_PORT } from '@/utils/constants'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { UserState } from '@/store/slices/userSlice'

const useSocket = () => {
  const [socket, setSocket] = useState<Socket>()
  const userId = useSelector((state: UserState) => state?.userState.user?.id)

  useEffect(() => {
    const initializeSocket = async () => {
      const socketInstance = io(API_PORT, { query: { userId } })

      setSocket(socketInstance)
    }

    if (!socket) initializeSocket()

    return () => {
      if (socket) socket.disconnect()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return socket
}

export default useSocket
