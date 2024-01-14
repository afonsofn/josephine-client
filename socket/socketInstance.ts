import { io, Socket } from 'socket.io-client'
import { API_PORT } from '@/utils/constants'

const socketInstance: Socket = io(API_PORT, { autoConnect: false })

export default socketInstance
