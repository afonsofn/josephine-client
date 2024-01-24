import 'reflect-metadata'

import { container } from 'tsyringe'
import { DEPENDENCIES } from './symbols'
import { UserService } from '../abstractions/user.service'
import { UserRepository } from '../repositories/user.repository'
import { GatewayClient } from '../abstractions/gateway.client'
import { GatewayRepository } from '../repositories/gateway.repository'

export const dependencyContainer = container.createChildContainer()

export function registerWebServices() {
  dependencyContainer.register<GatewayClient>(DEPENDENCIES.GatewayClient, {
    useToken: GatewayRepository,
  })

  dependencyContainer.register<UserService>(DEPENDENCIES.UserService, {
    useToken: UserRepository,
  })
}
