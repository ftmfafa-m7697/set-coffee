import React from "react";
import AdminPanelLayout from "@/components/layouts/AdminPanelLayout";
import styles from "@/styles/p-admin/index.module.css";
import Box from "@/components/modules/infoBox/InfoBox";
import connectToDB from "@/configs/db";
import TicketModel from "@/models/Ticket";
import UserModel from "@/models/User";
import ProductModel from "@/models/Product";
import SaleChart from "@/components/templates/p-admin/index/SaleChart";
import GrowthChart from "@/components/templates/p-admin/index/GrowthChart";


async function AdminHomePage() {

    await connectToDB();
    const tickets = await TicketModel.find({}).lean();
    const users = await UserModel.find({}).lean();
    const products = await ProductModel.find({}).lean();

    return (
        <AdminPanelLayout>
            <main>
                <section className={styles.dashboard_contents}>
                    <Box title="مجموع تیکت های دریافتی" value={tickets.length}/>
                    <Box title="مجموع محصولات سایت" value={products.length}/>
                    <Box title="مجموع سفارشات" value="333"/>
                    <Box title="مجموع کاربر های سایت" value={users.length}/>
                </section>
                {" "}
                <div className={styles.dashboard_charts}>
                    <section>
                        <p>آمار فروش</p>
                        <SaleChart/>
                    </section>
                    <section>
                        <p>نرخ رشد</p>
                        <GrowthChart/>
                    </section>
                </div>
            </main>
        </AdminPanelLayout>
    );
}

export default AdminHomePage;
