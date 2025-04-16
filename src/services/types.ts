export interface Link {
    href: string;
    hreflang?: string;
    title?: string;
    type?: string;
    deprecation?: string;
    profile?: string;
    name?: string;
    templated?: boolean;
}

export interface ApiResponse<T> {
    content: T;
    total: number;
    size: number;
    _links: {
        [key: string]: Link;
    };
}
