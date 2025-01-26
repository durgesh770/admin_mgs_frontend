'use client'

import React, { createContext, useContext, useEffect, useState } from 'react';
import { TeamMemberService } from "@/services";
import { CMSServices } from '@/services/CMS';
import { useSnackbar } from '@/context/GlobalContext';

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    let alert = useSnackbar()

    const [user, setUser] = useState(null);
    const [rolesAndPermissions, setrolesAndPermissions] = useState({});
    const [loader, setLoader] = useState(true);
    const [CMSData, setCMSData] = useState({})

    const getUIChanges = () => {
        CMSServices.getCMS()
            .then((res) => {

                console.log("res ====>>" , res)
                setCMSData(res?.data)
                if (!res.data) return;

                if(res?.data?.colors){
                    document.documentElement.style.setProperty('--brand-color', res?.data?.colors?.brand);
                    document.documentElement.style.setProperty('--brand-pastel-color', res?.data?.colors?.pastel);
                    document.documentElement.style.setProperty('--brand-grey-color', res?.data?.colors?.grey);
                    document.documentElement.style.setProperty('--brand-white-color', res?.data?.colors?.white);
                }

                // admin text color 
                document.documentElement.style.setProperty('--admin-color-one', res?.data?.admin?.secondary);
                document.documentElement.style.setProperty('-admin-color-two', res?.data?.admin?.tertiary);

                localStorage.setItem("logo", res?.data?.logo)
            }).finally(() => {
                setLoader(false)
            })
    }

    useEffect(() => {
        getUIChanges()
    }, [])

    const fetchUser = async () => {
        try {
            await TeamMemberService.getMe()
                .then((res) => {
                    if (!res.success) return;
                    setUser(res.data.user);
                    console.log("res.data.rolesAndPermissions ===>>", res.data)
                    setrolesAndPermissions(res.data.rolesAndPermissions);
                })
                .catch((err) => {
                    alert.SnackbarHandler(true, "error", err.response?.data?.data || "An error occurred")
                }).finally(() => {
                    setLoader(false)
                })

        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    };

    useEffect(() => {
        if (!user) {
            fetchUser();
        }
    }, [user]);

    const value = {
        CMSData, user, setUser, loader,
        rolesAndPermissions,
        permissions: rolesAndPermissions[user?.role?.roleId] || []
    };
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};