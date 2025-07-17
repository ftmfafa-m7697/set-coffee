import Link from "next/link";
import styles from "./ticket.module.css";


const Ticket = ({ _id, title, department, createdAt, hasAnswer }) => {


    return (
        <Link href={`/p-user/ticket/answer/${_id}`} className={styles.ticket}>
            <div>
                <p>{title}</p>
                <p className={styles.department}>{department?.title}</p>
            </div>
            <div>
                <p>{new Date(createdAt).toLocaleDateString('fa-IR')}</p>
                <p className={styles.no_answer}>
                    {hasAnswer ? "پاسخ داده شده" : "پاسخ داده نشده"}
                </p>
            </div>
        </Link>
    );

};

export default Ticket;
