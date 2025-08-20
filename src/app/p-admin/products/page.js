import connectToDB from "@/configs/db";
import ProductModel from "@/models/Product";
import AdminPanelLayout from "@/components/layouts/AdminPanelLayout";
import AddProduct from "@/components/templates/p-admin/products/AddProduct";
import Table from "@/components/templates/p-admin/products/Table";
import styles from "@/components/templates/p-admin/products/table.module.css"


const Page = async () => {

    await connectToDB();
    const products = await ProductModel.find({}).sort({_id: -1}).lean();


    return (
        <AdminPanelLayout>
            <main>
                <AddProduct/>
                {products.length === 0 ? (
                    <p className={styles.empty}>محصولی وجود ندارد</p>
                ) : (
                    <Table products={JSON.parse(JSON.stringify(products))} title="لیست محصولات"/>
                )}
            </main>
        </AdminPanelLayout>
    );
};

export default Page;
