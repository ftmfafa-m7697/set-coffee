import styles from "@/styles/product.module.css";
import Gallery from "@/components/templates/product/Gallery";
import Details from "@/components/templates/product/Details";
import Tabs from "@/components/templates/product/Tabs";
import MoreProducts from "@/components/templates/product/MoreProducts";
import Footer from "@/components/modules/footer/Footer";
import Navbar from "@/components/modules/Navbar/Navbar";
import connectToDb from "@/configs/db";
import productModel from '@/models/Product'
import {authUser} from "@/utils/checkCookie";


const product = async ({params}) => {

    const user = await authUser();
    await connectToDb()

    const productId =await params.id;
    const product = await productModel.findOne({_id: productId}).populate("comments");
    const relatedProducts = await productModel.find({name: product.name});



    return (
        <div className={styles.container}>
            <Navbar isLogin={!!user}/>
            <div data-aos="fade-up" className={styles.contents}>
                <div className={styles.main}>
                    <Details product={JSON.parse(JSON.stringify(product))}/>
                    <Gallery/>
                </div>
                <Tabs product={JSON.parse(JSON.stringify(product))}/>
                <MoreProducts relatedProducts={JSON.parse(JSON.stringify(relatedProducts))}/>
            </div>
            <Footer/>
        </div>
    );
};

export default product;
