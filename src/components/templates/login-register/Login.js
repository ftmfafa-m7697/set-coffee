import {useState} from "react";
import styles from "./login.module.css";
import Link from "next/link";
import Sms from "./Sms";
import {showSwal} from "@/utils/helpers";
import {validateEmail, validatePassword} from "@/utils/auth";
import {useRouter} from "next/navigation";

const Login = ({showRegisterForm}) => {

    const router = useRouter();
    const [isLoginWithOtp, setIsLoginWithOtp] = useState(false);
    const [password, setPassword] = useState("");
    const [phoneOrEmail, setPhoneOrEmail] = useState("");

    const hideOtpForm = () => setIsLoginWithOtp(false);

    const loginWithPassword = async () => {


        if (!phoneOrEmail) {
            return showSwal("لطفا شماره تماس یا ایمیل را وارد کنید", "error", "چشم");
        }

        const isValidEmail = validateEmail(phoneOrEmail);
        if (!isValidEmail) {
            return showSwal("ایمیل وارد شده صحیح نیست", "error", "تلاش مجدد");
        }

        if (!password) {
            return showSwal("پسورد را وارد کنید", "error", "تلاش مجدد");
        }

        const isValidPassword = validatePassword(password);
        if (!isValidPassword) {
            return showSwal("پسورد به اندازه کافی قوی نیست", "error", "تلاش مجدد");
        }

        const user = {email: phoneOrEmail, password};

        const res = await fetch("/api/auth/signin", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(user),
        });


        if (res.status === 200) {
            swal({
                title: "با موفقیت لاگین شدین",
                icon: "success",
                button: "ورود به پنل کاربری"
            }).then(() => {
                router.replace("/p-user")
            });

            setPassword("")
            setPhoneOrEmail("")

        } else if (res.status === 422 || res.status === 401) {
            showSwal("کاربری با این اطلاعات یافت نشد", "error", "تلاش مجدد");
        } else if (res.status === 419) {
            showSwal("ایمیل یا پسورد صحیح نیست", "error", "تلاش مجدد");
        }

    };

    return (
        <>
            {!isLoginWithOtp ? (
                <>
                    <div className={styles.form}>
                        <input
                            className={styles.input}
                            type="text"
                            value={phoneOrEmail}
                            onChange={(event) => setPhoneOrEmail(event.target.value)}
                            placeholder="ایمیل/شماره موبایل"
                        />
                        <input
                            className={styles.input}
                            type="password"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                            placeholder="رمز عبور"
                        />
                        <div className={styles.checkbox}>
                            <input type="checkbox" name="" id=""/>
                            <p>مرا به یاد داشته باش</p>
                        </div>
                        <button className={styles.btn} onClick={loginWithPassword}>
                            ورود
                        </button>
                        <Link href={"/forget-password"} className={styles.forgot_pass}>
                            رمز عبور را فراموش کرده اید؟
                        </Link>
                        <button
                            onClick={() => setIsLoginWithOtp(true)}
                            className={styles.btn}
                        >
                            ورود با کد یکبار مصرف
                        </button>
                        <span>ایا حساب کاربری ندارید؟</span>
                        <button onClick={showRegisterForm} className={styles.btn_light}>
                            ثبت نام
                        </button>
                    </div>
                    <Link href={"/"} className={styles.redirect_to_home}>
                        لغو
                    </Link>
                </>
            ) : (
                <Sms hideOtpForm={hideOtpForm}/>
            )}
        </>
    );
};

export default Login;