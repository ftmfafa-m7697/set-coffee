import React from "react";
import AdminPanelLayout from "@/components/layouts/AdminPanelLayout";
import styles from "@/components/templates/p-admin/users/table.module.css";
import Table from "@/components/templates/p-admin/users/Table";
import connectToDB from "@/configs/db";
import UserModel from "@/models/User";

const page = async () => {

  await connectToDB();
  const users = await UserModel.find({}).lean();

  return (
    <AdminPanelLayout>
      <main>
        {users.length === 0 ? (
          <p className={styles.empty}>کاربری وجود ندارد</p>
        ) : (
          <Table
            users={JSON.parse(JSON.stringify(users))}
            title="لیست کاربران"
          />
        )}
      </main>
    </AdminPanelLayout>
  );
};

export default page;
