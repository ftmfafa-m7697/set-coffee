import UserPanelLayout from "@/components/layouts/UserPanelLayout";
import styles from "@/styles/p-user/index.module.css";
import Box from "@/components/templates/p-user/index/Box";
import Tickets from "@/components/templates/p-user/index/Tickets";
import Orders from "@/components/templates/p-user/index/Orders";
import {authUser} from "@/utils/checkCookie";
import ticketModel from "@/models/Ticket"
import commentModel from "@/models/Comment";
import wishlistModel from "@/models/Wishlist";


const page = async () => {

    const user = await authUser()
    const tickets = await ticketModel.find({user: user._id})
        .limit(3) //فقط 3 تیکت نمایش داده شود
        .populate("department", "title")
        .sort({id: -1}) //ترتیب تیکت ها از اخرین تیکت به اولین تیکت باشد
        .lean()

    const AllTickets = await ticketModel.find({user: user._id})
    const AllComments = await commentModel.find({user: user._id})
    const AllWishlist = await wishlistModel.find({user: user._id})



    return (
        <UserPanelLayout>
            <main>
                <section className={styles.boxes}>
                    <Box title="مجموع تیکت ها " value={AllTickets.length}/>
                    <Box title="مجموع کامنت ها " value={AllComments.length}/>
                    <Box title="مجموع سفارشات" value="2"/>
                    <Box title="مجموع علاقه مندی ها" value={AllWishlist.length}/>
                </section>
                <section className={styles.contents}>
                    <Tickets tickets={JSON.parse(JSON.stringify(tickets))}/>
                    <Orders/>
                </section>
            </main>
        </UserPanelLayout>
    );


};

export default page;
