import { useState } from 'react';
import { TeamMemberService } from '@/services'; // Import your service file

//interface
import { useSnackbar } from '@/context/GlobalContext';


export const updateStaffHours = (memberId: string) => {
    let alert = useSnackbar()


    const [loading, setLoading] = useState<boolean>(false);


    // Define a function to trigger a re-fetch
    const submit = (body: object) => {
        setLoading(true);

        TeamMemberService.updateStaffHours(memberId, body).catch((err) => {
            alert.SnackbarHandler(true, "error", err.response?.data?.message || "An error occurred");
        }).then((res) => {

            if (res?.success) {

                alert.SnackbarHandler(true, "success", "Member updated successfully");
                window.location.reload()

            }
        }).finally(() => {
            setLoading(false);
        })
    };

    return { submit, loading };
};