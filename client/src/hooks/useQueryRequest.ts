import {
  type QueryFunction,
  type QueryKey,
  type UseQueryOptions,
  type UseQueryResult,
  useQuery,
} from '@tanstack/react-query';

export type QueryOptions<TResult> = Omit<
  UseQueryOptions<TResult, unknown, TResult, QueryKey>,
  'queryKey' | 'queryFn'
>;

interface GetRequestProps<TResult> {
  func: QueryFunction<TResult>;
  key: QueryKey;
  options?: QueryOptions<TResult>;
}

export const useQueryRequest = <TResult>(
  request: GetRequestProps<TResult>,
): UseQueryResult<TResult> => {
  return useQuery({ queryKey: request.key, queryFn: request.func, ...request.options });
};
