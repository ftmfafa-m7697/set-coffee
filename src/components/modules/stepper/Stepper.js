import Link from "next/link";
import styles from "./stepper.module.css";
import { FaArrowLeftLong } from "react-icons/fa6";


const Stepper = ({ step }) => {


  return (
    <div className={styles.stepper_bg}>
      <div className={styles.stepper}>
        <Link className={step == "cart" && styles.active_step} href={"/cart"}>
          سبد خرید
        </Link>
        <FaArrowLeftLong />
        {step === "checkout" || step === "complete" ? (
          <Link
            className={step == "checkout" && styles.active_step}
            href={"/checkout"}
          >
            پرداخت
          </Link>
        ) : (
          <p>پرداخت</p>
        )}
        <FaArrowLeftLong />
        {step == "complete" ? (
          <Link
            className={step == "complete" && styles.active_step}
            href={"/complete"}
          >
            تکمیل سفارش
          </Link>
        ) : (
          <p> تکمیل سفارش</p>
        )}
      </div>
    </div>
  );
};

export default Stepper;
