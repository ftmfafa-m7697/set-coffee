import styles from "./answer.module.css";

const Answer = ({ type }) => {
  return (
    <section
      className={type === "user" ? styles.userTicket : styles.adminticket}
    >
      <div className={styles.ticket_main}>
        <p>8:56 1402/10/21 </p>
        <div>
          <div>
            <p>شاهین مشکل گشا</p>
            <span>کاربر</span>
          </div>
          <img src="/images/shahin.jpg" alt="" />
        </div>
      </div>
      <div className={styles.ticket_text}>
        <p>درود خسته نباشید</p>
      </div>
    </section>
  );
};

export default Answer;
