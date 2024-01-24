import { injectable } from 'tsyringe'
import { UserService } from '../abstractions/user.service'
import { ChatBoxInfo } from '@/types/globalTypes'
import { GatewayClient } from '../abstractions/gateway.client'

@injectable()
export class UserRepository implements UserService {
  private client: GatewayClient

  constructor() {
    this.client = GatewayClient.getInstance()
  }

  async getUserContacts(): Promise<ChatBoxInfo[]> {
    return await this.client.get<ChatBoxInfo[]>('users/me/contacts')
  }
}
