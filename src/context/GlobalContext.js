'use client'

import { CMSServices } from '@/services/CMS';
// GlobalContext.js
import { createContext, useContext, useEffect, useState } from 'react';

const GlobalContext = createContext();

export const useGlobal = () => {
    return useContext(GlobalContext);
};

export const useSnackbar = () => {
    const { snackbar, setSnackbar } = useGlobal();

    const SnackbarHandler = (open, type, message) => {
        setSnackbar((old) => ({ ...old, open, message, type }));
    }

    return {
        SnackbarHandler,
        snackbar,
        setSnackbar
    }
}

export const GlobalProvider = ({ children }) => {
    const [data, setData] = useState({});
    const [page, setPage] = useState({});
    const [sidebar, setsidebar] = useState(false);
    const [sub, setSub] = useState(true)
    const [snackbar, setSnackbar] = useState({
        open: false,
        type: "",
        message: ""
    });
    const check = "separator-sidebar"

    // CMS Logic 
    const [CMSdata, setCMSData] = useState({})
    useEffect(() => {
        CMSServices.getCMS()
            .then((res) => {
                setCMSData(res.data)
            })
    }, [])

    const handleLeft = () => {
        setSub(false)
        document.getElementById(`${check}`).style.left = "18rem"
    }

    const setsideba = () => {
        document.getElementById(`${check}`).style.left = "0rem"
        setSub(true)
    }

    let value = {
        data, setData,
        page, setPage,
        snackbar, setSnackbar,
        sidebar, setsidebar,
        check,
        handleLeft,
        setsideba,
        sub, setCMSData, CMSdata
    };
    return (
        <GlobalContext.Provider value={value}>
            {children}
        </GlobalContext.Provider>
    );
};
