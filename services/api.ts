import axios, { AxiosError, AxiosRequestConfig } from 'axios'
import { QueryClient, UseMutationOptions, UseQueryOptions, useMutation, useQuery } from 'react-query'

import { API_URL } from '../config'

interface Config extends AxiosRequestConfig {
  queryKeySuffix?: string
}

export const axiosClient = axios.create({ baseURL: API_URL })
export const queryClient = new QueryClient()

const getQueryKey = (config: Config) => {
  const queryKey = [config.url]
  if (config.params) queryKey.push(config.params)
  return queryKey
}

export const useAPIQuery = <TData = void>(config: Config, options?: UseQueryOptions<TData, AxiosError>) => {
  const queryKey = getQueryKey(config)
  const queryFn = () => axiosClient.request<TData>(config).then(res => res.data)
  return useQuery<TData, AxiosError>(queryKey, queryFn, options)
}

interface UseAPIMutationOptions<TData, TError, TVariables> extends UseMutationOptions<TData, TError, TVariables> {
  invalidateQueries?: string[]
}
export const useAPIMutation = <TData = void, TVariables = void>(
  config: Config | ((variables: TVariables) => Config),
  options?: UseAPIMutationOptions<TData, AxiosError, TVariables>
) => {
  const mutationFn = async (variables: TVariables) => axiosClient.request<TData>({ ...config, data: variables }).then(res => res.data)
  return useMutation<TData, AxiosError, TVariables>(mutationFn, {
    ...options,
    onSuccess: (...args) => {
      if (options?.invalidateQueries) options.invalidateQueries.forEach(queryKey => queryClient.invalidateQueries(queryKey))
      if (options?.onSuccess) options.onSuccess(...args)
    },
  })
}
