import {compare, hash} from "bcryptjs";
import {sign, verify} from "jsonwebtoken"



const hashPassword = async (password) => {

    return await hash(password, 12);
}


const verifyPassword = async (password, hashedPassword) => {

    return await compare(password, hashedPassword);
}


const generateAccessToken = async (data) => {

    return await sign({...data}, process.env.AccessTokenPrivateKey, {
        expiresIn: "60d"
    })

}


const verifyAccessToken =  (token) => {


    try {
        return verify(token, process.env.AccessTokenPrivateKey)
    } catch (err) {
        console.log("verify access token error", err)
    }
}


const generateRefreshToken = async (data) => {

    return await sign({...data}, process.env.RefreshTokenPrivateKey, {
        expiresIn: "15d"
    })

}
const validateEmail = (email) => {
    const pattern = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/g;
    return pattern.test(email);
};

const validatePhone = (phone) => {
    const pattern = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/g;
    return pattern.test(phone);
};

const validatePassword = (password) => {
    const pattern =
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/g;
    return pattern.test(password);
};


export {
    hashPassword,
    verifyPassword,
    generateAccessToken,
    verifyAccessToken,
    generateRefreshToken,
    validateEmail,
    validatePhone,
    validatePassword,
}
