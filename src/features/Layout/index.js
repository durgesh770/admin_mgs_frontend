'use client'

import Navbar from "@/features/Navbar";
import Sidebar from "@/features/Sidebar";

//context
import { useAuth } from "@/context/AuthContext";
import { useGlobal } from "@/context/GlobalContext";
import TimeTrackerDrawer from "../TeamMembers/TimeTrackerDrawer/TimeTrackerDrawer"

export const Authenticated = ({ children }) => {
    const { sidebar } = useGlobal()
    return <>
        <div className="bg-[--brand-grey-color]  transition-all">
            <Navbar />
            <div className={`${!sidebar ? "" : "sub-container"}`} >
                <div className={`${sidebar ? "hidden" : "block"}`}  >
                    <Sidebar />
                </div>
                <div className={` pt-8 pb-4 pr-2 mt-14 ${sidebar ? "sm:ml-[10px]" : "sm:ml-[300px]"} ml-[10px]`}>
                    {children}
                </div>
            </div>
        </div>
        <TimeTrackerDrawer />
    </>
};

export const UnAuthenticated = ({ children }) => {
    return <>
        <div className="w-full">
            {children}
        </div>
    </>
};

const Layout = ({ children }) => {
    let { user } = useAuth()
    return user ? <Authenticated children={children} /> : <UnAuthenticated children={children} />;
}

export default Layout;