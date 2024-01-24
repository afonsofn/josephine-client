import { dependencyContainer } from '../dependecy-injection'
import { DEPENDENCIES } from '../dependecy-injection/symbols'

export abstract class GatewayClient {
  abstract get<R>(path: string, params?: Record<string, string>): Promise<R>
  abstract post<R, P>(path: string, payload: P): Promise<R>
  abstract put<R, P>(path: string, payload: P): Promise<R>
  abstract delete<R>(path: string): Promise<R>
  abstract patch<R, P>(path: string, payload: P): Promise<R>

  static getInstance(): GatewayClient {
    return dependencyContainer.resolve<GatewayClient>(
      DEPENDENCIES.GatewayClient,
    )
  }
}
