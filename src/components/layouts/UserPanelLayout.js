import React from "react";
import styles from "./userPanelLayout.module.css";
import Sidebar from "@/components/modules/p-user/Sidebar";
import Topbar from "@/components/modules/p-user/Topbar";
import {authUser} from "@/utils/checkCookie";
import {redirect} from "next/navigation";
import UserModel from "@/models/User";

const UserPanelLayout = async ({children}) => {

    // const user = await authUser();
    const userLogin = authUser();
    const user = await UserModel.findOne({ username: userLogin._id });

    if (!user) {
        redirect("/login-register");
    }

    return (
        <div className={styles.layout}>
            <section className={styles.section}>
                <Sidebar user={JSON.parse(JSON.stringify(user))} />
                <div className={styles.contents}>
                    <Topbar user={JSON.parse(JSON.stringify(user))} />
                    {children}
                </div>
            </section>
        </div>
    );
};

export default UserPanelLayout;
