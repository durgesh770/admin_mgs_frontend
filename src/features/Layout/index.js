'use client'
import Navbar from "@/features/Navbar";
import Sidebar from "@/features/Sidebar";
//context
import { useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useGlobal } from "@/context/GlobalContext";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import TimeTrackerDrawer from "../TeamMembers/TimeTrackerDrawer/TimeTrackerDrawer"

export const Authenticated = ({ children }) => {
    const { sidebar } = useGlobal()
    let { user } = useAuth()
    const router = useRouter()

    if (!user) {
        router.replace("/login")
    }
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
    const pathname = usePathname()

    let withoutAuthAccessURL = [
        "login",
        "signup",
        "reset-password",
        "verify-email",
        "verify",
        "reset",
        "forget-password"
    ];
    let { user, loader } = useAuth()
    const router = useRouter()
    
    let authURL = withoutAuthAccessURL.find((url) =>
        String(pathname).includes(url)
    );

    if (loader) {
        return <div className="w-full h-screen"><h1 className=" text-center pt-[22%]">Loading . . .</h1></div>;
    }

    useEffect(() => {
        if (loader) return;

        if (user) {
            if (authURL) {
                router.push("/");
            }
        } else {
            if (!authURL) {
                router.push("/login");
            }
        }
    }, [user, loader]);


    if (!user && authURL) {
        return <UnAuthenticated children={children} />;
    }

    if (user && !loader) {
        return <Authenticated children={children} />
    }

}

export default Layout;

