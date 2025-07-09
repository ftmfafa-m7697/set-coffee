import './globals.css'
import {Inter} from 'next/font/google'
import AOSInit from "@/utils/aos";
import ScrollTOTop from "@/utils/ScrollToTop"
import connectToDb from "@/configs/db";




const inter = Inter({subsets: ['latin']})

export const metadata = {
    title: 'فروشگاه اینترنتی قهوه |صفحه اصلی ',
    description: 'فروشگاه قهوه ساخته شده با نکست جی اس برای تمرین',
    icons: {
        icon: "https://creazilla-store.fra1.digitaloceanspaces.com/cliparts/36190/coffee-logo-clipart-md.png",
    },
}

export default  async function RootLayout({children}) {
    await connectToDb()

    return (
        <html lang="fa">


        <body className={inter.className}>
        <AOSInit/>
        {children}
        <ScrollTOTop/>
        </body>

        </html>
    )
}
