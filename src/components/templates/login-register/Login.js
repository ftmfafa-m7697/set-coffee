"use client";

import React, {useState} from "react";
import styles from "./login.module.css";
import Link from "next/link";
import Sms from "./Sms";
import swal from "sweetalert";
import {useRouter} from "next/navigation";
import {loginAction} from "@/actions/login";
import {showSwal} from "@/utils/helpers";

const Login = ({showRegisterForm}) => {
    const router = useRouter();
    const [isLoginWithOtp, setIsLoginWithOtp] = useState(false);
    const [password, setPassword] = useState("");
    const [phoneOrEmail, setPhoneOrEmail] = useState("");

    const hideOtpForm = () => setIsLoginWithOtp(false);

    return (
        <>
            {!isLoginWithOtp ? (
                <>
                    <form
                        action={async (formData) => {
                            const res = await loginAction(formData);

                            if (!res.success) {
                                return showSwal(res.message, "error", "تلاش مجدد");
                            }

                            await swal({
                                    title: "با موفقیت لاگین شدین",
                                    icons: "success",
                                    buttons: "ورود به پنل کاربری"
                                }).then(async () => {
                                    await router.replace("/p-user");
                                }
                            );
                        }}
                    >
                        <div className={styles.form}>
                            <input
                                className={styles.input}
                                type="text"
                                name="email"
                                value={phoneOrEmail}
                                onChange={(event) => setPhoneOrEmail(event.target.value)}
                                placeholder="ایمیل/شماره موبایل"
                                required
                            />
                            <input
                                className={styles.input}
                                type="password"
                                name="password"
                                value={password}
                                onChange={(event) => setPassword(event.target.value)}
                                placeholder="رمز عبور"
                                required
                            />
                            <div className={styles.checkbox}>
                                <input type="checkbox" name="remember" id="remember"/>
                                <p>مرا به یاد داشته باش</p>
                            </div>
                            <button type="submit" className={styles.btn}>
                                ورود
                            </button>
                            <Link href={"/forget-password"} className={styles.forgot_pass}>
                                رمز عبور را فراموش کرده اید؟
                            </Link>
                            <button
                                type="button"
                                onClick={() => setIsLoginWithOtp(true)}
                                className={styles.btn}
                            >
                                ورود با کد یکبار مصرف
                            </button>
                            <span>ایا حساب کاربری ندارید؟</span>
                            <button
                                type="button"
                                onClick={showRegisterForm}
                                className={styles.btn_light}
                            >
                                ثبت نام
                            </button>
                        </div>
                    </form>
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
