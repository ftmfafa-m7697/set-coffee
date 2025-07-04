import Navbar from "@/components/modules/Navbar/Navbar";
import Banner from "@/components/templates/index/Banner/Banner";
import Latest from "@/components/templates/index/latest/Latest";
import Article from "@/components/templates/index/articles/Article";
import Promote from "@/components/templates/index/promote/Promote";
import Footer from "@/components/modules/footer/Footer";
import {authUser} from "@/utils/checkCookie";


export default async function Home() {

    const user = await authUser();


    return (
        <div>
            <Navbar isLogin={!!user}/>
            <Banner/>
            <Latest/>
            <Promote/>
            <Article/>
            <Footer/>
        </div>
    )
}
