import UserPanelLayout from "@/components/layouts/UserPanelLayout";
import Tickets from "@/components/templates/p-user/tickets/Tickets";
import connectToDB from "@/configs/db";
import {authUser} from "@/utils/checkCookie";
import TicketModel from "@/models/Ticket";

const page = async () => {

    await connectToDB();
    const user = await authUser();

    const tickets = await TicketModel.find({user: user._id})
        .populate("department", "title").sort({_id: -1});

    return (
        <UserPanelLayout>
            <Tickets tickets={JSON.parse(JSON.stringify(tickets))}/>
        </UserPanelLayout>
    )
}
export default page;
