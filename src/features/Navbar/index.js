import { Dropdown } from 'flowbite-react';
import Link from 'next/link';
//hooks
import { handleLogout } from '@/hooks/User';
import { Avatar } from '@mui/material';
//context
import Novu from "@/context/NovuContext";
import { useAuth } from '@/context/AuthContext';
import { useGlobal } from '@/context/GlobalContext';
import { getInitialLetter } from '@/utils/tools';
import MenuIcon from '@mui/icons-material/Menu';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import OnlyTimeTracker from '../../components/ui/TeamMember/TimeTrackerUI/OnlyTimeTracker';

const Navbar = () => {
    let logo = localStorage.getItem("logo")
    let { user, CMSData } = useAuth();
    let { setsidebar,
        sidebar,
        handleLeft,
        setsideba,
        sub } =
        useGlobal()
    return <>
        <nav class="fixed top-0 z-50 w-full bg-[--brand-pastel-color] shadow-xs border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
            <div className={`${!sidebar ? "" : "container-full"}`}>

                <div class="px-3 py-3 lg:px-5 lg:pl-3 ">
                    <div class="flex items-center justify-between">
                        <div class="flex items-center justify-start pl-2">
                            <div className="fullscreen">
                                {!sidebar ?
                                    <ArrowBackIosIcon onClick={() => setsidebar(true)} className=' cursor-pointer' style={{ color: '#43484E' }} />
                                    :
                                    <MenuIcon onClick={() => setsidebar(false)} className=' cursor-pointer' style={{ color: '#43484E' }} />
                                }
                            </div>

                            <div className='phone' >
                                {sub ?
                                    <MenuIcon onClick={() => handleLeft()} className=' cursor-pointer' style={{ color: '#43484E' }} />
                                    :
                                    <ArrowBackIosIcon onClick={() => setsideba()} className=' cursor-pointer' style={{ color: '#43484E' }} />
                                }
                            </div>
                            <img src={`data:image/jpeg;base64,${logo}`} width={60} height={20} alt='logo-img' className='ml-5' />
                            <h1 class="ml-12 font-extrabold text-gray-900 dark:text-white sm:text-[21px] text-[10px] text-transparent bg-clip-text bg-gradient-to-r to-[--admin-color-two] from-[--admin-color-one] ost sm:block hidden uppercase">{CMSData?.admin?.text || "ADMIN AREA"}</h1>
                        </div>

                        <div class="flex  flex-row items-center">
                            <div className='mr-5 md:block  hidden '> <OnlyTimeTracker /></div>
                            <div class="mr-2"><Novu /></div>

                            <div class="ml-3">
                                <Dropdown
                                    arrowIcon={false}
                                    inline
                                    label={
                                        <Avatar sx={{ bgcolor: "var(--brand-color)", width: 40, height: 40, fontSize: "1rem", color: "white" }}>{getInitialLetter(user?.name)}</Avatar>
                                    }
                                >
                                    <Dropdown.Header>
                                        <span className="block text-sm">{user.name}</span>
                                        <span className="block text-sm font-medium truncate">{user.email}</span>
                                    </Dropdown.Header>

                                    <Link href={'/my-profile'}>
                                        <Dropdown.Item>
                                            Profile
                                        </Dropdown.Item>
                                    </Link>

                                    <Dropdown.Divider />
                                    <Dropdown.Item onClick={handleLogout}>Sign out</Dropdown.Item>
                                </Dropdown>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </nav>
    </>

}


export default Navbar;