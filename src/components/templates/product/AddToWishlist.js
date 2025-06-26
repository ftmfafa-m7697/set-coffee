"use client";
import React, {useEffect, useState} from "react";
import {CiHeart} from "react-icons/ci";
import {showSwal} from "@/utils/helpers";


function AddToWishlist({productID}) {

    const [user, setUser] = useState(null)


    useEffect(() => {

        const authUser = async () => {

            const res = await fetch("/api/auth/me");

            if (res.status === 200) {
                const data = await res.json();
                setUser({...data});
            }
        }

         authUser()

    }, []);


    const addToWishlist = async (event) => {
        event.preventDefault();

        if (!user?._id) {
            return showSwal("لطفا اول لاگین کنید", "error", "فهمیدم")
        }

        const wish = {
            user: user._id,
            product: productID,
        }

        const res = await fetch("/api/wishlist", {
            method: "POST",
            headers: {
                " Content-Types": "application/json",
            },
            body: JSON.stringify(wish),
        })

        if (res.status === 200) {
            showSwal("به علاقه مندی ها افزوده شد", "success", "فهمیدم")
        }

    };

    return (
        <div onClick={addToWishlist}>
            <CiHeart/>
            <a href="/">افزودن به علاقه مندی ها</a>
        </div>
    );
}

export default AddToWishlist;
