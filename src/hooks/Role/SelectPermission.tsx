import { CustomPermission } from "@/interface/Role";
import { useMemo, useState } from "react";

interface convertApiPermissionIntoAppProps {
    inputArray: {
        permissionId: string;
        roles: string[];
        _id: string;
    }[];
    database: CustomPermission[];
}


export function convertApiPermissionIntoApp({ inputArray, database }: convertApiPermissionIntoAppProps) {
    const groupedArray = database.map((permission) => {
        const foundPermission = inputArray.find(item => item.permissionId == permission.id);

        if (foundPermission) {
            const rolesWithSelection = permission.roles.map(dbRole => {
                const inputRole = foundPermission.roles.find(role => role === dbRole.role);
                return {
                    ...dbRole,
                    selected: inputRole ? true : false,
                };
            });

            const allRolesSelected = rolesWithSelection.every(role => role.selected);

            return {
                icon: permission.icon,
                iconColor: permission.iconColor,
                title: permission.title,
                desc: permission.desc,
                roles: rolesWithSelection,
                id: permission.id,
                active: allRolesSelected,
            };
        }
        return permission;
    }).filter(Boolean);

    return groupedArray;
}


export const managePermissionData = () => {
    const [permissionData, setpermissionData] = useState<CustomPermission[]>([]);


    const filteredPermissions = useMemo(() => {
        let arr:any = [];

        const result = permissionData.map((permission) => {
            const roles = permission.roles
                .filter((role) => role.selected)
                .map((role) => role.role);

            if (roles.length > 0) {
                arr.push({
                    permissionId: permission.id,
                    roles: roles,
                });
            };

        });

        return arr;
    }, [permissionData]);


    return {
        filteredPermissions,

        permissionData,
        setpermissionData
    }
};