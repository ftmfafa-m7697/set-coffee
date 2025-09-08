import styles from "./adminPanelLayout.module.css";
import Sidebar from "@/components/modules/p-admin/Sidebar";
import Topbar from "@/components/modules/p-admin/Topbor";
import {redirect} from "next/navigation";
import UserModel from "@/models/User"
import {authUser} from "@/utils/checkCookie";

const AdminPanelLayout = async ({children}) => {

    const userLogin = authUser();
    const user = await UserModel.findOne({ username: userLogin._id }).lean();

    if (user) {
        if (user.role !== "ADMIN") {
            return redirect("/login-register");
        }
    } else {
        return redirect("/login-register");
    }


    return (
        <div className={styles.layout}>
            <section className={styles.section}>
                <Sidebar user={JSON.parse(JSON.stringify(user))}/>
                <div className={styles.contents}>
                    <Topbar user={JSON.parse(JSON.stringify(user))}/>
                    {children}
                </div>
            </section>
        </div>

    );
};

export default AdminPanelLayout;
