import { useQuery } from '@tanstack/react-query';
import axiosInstance from '@/lib/axios';
import { ApiError } from '@/types/hawkbit-api/error';
import { isDefined } from '@/utils/is-defined';

interface TargetAttributesResponse {
    [key: string]: string;
}

const fetchTargetAttributes = async (
    targetId: string
): Promise<TargetAttributesResponse> => {
    const response = await axiosInstance.get<TargetAttributesResponse>(
        `/targets/${targetId}/attributes`
    );
    return response.data;
};

export const useGetTargetAttributes = (targetId: string) => {
    const { data, isLoading, error, isError } = useQuery<
        TargetAttributesResponse,
        ApiError
    >({
        queryKey: ['target-attributes', targetId],
        queryFn: () => fetchTargetAttributes(targetId),
        enabled: isDefined(targetId),
    });

    return { data, isLoading, error, isError };
};
