"use client";

import React, {useState} from "react";
import styles from "./tabs.module.css";
import Comments from "@/components/templates/product/Comments";
import MoreInfoes from "@/components/templates/product/MoreInfoes";
import Description from "@/components/templates/product/Description";



const Tabs = ({product}) => {

    // console.log("tab product 😢 ==> " + product);

    const [tab, setTab] = useState("description");


    return (
        <>
            <div data-aos="fade-left" className={styles.tabs}>
                <ul>
                    <li>
                        <button
                            className={tab === "description" ? styles.active_tab : ""}
                            onClick={() => setTab("description")}
                        >
                            توضیحات
                        </button>
                    </li>
                    <li>
                        <button
                            className={tab === "moreInfoes" ? styles.active_tab : ""}
                            onClick={() => setTab("moreInfoes")}
                        >
                            اطلاعات بیشتر
                        </button>
                    </li>
                    <li>
                        <button
                            className={tab === "comments" ? styles.active_tab : ""}
                            onClick={() => setTab("comments")}
                        >
                            نظرات (
                            {product.comments.filter((comment) => comment.isAccept).length})
                        </button>
                    </li>
                </ul>

                <div className={styles.contents}>
                    <section>
                        {tab === "description" && <Description product={product}/>}
                        {tab === "moreInfoes" && (
                            <MoreInfoes product={product}/>
                        )}
                        {tab === "comments" && (
                            <Comments
                                productID={product._id}
                                comments={product.comments}
                            />
                        )}
                    </section>
                </div>
            </div>
        </>
    );
};

export default Tabs;
