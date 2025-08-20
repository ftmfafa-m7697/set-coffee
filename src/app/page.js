import Navbar from "@/components/modules/Navbar/Navbar";
import Banner from "@/components/templates/index/Banner/Banner";
import Latest from "@/components/templates/index/latest/Latest";
import Article from "@/components/templates/index/articles/Article";
import Promote from "@/components/templates/index/promote/Promote";
import Footer from "@/components/modules/footer/Footer";
import {authUser} from "@/utils/checkCookie";
import connectToDb from "@/configs/db";
import ProductModel from "@/models/Product";


export default async function Home() {
    await connectToDb()
    const user = await authUser();
    const latestProducts = await ProductModel.find({}).sort({_id:-1}).limit(8)

    return (
        <div>
            <Navbar isLogin={!!user}/>
            <Banner/>
            <Latest products={JSON.parse(JSON.stringify(latestProducts))} />
            <Promote/>
            <Article/>
            <Footer/>
        </div>
    )
}
