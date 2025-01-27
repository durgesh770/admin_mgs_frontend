// 'use client'
// import Navbar from "@/features/Navbar";
// import Sidebar from "@/features/Sidebar";
// //context
// import { useEffect } from "react";
// import { useAuth } from "@/context/AuthContext";
// import { useGlobal } from "@/context/GlobalContext";
// import { useRouter } from "next/navigation";
// import TimeTrackerDrawer from "../TeamMembers/TimeTrackerDrawer/TimeTrackerDrawer"
// import { usePathname } from "next/navigation";

// export const Authenticated = ({ children }) => {
//     const { sidebar } = useGlobal()
//     let { user } = useAuth()
//     const router = useRouter()

//     if (!user) {
//         router.replace("/login")
//     }
//     return <>
//         <div className="bg-[--brand-grey-color]  transition-all">
//             <Navbar />
//             <div className={`${!sidebar ? "" : "sub-container"}`} >
//                 <div className={`${sidebar ? "hidden" : "block"}`}  >
//                     <Sidebar />
//                 </div>
//                 <div className={` pt-8 pb-4 pr-2 mt-14 ${sidebar ? "sm:ml-[10px]" : "sm:ml-[300px]"} ml-[10px]`}>
//                     {children}
//                 </div>
//             </div>
//         </div>
//         <TimeTrackerDrawer />
//     </>
// };

// export const UnAuthenticated = ({ children }) => {
//     let { loader } = useAuth()
//     return <>
//         <div className="w-full">
//             {children}
//         </div>
//     </>
// };

// const Layout = ({ children }) => {
//     const pathname = usePathname()

//     let withoutAuthAccessURL = [
//         "login",
//         "signup",
//         "reset-password",
//         "verify-email",
//         "verify",
//         "reset",
//         "forget-password"
//     ];
//     let { user, loader } = useAuth()
//     const router = useRouter()
//     let authURL = withoutAuthAccessURL.find((url) =>
//         String(pathname).includes(url)
//     );

//     console.log(authURL)

//     console.log(window.location.pathname, "lklhkjh")

//     if (loader) {
//         return <div className="w-full h-screen"><h1 className=" text-center pt-[22%]">Loading . . .</h1></div>;
//     }

//     useEffect(() => {
//         if (loader) return;

//         if (user) {
//             if (authURL) {
//                 router.push("/");
//             }
//         } else {
//             if (!authURL) {
//                 router.push("/login");
//             }
//         }
//     }, [user, loader]);


//     if (!user && authURL) {
//         return <UnAuthenticated children={children} />;
//     }

//     if (user && !loader) {
//         return <Authenticated children={children} />
//     }

// }

// export default Layout;


'use client';
import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Navbar from "@/features/Navbar";
import Sidebar from "@/features/Sidebar";
import TimeTrackerDrawer from "../TeamMembers/TimeTrackerDrawer/TimeTrackerDrawer";
import { useAuth } from "@/context/AuthContext";
import { useGlobal } from "@/context/GlobalContext";

const Authenticated = ({ children }) => {
    const { sidebar } = useGlobal();
    const { user } = useAuth();
    const router = useRouter();

    if (!user) router.replace("/login");

    return (
        <div className="bg-[--brand-grey-color] transition-all">
            <Navbar />
            <div className={`${sidebar ? "sub-container" : ""}`}>
                <Sidebar className={`${sidebar ? "hidden" : "block"}`} />
                <div className={`pt-8 pb-4 pr-2 mt-14 ${sidebar ? "sm:ml-[10px]" : "sm:ml-[300px]"} ml-[10px]`}>
                    {children}
                </div>
            </div>
            <TimeTrackerDrawer />
        </div>
    );
};

const UnAuthenticated = ({ children }) => {
    return <div className="w-full">{children}</div>;
};

const Layout = ({ children }) => {
    const { user, loader } = useAuth();
    const router = useRouter();
    const pathname = usePathname();

    const withoutAuthAccessURL = [
        "login", "signup", "reset-password", "verify-email", "verify", "reset", "forget-password"
    ];

    const authURL = withoutAuthAccessURL.some(url => pathname.includes(url));

    if (loader) return <div className="w-full h-screen"><h1 className="text-center pt-[22%]">Loading . . .</h1></div>;

    useEffect(() => {
        if (loader) return;

        if (user && authURL) {
            router.push("/");
        } else if (!user && !authURL) {
            router.push("/login");
        }
    }, [user, loader, authURL, router]);

    if (!user && authURL) {
        return <UnAuthenticated>{children}</UnAuthenticated>;
    }

    return <Authenticated>{children}</Authenticated>;
};

export default Layout;
