import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { environment } from '@/config/env';
import axios, { AxiosError } from 'axios';
import { authOptions } from '@/lib/auth-options';

const handleApiError = (error: unknown) => {
    if (error instanceof AxiosError) {
        if (error.response) {
            return NextResponse.json(error.response.data, {
                status: error.response.status,
            });
        }
        if (error.request) {
            return NextResponse.json(
                {
                    exceptionClass: 'NetworkError',
                    errorCode: 'NETWORK_ERROR',
                    message: 'No response from Hawkbit API',
                    info: {},
                },
                { status: 503 }
            );
        }
    }

    return NextResponse.json(
        {
            exceptionClass: 'InternalError',
            errorCode: 'INTERNAL_ERROR',
            message: 'Failed to fetch from Hawkbit API',
            info: {},
        },
        { status: 500 }
    );
};

export async function GET(request: NextRequest, context: { params: Promise<{ path: string[] }> }) {
    const { params } = context;
    const session = await getServerSession(authOptions);

    if (!session?.user?.auth) {
        return NextResponse.json(
            {
                exceptionClass: 'UnauthorizedError',
                errorCode: 'UNAUTHORIZED',
                message: 'Unauthorized',
                info: {},
            },
            { status: 401 }
        );
    }

    try {
        const path = (await params).path.join('/');
        const response = await axios.get(`${environment.hawkbitApiUrl}/rest/v1/${path}`, {
            headers: {
                Authorization: `Basic ${session.user.auth}`,
                Accept: 'application/json, application/hal+json',
            },
        });

        return NextResponse.json(response.data);
    } catch (error) {
        return handleApiError(error);
    }
}

export async function POST(request: NextRequest, context: { params: Promise<{ path: string[] }> }) {
    const { params } = context;
    const session = await getServerSession(authOptions);

    if (!session?.user?.auth) {
        return NextResponse.json(
            {
                exceptionClass: 'UnauthorizedError',
                errorCode: 'UNAUTHORIZED',
                message: 'Unauthorized',
                info: {},
            },
            { status: 401 }
        );
    }

    try {
        const path = (await params).path.join('/');
        const body = await request.json();

        const response = await axios.post(`${environment.hawkbitApiUrl}/rest/v1/${path}`, body, {
            headers: {
                Authorization: `Basic ${session.user.auth}`,
                Accept: 'application/json, application/hal+json',
                'Content-Type': 'application/json',
            },
        });

        return NextResponse.json(response.data);
    } catch (error) {
        return handleApiError(error);
    }
}

export async function DELETE(request: NextRequest, context: { params: Promise<{ path: string[] }> }) {
    const { params } = context;
    const session = await getServerSession(authOptions);

    if (!session?.user?.auth) {
        return NextResponse.json(
            {
                exceptionClass: 'UnauthorizedError',
                errorCode: 'UNAUTHORIZED',
                message: 'Unauthorized',
                info: {},
            },
            { status: 401 }
        );
    }

    try {
        const path = (await params).path.join('/');
        const response = await axios.delete(`${environment.hawkbitApiUrl}/rest/v1/${path}`, {
            headers: {
                Authorization: `Basic ${session.user.auth}`,
                Accept: 'application/json, application/hal+json',
            },
        });

        return NextResponse.json(response.data);
    } catch (error) {
        return handleApiError(error);
    }
}
