import axios, { Axios, AxiosError } from 'axios'
import { singleton } from 'tsyringe'
import { router } from 'expo-router'

import { API_PORT } from '@/utils/constants'

import { HttpError, HttpStatusCode } from '../../_domain/exceptions/HttpError'
import { GatewayClient } from '../abstractions/gateway.client'
import useAuthToken from '@/utils/useAuthToken'

@singleton()
export class GatewayRepository implements GatewayClient {
  private client: Axios

  constructor() {
    this.client = axios.create({ baseURL: API_PORT })

    this.client.interceptors.request.use(async (config) => {
      const { getToken } = useAuthToken()

      const token = await getToken()

      if (!token) {
        router.push('/')

        return config
      }

      config.headers.Authorization = `Bearer ${token}`

      return config
    })

    this.client.interceptors.response.use(
      (response) => response,
      (error: AxiosError) => {
        if (error.request.status === 401) {
          const { clearToken } = useAuthToken()

          clearToken()

          router.push('/')
        }

        return error
      },
    )
  }

  async get<R>(
    path: string,
    params?: { query?: Record<string, string> | undefined } | undefined,
  ): Promise<R> {
    try {
      const response = await this.client.get<R>(path, { params })
      return response.data
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new HttpError({
          errorCodes: error.response?.data.errors ?? [],
          message: error.message,
          statusCode: (error.response?.status ?? 500) as HttpStatusCode,
        })
      }

      throw error
    }
  }

  async post<R, P>(path: string, payload: P): Promise<R> {
    try {
      const response = await this.client.post<R>(path, payload)
      return response.data
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new HttpError({
          errorCodes: error.response?.data.errors ?? [],
          message: error.message,
          statusCode: (error.response?.status ?? 500) as HttpStatusCode,
        })
      }

      throw error
    }
  }

  async put<R, P>(path: string, payload: P): Promise<R> {
    try {
      const response = await this.client.put<R>(path, payload)
      return response.data
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new HttpError({
          errorCodes: error.response?.data.errors ?? [],
          message: error.message,
          statusCode: (error.response?.status ?? 500) as HttpStatusCode,
        })
      }

      throw error
    }
  }

  async delete<R>(path: string): Promise<R> {
    try {
      const response = await this.client.delete<R>(path)
      return response.data
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new HttpError({
          errorCodes: error.response?.data.errors ?? [],
          message: error.message,
          statusCode: (error.response?.status ?? 500) as HttpStatusCode,
        })
      }

      throw error
    }
  }

  async patch<R, P>(path: string, payload: P): Promise<R> {
    try {
      const response = await this.client.patch<R>(path, payload)
      return response.data
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new HttpError({
          errorCodes: error.response?.data.errors ?? [],
          message: error.message,
          statusCode: (error.response?.status ?? 500) as HttpStatusCode,
        })
      }

      throw error
    }
  }
}
