import {
    NovuProvider,
    PopoverNotificationCenter,
    NotificationBell,
} from '@novu/notification-center';

import { useAuth } from "@/context/AuthContext";

export default function Novu() {
    //context
    const { user, loader } = useAuth();

    function onNotificationClick(message) {
        // your logic to handle the notification click

        if (message?.cta?.data?.url) {
            window.location.href = message.cta.data.url;
        }
    }

    return (
        <>
       
        <NovuProvider subscriberId={user.id} applicationIdentifier={process.env.NEXT_PUBLIC_NOVU_APPLICATION}>
            <PopoverNotificationCenter colorScheme={'light'} onNotificationClick={onNotificationClick}>
                {({ unseenCount }) => <NotificationBell unseenCount={unseenCount} />}
            </PopoverNotificationCenter>
        </NovuProvider>
        </>
    );
}