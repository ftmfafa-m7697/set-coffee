import {IoMdStar} from "react-icons/io";
import styles from "./commentForm.module.css";
import {useState} from "react";
import {showSwal} from "@/utils/helpers";

const CommentForm = ({productID}) => {

    console.log("productID", productID)

    const [body, setBody] = useState(null);
    const [userName, setUserName] = useState(null);
    const [email, setEmail] = useState(null);
    const [score, setScore] = useState(null);

    function commentScores(score) {
        setScore(score);
    }

    async function sendComment() {

        const comment = {
            body,
            username: userName,
            email,
            score,
            productID
        }

        const res = await fetch("/api/comments", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(comment)
        })

        if (res.status === 201) {

            await showSwal("کامنت شما با موفقیت ثبت شد", "success", "باشه")
            setBody("")
            setUserName("")
            setEmail("")
            setScore("")
        }

    }


    return (
        <div className={styles.form}>
            <p className={styles.title}>دیدگاه خود را بنویسید</p>
            <p>
                نشانی ایمیل شما منتشر نخواهد شد. بخش‌های موردنیاز علامت‌گذاری شده‌اند{" "}
                <span style={{color: "red"}}>*</span>
            </p>
            <div className={styles.rate}>
                <p>امتیاز شما :</p>
                <div>
                    <IoMdStar onClick={() => setScore(5)}/>
                    <IoMdStar onClick={() => setScore(4)}/>
                    <IoMdStar onClick={() => setScore(3)}/>
                    <IoMdStar onClick={() => setScore(2)}/>
                    <IoMdStar onClick={() => setScore(1)}/>
                </div>
            </div>
            <div className={styles.group}>
                <label htmlFor="">
                    دیدگاه شما
                    <span style={{color: "red"}}>*</span>
                </label>
                <textarea
                    id="comment"
                    name="comment"
                    cols="45"
                    rows="8"
                    required=""
                    placeholder=""
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                ></textarea>
            </div>
            <div className={styles.groups}>
                <div className={styles.group}>
                    <label htmlFor="">
                        نام
                        <span style={{color: "red"}}>*</span>
                    </label>
                    <input type="text" value={userName} onChange={(e) => setUserName(e.target.value)}/>
                </div>
                <div className={styles.group}>
                    <label htmlFor="">
                        ایمیل
                        <span style={{color: "red"}}>*</span>
                    </label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                </div>
            </div>
            <div className={styles.checkbox}>
                <input type="checkbox" name="" id=""/>
                <p>
                    {" "}
                    ذخیره نام، ایمیل و وبسایت من در مرورگر برای زمانی که دوباره دیدگاهی
                    می‌نویسم.
                </p>
            </div>
            <button onClick={sendComment}>ثبت</button>
        </div>
    );
};

export default CommentForm;
