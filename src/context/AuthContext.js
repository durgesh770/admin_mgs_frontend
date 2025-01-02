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

    useEffect(() => {
        CMSServices.getCMS().then((res) => {
            setCMSData(res.data)
            document.documentElement.style.setProperty('--brand-color', res.data.colors.brand);
            document.documentElement.style.setProperty('--brand-pastel-color', res.data.colors.pastel);
            document.documentElement.style.setProperty('--brand-grey-color', res.data.colors.grey);
            document.documentElement.style.setProperty('--brand-white-color', res.data.colors.white);

            // admin text color 
            document.documentElement.style.setProperty('--admin-color-one', res.data.admin.secondary);
            document.documentElement.style.setProperty('-admin-color-two', res.data.admin.tertiary);
            setLoader(false)
            localStorage.setItem("logo", res.data.logo)
        }).catch((err) => {
            console.log(err)
        })
    }, [])

    const fetchUser = async () => {
        try {
            let data = await TeamMemberService.getMe()
                .catch((err) => alert.SnackbarHandler(true, "error", err.response?.data?.data || "An error occurred"));

            if (!data.success) return;

            setUser(data.data.user);
            setrolesAndPermissions(data.data.rolesAndPermissions);
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    };

    useEffect(() => {
        // Only fetch user data if it hasn't been fetched before
        if (!user) {
            fetchUser();
        }
    }, [user]); // Fetch user data whenever the "user" state change

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