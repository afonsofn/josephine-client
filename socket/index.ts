import { io } from 'socket.io-client'
import { API_PORT } from '@/utils/constants'
// import { useEffect, useState } from 'react'
// import { useSelector } from 'react-redux'
// import { UserState } from '@/store/slices/userSlice'

const socket = io(API_PORT)

export default socket

// const useSocket = () => {
//   const [socket, setSocket] = useState<Socket>()
//   const userId = useSelector((state: UserState) => state?.userState.user?.id)

//   useEffect(() => {
//     const initializeSocket = async () => {
//       const newSocket = io(API_PORT, { query: { userId } })

//       setSocket(newSocket)
//     }

//     initializeSocket()

//     return () => {
//       if (socket) socket.disconnect()
//     }
//   }, [])

//   return socket
// }

// export default useSocket
