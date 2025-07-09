import DataTable from "@/components/templates/p-user/comments/DataTable";
import UserPanelLayout from "@/components/layouts/UserPanelLayout";
import connectToDb from "@/configs/db";
import commentModel from "@/models/Comment";
import {authUser} from "@/utils/checkCookie";
import styles from "@/styles/p-user/dataTable.module.css";


const page = async () => {

    await connectToDb();
    const user = await authUser();


    const comments = await commentModel.find(
        {email: user.email}, "-__v").populate("productID", "name");
    //استاد از ایدی استفاده کرده بود در حالی که در مدل ایدی ندارد پس ایمیل مناسبتره


    return (
        <UserPanelLayout>
            <main>
                {
                    comments.length > 0 ? (
                        <DataTable
                            comments={JSON.parse(JSON.stringify(comments))}
                            title="لیست کامنت‌ها"
                        />
                    ) : (
                        <p className={styles.empty}>
                            کامنتی وجود ندارد
                        </p>
                    )
                }
            </main>
        </UserPanelLayout>
    );
};

export default page;
