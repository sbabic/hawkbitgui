import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import axiosInstance from '@/lib/axios';
import { ApiError } from '@/types/hawkbit-api/error';

interface PollStatus {
  lastRequestAt: number;
  nextExpectedRequestAt: number;
  overdue: boolean;
}

interface Link {
  href: string;
  hreflang?: string;
  title?: string;
  type?: string;
  deprecation?: string;
  profile?: string;
  name?: string;
  templated?: boolean;
}

interface Target {
  createdBy: string;
  createdAt: number;
  lastModifiedBy: string;
  lastModifiedAt: number;
  name: string;
  description: string;
  controllerId: string;
  updateStatus: string;
  lastControllerRequestAt: number;
  installedAt: number;
  ipAddress: string;
  address: string;
  pollStatus: PollStatus;
  securityToken: string;
  requestAttributes: boolean;
  targetType: number;
  targetTypeName: string;
  autoConfirmActive: boolean;
  _links: {
    self: Link;
    assignedDS: Link;
    installedDS: Link;
    attributes: Link;
    actions: Link;
    metadata: Link;
    targetType: Link;
    autoConfirm: Link;
  };
}

interface TargetsResponse {
  content: Target[];
  total: number;
  size: number;
  _links: Record<string, Link>;
}

interface TargetsQueryParams {
  q?: string;
}

type UseGetTargetsParams = {
  queryParams?: TargetsQueryParams;
  queryOptions?: Omit<UseQueryOptions<TargetsResponse, ApiError, TargetsResponse>, 'queryKey' | 'queryFn'>;
};

const fetchTargets = async (queryParams: TargetsQueryParams): Promise<TargetsResponse> => {
  const response = await axiosInstance.get<TargetsResponse>('/targets', { params: queryParams });
  return response.data;
};

export const useGetTargets = (params?: UseGetTargetsParams) => {
  const { queryParams = {}, queryOptions } = params ?? {};
  const { data, isLoading, error, refetch } = useQuery<TargetsResponse, ApiError>({
    queryKey: ['targets', queryParams],
    queryFn: () => fetchTargets(queryParams),
    ...queryOptions,
  });

  return { data, isLoading, error, refetch };
};
