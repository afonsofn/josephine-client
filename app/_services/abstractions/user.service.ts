import { ChatBoxInfo } from '@/types/index'
import { dependencyContainer } from '../dependecy-injection'
import { DEPENDENCIES } from '../dependecy-injection/symbols'

export abstract class UserService {
  abstract getUserContacts(): Promise<ChatBoxInfo[]>

  static getInstance(): UserService {
    return dependencyContainer.resolve<UserService>(DEPENDENCIES.UserService)
  }
}
