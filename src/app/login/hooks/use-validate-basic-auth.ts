import axios, { AxiosError } from 'axios';

interface UserInfoResponse {
    tenant: string;
    username: string;
}

interface UserCredentials {
    username: string;
    password: string;
}

const fetchUserInfo = async ({ username, password }: UserCredentials): Promise<UserInfoResponse> => {
    try {
        const response = await axios.get<UserInfoResponse>('/api/auth', {
            headers: {
                Authorization: `Basic ${Buffer.from(`${username}:${password}`).toString('base64')}`,
                Accept: 'application/json, application/hal+json',
            },
        });
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const axiosError = error as AxiosError<{ error: string }>;
            if (axiosError.response?.status === 401) {
                throw new Error(axiosError.response.data.error || 'Invalid credentials');
            }
            if (axiosError.response?.status === 403) {
                throw new Error(axiosError.response.data.error || 'Forbidden');
            }
        }
        throw error;
    }
};

export const useValidateBasicAuth = () => {
    const validateCredentials = async ({ username, password }: UserCredentials) => {
        try {
            const response = await fetchUserInfo({ username, password });
            return response;
        } catch (error) {
            console.error('Error validating basic auth:', error);
            throw error;
        }
    };

    return { validate: validateCredentials };
};
