import { useState } from "react";

import { useSnackbar } from "@/context/GlobalContext";
import { AvailabilityService } from "@/services";

export const findTeamMember = () => {
    let alert = useSnackbar()

    const [data, setdata] = useState<any>({
        sortedResponse: {},
        bestTimeSlots: [],
        error: []
    });

    const [loading, setLoading] = useState<boolean>(false);


    // Define a function to trigger a re-fetch
    const submit = (body = {}) => {
        setLoading(true);

        AvailabilityService.findTeamMemberAvailability(body).catch((err) => {
            alert.SnackbarHandler(true, "error", err.response?.data?.message || "An error occurred");
        }).then((res) => {
            setdata(res);
        }).finally(() => {
            setLoading(false);
        })
    };

    return { submit, loading, data };
};
