import styles from "./topbar.module.css";
import {IoIosSearch, IoIosNotifications} from "react-icons/io";

const Topbar = ({user}) => {

    console.log("user🤑🤑🤑" + user);
    return (
        <>
            <div className={styles.topbar}>
                <div className={styles.profile}>
                    <div>
                        <p>{user.name}</p>
                        <span>{user.role === "ADMIN" ? "مدیر" : "کاربر"}</span>
                    </div>
                    {/*<img src={user.img} alt=""/>*/}
                </div>
                <section>
                    <div className={styles.searchBox}>
                        <input type="text" placeholder="جستجو کنید"/>
                        <div>
                            <IoIosSearch/>
                        </div>
                    </div>
                    <div className={styles.notification}>
                        <IoIosNotifications/>
                        <span>2</span>
                    </div>
                </section>
            </div>
        </>
    );
};

export default Topbar;
