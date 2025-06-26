import {useState} from "react";
import Sms from "@/components/templates/login-register/Sms";
import {showSwal} from "@/utils/helpers";
import {validateEmail, validatePhone, validatePassword} from "/src/utils/auth"
import styles from "./register.module.css";
const Register = ({showLoginForm}) => {

    const [isRegisterWithPass, setIsRegisterWithPass] = useState(false)
    const [isRegisterWithOtp, setIsRegisterWithOtp] = useState(false)
    const hideOtpForm = () => (setIsRegisterWithOtp(false))

    const [name, setName] = useState("")
    const [phone, setPhone] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")


    const signUp = async () => {

        const user = {name, phone, email, password}


        if (!name.trim()) {
            return showSwal("لطفا نام را وارد کنید", "error", "خروج")
        }


        const isValidatePhone = validatePhone(phone)
        if (!isValidatePhone) {
            return showSwal("لطفا شماره تماس را به درستی وارد کنید", "error", "خروج")
        }


        if (email) {
            const isValidateEmail = validateEmail(email)
            if (!isValidateEmail) {
                return showSwal("لطفا ایمیل را به درستی وارد کنید", "error", "خروج")
            }
        }

        const isValidatePassword = validatePassword(password)
        if (!isValidatePassword) {
            return showSwal("رمز باید حداقل هشت کاراکتر و یک حرف بزرگ انگلیسی و یک حرف کوچک انگلیسی و یک عدد و یک کاراکتر خاص داشته باشد", "error", "خروج")
        }


        const res = await fetch("/api/auth/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user),
        })

        if (res.status === 201) {
            showSwal(
                "ثبت نام با موفقیت انجام شد", "success", "ورود به پنل کاربری"
            )
        } else if (res.status === 422) {
            showSwal("کاربری با این اطلاعات وجود دارد", "error", "خروج")
        }

        setName("")
        setPhone("")
        setEmail("")
        setPassword("")
    }


    return (
        !isRegisterWithOtp ? (
            <>
                <div className={styles.form}>
                    <input className={styles.input} type="text" placeholder="نام"
                           value={name} onChange={(event) => setName(event.target.value)}
                    />
                    <input
                        className={styles.input}
                        type="text"
                        placeholder="شماره موبایل" value={phone} onChange={(event) => setPhone(event.target.value)}
                    />
                    <input
                        className={styles.input}
                        type="email"
                        placeholder="ایمیل (دلخواه)" value={email} onChange={(event) => setEmail(event.target.value)}
                    />


                    {isRegisterWithPass && (
                        <input
                            className={styles.input}
                            type="password"
                            placeholder="رمز عبور" value={password}
                            onChange={(event) => setPassword(event.target.value)}
                        />
                    )}

                    <p style={{marginTop: "1rem"}} className={styles.btn} onClick={() => setIsRegisterWithOtp(true)}>
                        ثبت نام با کد تایید
                    </p>

                    <button style={{marginTop: ".7rem"}} className={styles.btn}
                            onClick={() => {

                                if (isRegisterWithPass) {
                                    return signUp()
                                } else {
                                    setIsRegisterWithPass(true)
                                }
                            }
                            }
                    >
                        ثبت نام با رمزعبور
                    </button>
                    <p className={styles.back_to_login} onClick={showLoginForm}>برگشت به ورود
                    </p>
                </div>
                <p className={styles.redirect_to_home}
                >لغو</p>
            </>
        ) : (
            <Sms hideOtpForm={hideOtpForm}/>
        )

    );
};

export default Register;
