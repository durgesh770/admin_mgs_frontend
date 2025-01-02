// react 
import React, { useState, useEffect, useCallback } from 'react';

// mui
import { Grid} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

// hooks
import { getPermissions } from '@/hooks/Permissions';
import { convertApiPermissionIntoApp } from '@/hooks/Role/SelectPermission';

// component
import PermissionSidebar from './PermissionSidebar';
import PermissionCard from './PermissionCard';

// api data
import { CustomPermission } from '@/interface/Role';

// interface 
interface SelectPermissionProps {
    data?: CustomPermission[];
    setData?: any;
    access: boolean;
    setAccess: any;
    defaultData?: any[];
}


const SelectPermission: React.FC<SelectPermissionProps> = ({ data, setData, access, setAccess, defaultData }) => {

    // state
    const [selectedItem, setSelectedItem] = useState<CustomPermission | null>(null);
    const [isCardVisible, setCardVisible] = useState(window.innerWidth >= 800);
    const [isDrawerOpen, setDrawerOpen] = useState(window.innerWidth < 800);
    const [permissions, setPermissions] = useState<CustomPermission[]>(data || []);

    // habdleItem
    const handleItemClick = (permissionId: string) => {
        const item = permissions.find((per) => per.id === permissionId) || null;
        setSelectedItem(item);

        setCardVisible(window.innerWidth >= 800);
        setDrawerOpen(window.innerWidth < 800);
    };

    // handle
    const handleDrawerClose = () => {
        setDrawerOpen(false);
    };

    // update permission
    const updatePermissions = useCallback(
        (updatedPermissions: CustomPermission[]) => {
            setPermissions(updatedPermissions);
        },
        [setPermissions]
    );

    // handle set permission 
    const handleSetPermissionActive = (permissionId: string) => {
        const updatedPermissions = permissions.map((permission) => {
            if (permission.id === permissionId) {
                permission.active = !permission.active;

                permission.roles = permission.roles.map((item) => ({ ...item, selected: permission.active }))
            }
            return permission;
        });
        updatePermissions([...updatedPermissions]);
    };

    // handle select role 
    const handleSelectRole = (permissionId: string, role: string) => {
        const updatedPermissions = permissions.map((permission) => {
            if (permission.id === permissionId) {
                const updatedRoles = permission.roles.map((r) => {
                    if (r.role === role) {
                        r.selected = !Boolean(r.selected);
                    }
                    return r;
                });

                let active = permission.roles.every((item) => item.selected);
                return { ...permission, roles: updatedRoles, active };
            }
            return permission;
        });

        updatePermissions([...updatedPermissions]);
    };
    
    // handle side effects
    useEffect(() => {
        const handleResize = () => {
            setCardVisible(window.innerWidth >= 800);
            setDrawerOpen(window.innerWidth < 800);
        };
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);


    let permissionList = getPermissions();
    useEffect(() => {
        if (permissionList.data.length > 0 && permissions.length == 0) {
            const data = permissionList.data.map((item) => ({
                ...item,
                active: false,
                roles: item.roles.map((role) => ({ ...role, selected: false })),
            }));

            if (defaultData && defaultData?.length > 0) {
                let convertData = convertApiPermissionIntoApp({ inputArray: defaultData, database: data });
                updatePermissions(convertData);

                return;
            }

            updatePermissions(data);
        }
    }, [permissionList]);

    useEffect(() => {
        if (selectedItem) {
            handleItemClick(selectedItem.id);
        }

        let access = permissionList.data.length == permissions.filter((per) => per.active).length;
        setAccess(access);

        setData && setData(permissions)
    }, [permissions]);


    //Access All logic
    useEffect(() => {
        if (access == true) {
            const updatedPermissions = permissions.map((permission) => {
                permission.active = access;
                permission.roles = permission.roles.map((item) => ({ ...item, selected: access }))
                return permission;
            });

            updatePermissions(updatedPermissions);
        }
    }, [access]);

    return (
        <div>
            <Grid>
                <div className="relative mt-6 mb-4">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <SearchIcon />
                    </div>
                    <input
                        type="search"
                        id="default-search"
                        className="block w-full p-3 pl-10 text-sm text-gray-900 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Search Permission"
                        required
                    />
                </div>
            </Grid>

            <Grid
                sx={{
                    gap: '30px',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'start',
                    '@media (max-width: 800px)': {
                        display: 'block',
                    },
                }}
            >
                {/* permission sidecard */}
                <PermissionSidebar
                    permissions={permissions}
                    selectedItem={selectedItem}
                    handleItemClick={handleItemClick}
                />
                
                {/* permission card */}
                <PermissionCard
                    selectedItem={selectedItem}
                    handleSetPermissionActive={handleSetPermissionActive}
                    handleSelectRole={handleSelectRole}
                    isCardVisible={isCardVisible}
                    isDrawerOpen={isDrawerOpen}
                    handleDrawerClose={handleDrawerClose}
                />
            </Grid>
        </div>
    );
};

export default SelectPermission;


