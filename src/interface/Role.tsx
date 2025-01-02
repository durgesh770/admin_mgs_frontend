export interface PermissionRole {
    title: string;
    role: string;
    _id: string;
}

export interface Role {
    permissionId: {
        icon: string;
        title: string;
        desc: string;
        roles: PermissionRole[];
        id: string;
    };
    roles: string[];
    _id: string;
}

export interface DataResult {
    _id: string;
    title: string;
    roleId: string;
    fullAccess: boolean;
    permissions: Role[];
    __v: number;
    totalMember: number;
}

export interface ApiResponse {
    success: boolean;
    data: {
        results: DataResult[];
        page: number;
        limit: number;
        totalPages: number;
        totalResults: number;
    };
}

const sampleData: ApiResponse = {
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


//Custom

export interface CustomPermission {
    icon: string;
    iconColor?: string;
    title: string;
    desc: string;
    roles: CustomRole[];
    id: string;
    active: boolean;
}

export interface CustomRole {
    title: string;
    role: string;
    _id: string;
    selected: boolean;
}


export interface GetSingleRole {
    title: string;
    roleId: string;
    fullAccess: boolean;
    permissions: {
        permissionId: string;
        roles: string[];
        _id: string;
    }[];
    id: string;
}