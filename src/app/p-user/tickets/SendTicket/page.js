import UserPanelLayout from "@/components/layouts/UserPanelLayout";
import SendTicket from "@/components/templates/p-user/tickets/sendTicket";


const page = () => {

    return (
        <UserPanelLayout>
            <SendTicket />
        </UserPanelLayout>
    );

};

export default page;
