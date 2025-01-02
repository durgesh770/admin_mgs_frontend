import Link from "next/link";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

//context
import { useGlobal } from '@/context/GlobalContext';
import { useEffect, useState } from "react";

// icons
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import EventIcon from '@mui/icons-material/Event';
import DateRangeIcon from '@mui/icons-material/DateRange';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import PostAddIcon from '@mui/icons-material/PostAdd';
import GroupIcon from '@mui/icons-material/Group';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import LockIcon from '@mui/icons-material/Lock';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import EventNoteIcon from '@mui/icons-material/EventNote';
import SettingsIcon from '@mui/icons-material/Settings';
import SummarizeIcon from '@mui/icons-material/Summarize';
import AssessmentIcon from '@mui/icons-material/Assessment';
import CalculateIcon from '@mui/icons-material/Calculate';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import CouponIcon from "@mui/icons-material/LocalOffer";
import ShareIcon from "@mui/icons-material/Share";
import GroupsIcon from '@mui/icons-material/Groups';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import StorageIcon from '@mui/icons-material/Storage';
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PaymentIcon from '@mui/icons-material/Payment';
import { Business } from '@mui/icons-material';

// Permission Access
import { PermissionAccess } from "@/middleware/PermissionAccess";
import { getQueryFromUrl } from "@/utils/tools";

const Sidebar = () => {
    const pathname = usePathname();
    const router = useRouter()
    const { check } = useGlobal();

    const querytabs = getQueryFromUrl()
    const [dropdownTabs, setdropdownTabs] = useState([
        "appointments",
        "customers",
    ]);
    const params = useSearchParams()

    useEffect(() => {

    }, [pathname, getQueryFromUrl])

    const handleDropdown = (key) => {
        let arr = [...dropdownTabs];
        if (arr.includes(key)) {
            arr = arr.filter((item) => item != key);
        } else {
            arr.push(key);
        };
        setdropdownTabs(arr)
    };

    const handleAddQuery = () => {
        router.push(`${pathname}?timeTracker=true`)
    }

    return <aside id={`${check}`} class={`shadow-lg fixed h-full top-0 z-40 w-72 transition-transform -translate-x-full sm:translate-x-0 bg-[--brand-white-color]`} aria-label="Sidebar">
        <div class="h-full mt-[5rem] border-r border-gray-200 px-1 pt-2 pb-28 overflow-y-auto  dark:bg-gray-800">
            <ul class="space-y-0 text-sm" >
                <li>
                    <Link href="/" onClick={() => handleDropdown("home")} class={`flex flex-row justify-between items-center p-2  font-semibold group text-black ${!params.get("timeTracker") && pathname == '/' ? 'bg-[--brand-color]  text-white' : ''}`}>

                        <div className="flex flex-row items-center justify-between " >
                            <HomeOutlinedIcon className="" />
                            <span class="ml-3">Home</span>
                        </div>
                    </Link>
                </li>

                <PermissionAccess requiredPermissions={["view_appointments"]}>
                    <li>
                        <div onClick={() => handleDropdown("appointments")} className="flex flex-row items-center justify-between p-2 font-semibold cursor-pointer rounded-lg- black-900 dark:text-white group text-[--text-header-color]">
                            <div className="flex flex-row items-center justify-between text-black" >
                                <EventIcon className="" />
                                <span class="flex-1 ml-3 whitespace-nowrap">Appointments</span>
                            </div>
                            <KeyboardArrowDownOutlinedIcon className="" />
                        </div>
                        {dropdownTabs.includes("appointments") && (
                            <>
                                <li>
                                    <Link href={"/appointments/all-appointment"} className={`flex items-center pt-2 pb-2 pl-8 font-semibold rounded-lg- black-900 dark:hover:bg-gray-700 group ${!params.get("timeTracker") && pathname === '/appointments/all-appointment' ? 'bg-[--brand-color] text-white' : 'text-[--text-header-color]'}`}>
                                        <DateRangeIcon className="" />
                                        <span class="flex-1 ml-3 whitespace-nowrap ">All Appointments</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link href={"/appointments/approved-appointment"} className={`flex items-center pt-2 pb-2 pl-8 font-semibold rounded-lg- black-900 group ${!params.get("timeTracker") && pathname === '/appointments/approved-appointment' ? 'bg-[--brand-color] text-white' : 'text-[--text-header-color]'}`}>
                                        <PlaylistAddCheckIcon />
                                        <span class="flex-1 ml-3 whitespace-nowrap ">Approved Appointments</span>
                                    </Link>
                                </li>
                                <PermissionAccess requiredPermissions={["create_appointments"]}>
                                    <li>
                                        <Link href={"/appointments/create-appointment"} className={`flex items-center pt-2 pb-2 pl-8 font-semibold rounded-lg- black-900 group ${!params.get("timeTracker") && pathname === '/appointments/create-appointment' ? 'bg-[--brand-color] text-white' : 'text-[--text-header-color]'}`}>
                                            <PostAddIcon />
                                            <span class="flex-1 ml-3 whitespace-nowrap ">Create Appointment</span>
                                        </Link>
                                    </li>
                                </PermissionAccess>
                            </>
                        )}
                    </li>
                </PermissionAccess>

                <li>
                    <Link onClick={() => handleDropdown("customers")} href={""} class="flex flex-row justify-between items-center p-2  font-semibold group text-[--text-header-color]">
                        <div className="flex flex-row items-center justify-between text-black" >
                            <svg dataTestid="home-icon" width="24" height="24" viewBox="0 0 24 24" role="img" ariaLabel="Customer"><path fill-rule="evenodd" clip-rule="evenodd" d="M5.5 9.5C5.5 8.11929 6.61929 7 8 7C9.38071 7 10.5 8.11929 10.5 9.5C10.5 10.8807 9.38071 12 8 12C6.61929 12 5.5 10.8807 5.5 9.5ZM8 9C7.72386 9 7.5 9.22386 7.5 9.5C7.5 9.77614 7.72386 10 8 10C8.27614 10 8.5 9.77614 8.5 9.5C8.5 9.22386 8.27614 9 8 9Z" fill="black"></path> <path d="M6 17C6 15.8954 6.89543 15 8 15C9.10457 15 10 15.8954 10 17H12C12 14.7909 10.2091 13 8 13C5.79086 13 4 14.7909 4 17H6Z" fill="black"></path> <path d="M20 11H14V9H20V11Z" fill="black"></path> <path d="M14 15H18V13H14V15Z" fill="black"></path> <path fill-rule="evenodd" clip-rule="evenodd" d="M0 6C0 4.34315 1.34315 3 3 3H21C22.6569 3 24 4.34315 24 6V18C24 19.6569 22.6569 21 21 21H3C1.34314 21 0 19.6569 0 18V6ZM3 5C2.44772 5 2 5.44772 2 6V18C2 18.5523 2.44772 19 3 19H21C21.5523 19 22 18.5523 22 18V6C22 5.44771 21.5523 5 21 5H3Z" fill="black"></path></svg>
                            <span class="flex-1 ml-3 whitespace-nowrap">Customers</span>
                        </div>
                        <KeyboardArrowDownOutlinedIcon className=" text-[--text-header-color]" />
                    </Link>
                    
                    {dropdownTabs.includes("customers") && (
                        <>
                            <li>
                                <Link href={"/customers"} className={`flex items-center pt-2 pb-2 pl-8 font-semibold rounded-lg- black-900 group ${(!params.get("timeTracker") && !params.get("new_customer")) && pathname === '/customers' && querytabs != 'new_customer=true' ? 'bg-[--brand-color] text-white' : 'text-[--text-header-color]'}`}>
                                    <GroupIcon />
                                    <span class="flex-1 ml-3 whitespace-nowrap ">All Customers</span>
                                </Link>
                            </li>
                            <li>
                                <Link href={"/customers?new_customer=true"} className={`flex items-center pt-2 pb-2 pl-8 font-semibold black-900 group ${!params.get("timeTracker") && params.get("new_customer") == 'true' ? 'bg-[--brand-color] text-white' : 'text-[--text-header-color]'}`}>
                                    <PersonAddIcon />
                                    <span class="flex-1 ml-3 whitespace-nowrap ">Add Customers</span>
                                </Link>
                            </li>
                        </>
                    )
                    }
                </li>

                <PermissionAccess requiredPermissions={["view_referral"]}>
                    <li>
                        <Link onClick={() => handleDropdown("referral")} href={""} class="flex flex-row justify-between items-center p-2  font-semibold group text-[--text-header-color]">
                            <div className="flex flex-row items-center justify-between text-black" >
                                <ShareIcon className="" />
                                <span class="flex-1 ml-3 whitespace-nowrap">Referral</span>
                            </div>
                            <KeyboardArrowDownOutlinedIcon className=" text-[--text-header-color]" />
                        </Link>

                        {dropdownTabs.includes("referral") && (
                            <>
                                <PermissionAccess requiredPermissions={["view_referral"]}>

                                    <li>
                                        <Link href={"/referrals/all-referral"} className={`flex items-center pt-2 pb-2 pl-8 font-semibold black-900 group ${(!params.get("timeTracker") && !params.get("new_referral")) && pathname === '/referrals/all-referral' ? 'bg-[--brand-color] text-white' : 'text-[--text-header-color]'}`}>
                                            <CouponIcon className="" />
                                            <span class="flex-1 ml-3 whitespace-nowrap ">All Referrals</span>
                                        </Link>
                                    </li>
                                </PermissionAccess>

                                <PermissionAccess requiredPermissions={["create_referral"]}>
                                    <li>
                                        <Link href={"/referrals/all-referral?new_referral=true"} className={`flex items-center pt-2 pb-2 pl-8 font-semibold  black-900  group ${!params.get("timeTracker") && params.get("new_referral") == "true" ? 'bg-[--brand-color] text-white' : 'text-[--text-header-color]'}`}>
                                            <LibraryAddIcon className="" />
                                            <span class="flex-1 ml-3 whitespace-nowrap ">Add Referral</span>
                                        </Link>
                                    </li>
                                </PermissionAccess>
                            </>
                        )
                        }
                    </li>
                </PermissionAccess>

                <PermissionAccess requiredPermissions={["view_payments"]}>

                    <li>
                        <Link href={"/payments/history"} class={`flex items-center p-2  font-semibold group ${!params.get("timeTracker") && pathname == '/payments/history' ? 'bg-[--brand-color]  text-white' : ''}`}>

                            <MonetizationOnIcon className="" />
                            <span class="flex-1 ml-3 whitespace-nowrap">Payment History</span>
                        </Link>
                    </li>
                </PermissionAccess>

                <PermissionAccess requiredPermissions={["view_member"]}>

                    <li>
                        <Link href="" onClick={() => handleDropdown("team-members")} class="flex flex-row justify-between items-center p-2  font-semibold	 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group text-[--text-header-color]">
                            <div className="flex flex-row items-center justify-between text-black" >
                                <GroupsIcon className="" />
                                <span class="flex-1 ml-3 whitespace-nowrap">Team Members</span>
                            </div>
                            <KeyboardArrowDownOutlinedIcon className=" text-[--text-header-color]" />
                        </Link>
                        {dropdownTabs.includes("team-members") && (
                            <>
                                <Link href={"/team-members"} className={`flex items-center pt-2 pb-2 pl-8 font-semibold rounded-lg- black-900 group ${!params.get("timeTracker") && pathname === '/team-members' ? 'bg-[--brand-color]  text-white' : 'text-[--text-header-color]'}`}>
                                    <SupervisorAccountIcon className="" />
                                    <span class="flex-1 ml-3 whitespace-nowrap ">All Team Members</span>
                                </Link>
                                <li>
                                    <Link href={"/team-members/leave-calender"} className={`flex items-center pt-2 pb-2 pl-8 font-semibold rounded-lg- black-900 group ${!params.get("timeTracker") && pathname === '/team-members/leave-calender' ? 'bg-[--brand-color] text-white' : 'text-[--text-header-color]'}`}>
                                        <EventNoteIcon className="" />

                                        <span class="flex-1 ml-3 whitespace-nowrap ">Leave Calender</span>
                                    </Link>
                                </li>

                                <PermissionAccess requiredPermissions={["create_member"]}>
                                    <li>
                                        <Link href={"/team-members/create-member"} className={`flex items-center pt-2 pb-2 pl-8 font-semibold rounded-lg- black-900 group ${!params.get("timeTracker") && pathname == '/team-members/create-member' ? 'bg-[--brand-color] text-white' : 'text-[--text-header-color]'}`}>

                                            <GroupAddIcon className="" />

                                            <span class="flex-1 ml-3 whitespace-nowrap ">Add Team Members</span>
                                        </Link>
                                    </li>
                                </PermissionAccess>

                                <li>
                                    <button onClick={handleAddQuery} className={`flex  w-full items-center pt-2 pb-2 pl-8 font-semibold  black-900  group ${params.get("timeTracker") == "true" ? 'bg-[--brand-color] text-white' : 'text-[--text-header-color]'}`}>
                                        <AccessTimeIcon />
                                        <span class="ml-3 whitespace-nowrap ">Time Tracker</span>
                                    </button>
                                </li>

                                <PermissionAccess requiredPermissions={["view_payroll"]}>

                                    <li>
                                        <Link href={"/team-members/manage-payroll"} className={`flex items-center pt-2 pb-2 pl-8 font-semibold rounded-lg- black-900 group ${!params.get("timeTracker") && pathname == '/team-members/manage-payroll' ? 'bg-[--brand-color] text-white' : 'text-[--text-header-color]'}`}>
                                            <PaymentIcon />
                                            <span class="flex-1 ml-3 whitespace-nowrap ">Manage Payroll</span>
                                        </Link>
                                    </li>
                                </PermissionAccess>

                            </>
                        )}
                    </li>

                </PermissionAccess>

                <PermissionAccess matchPermissions={["manage_sales_revenue_report", "view_income_vs_expense_report", "appointment_report"]}>
                    <li>
                        <div onClick={() => handleDropdown("accounts")} class="flex flex-row justify-between items-center p-2 font-semibold group cursor-pointer">
                            <div className="flex flex-row items-center justify-between" >
                                <CalculateIcon className="" />
                                <span class="flex-1 ml-3 whitespace-nowrap ">Accounts</span>
                            </div>
                            <KeyboardArrowDownOutlinedIcon className=" text-[--text-header-color]" />
                        </div>
                        {dropdownTabs.includes("accounts") && (
                            <>
                                <PermissionAccess requiredPermissions={["manage_sales_revenue_report"]}>
                                    <li>
                                        <Link href={"/accounts/revenue-report?tab=0"} className={`flex items-center pt-2 pb-2 pl-8 font-semibold black-900 group ${!params.get("timeTracker") && pathname === '/accounts/revenue-report' ? 'bg-[--brand-color] text-white' : 'text-[--text-header-color]'}`}>
                                            <SummarizeIcon className="" />
                                            <span class="flex-1 ml-3 whitespace-nowrap ">Sales Revenue Report</span>
                                        </Link>
                                    </li>
                                </PermissionAccess>

                                <PermissionAccess requiredPermissions={["view_income_vs_expense_report"]}>
                                    <li>
                                        <Link href={"/accounts/income-vs-expense"} className={`flex items-center pt-2 pb-2 pl-8 font-semibold black-900 group ${!params.get("timeTracker") && pathname === '/accounts/income-vs-expense' ? 'bg-[--brand-color] text-white' : 'text-[--text-header-color]'}`}>
                                            < AssessmentIcon className="" />
                                            <span class="flex-1 ml-3 whitespace-nowrap ">Income vs Expense Report</span>
                                        </Link>
                                    </li>
                                </PermissionAccess>

                                <PermissionAccess requiredPermissions={["appointment_report"]}>
                                    <li>
                                        <Link href={"/accounts/appointment-report?tab=0"} className={`flex items-center pt-2 pb-2 pl-8 font-semibold black-900 group ${!params.get("timeTracker") && pathname === '/accounts/appointment-report' ? 'bg-[--brand-color] text-white' : 'text-[--text-header-color]'}`}>
                                            <EventIcon className="" />
                                            <span class="flex-1 ml-3 whitespace-nowrap ">Appointment Report</span>
                                        </Link>
                                    </li>
                                </PermissionAccess>
                            </>
                        )}
                    </li>
                </PermissionAccess>

                <li>
                    <div onClick={() => handleDropdown("settings")} class="flex flex-row justify-between items-center p-2  font-semibold group cursor-pointer ">
                        <div className="flex flex-row items-center justify-between" >
                            <SettingsIcon className="" />

                            <span class="flex-1 ml-3 whitespace-nowrap">App Settings</span>
                        </div>
                        <KeyboardArrowDownOutlinedIcon className=" text-[--text-header-color]" />
                    </div>
                    {dropdownTabs.includes("settings") && (
                        <>
                            <PermissionAccess requiredPermissions={["view_permission"]}>
                                <li>
                                    <Link href={"/permissions"} class={`flex items-center pt-2 pb-2 pl-8  font-semibold group ${!params.get("timeTracker") && pathname == '/permissions' ? 'bg-[--brand-color]  text-white' : ''}`}>
                                        <LockIcon className="" />
                                        <span class="flex-1 ml-3 whitespace-nowrap">Permissions</span>
                                    </Link>
                                </li>
                            </PermissionAccess>

                            <PermissionAccess requiredPermissions={["view_service"]}>
                                <li>
                                    <Link href={"/services"} class={`flex items-center  pt-2 pb-2 pl-8 font-semibold group ${!params.get("timeTracker") && pathname == '/services' ? 'bg-[--brand-color]  text-white' : ''}`}>

                                        <StorageIcon />
                                        <span class="flex-1 ml-3 whitespace-nowrap">Services</span>
                                    </Link>
                                </li>
                            </PermissionAccess>
                            <li>
                                <Link href={"/cms"} class={`flex items-center  pt-2 pb-2 pl-8 font-semibold group ${!params.get("timeTracker") && pathname == '/cms' ? 'bg-[--brand-color]  text-white' : ''}`}>

                                    <Business />
                                    <span class="flex-1 ml-3 whitespace-nowrap">CMS</span>
                                </Link>
                            </li>
                        </>
                    )}
                </li>
            </ul>
        </div>
    </aside>
}

export default Sidebar; 
