import UserPanelLayout from "@/components/layouts/UserPanelLayout";
import styles from "@/styles/p-user/wishlist.module.css";
import Product from "@/components/templates/p-user/wishlist/Product";
import connectToDb from "@/configs/db";
import {authUser} from "@/utils/serverHelpers";
import WishlistModel from "@/models/Wishlist";

const page = async () => {

    await connectToDb();
    const user = await authUser();
    const wishlist = await WishlistModel.find({user: user._id}).populate(
        "product"
    );


    return (
        <UserPanelLayout>
            <main>
                <h1 className={styles.title}>
                    <span>علاقه مندی ها</span>
                </h1>
                <div className={styles.container}>
                    {wishlist.length > 0 &&
                        wishlist.map((wish) => (
                            <>
                                <Product
                                    key={wish._id}
                                    productID={wish.product._id}  //✔
                                    //لازمه استرینگ باشد که هست

                                    // productID={String(wish.product._id)}

                                    name={wish.product.name}
                                    price={wish.product.price}
                                    score={wish.product.score}
                                />
                            </>

                        ))
                    }
                </div>

                {wishlist.length === 0 && (
                    <p className={styles.empty}>محصولی وجود ندارد</p>
                )}
            </main>
        </UserPanelLayout>
    );
};

export default page;
