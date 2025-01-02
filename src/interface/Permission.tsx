export interface Role {
    title: string;
    role: string;
    _id: string;
}

export interface PermissionGroup {
    icon: string;
    iconColor?: string;
    title: string;
    desc: string;
    roles: Role[];
    id: string;
}

export interface SimplifiedApiResponse {
    success: boolean;
    data: {
        results: PermissionGroup[];
        page: number;
        limit: number;
        totalPages: number;
        totalResults: number;
    };
}

const simplifiedSampleData: SimplifiedApiResponse = {
    success: true,
    data: {
        results: [
            // ... (your data goes here)
        ],
        page: 1,
        limit: 10,
        totalPages: 1,
        totalResults: 2,
    },
};
