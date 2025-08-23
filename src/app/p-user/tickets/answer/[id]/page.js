import connectToDB from "@/configs/db";
import TicketModel from "@/models/Ticket";
import UserPanelLayout from "@/components/layouts/UserPanelLayout";
import styles from "@/styles/p-user/answerTicket.module.css";
import Link from "next/link";
import Answer from "@/components/templates/p-user/tickets/Answer";


const page = async ({params}) => {

    const ticketID = params.id;
    await connectToDB();
    const ticket = await TicketModel.findOne({_id: ticketID}).populate("user", "name").lean();
    const answerTicket = await TicketModel.findOne({mainTicket: ticket._id});

    
    return (
        <UserPanelLayout>
            <main className={styles.container}>
                <h1 className={styles.title}>
                    <span>تیکت تستی</span>
                    <Link href="/p-user/tickets/sendTicket">ارسال تیکت جدید</Link>
                </h1>

                <div>
                    <Answer ticket={...ticket} type="user" />
                    {!answerTicket ? (
                        <div className={styles.empty}>
                            <p>هنوز پاسخی دریافت نکردید</p>
                        </div>
                    ):(
                        <Answer ticket={...ticket} type="admin" />
                    )}
                </div>
            </main>
        </UserPanelLayout>
    );
};

export default page;
