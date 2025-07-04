import {compare, hash} from "bcryptjs";
import {sign, verify} from "jsonwebtoken"

const hashPassword = async (password) => {

    return await hash(password, 12);
}
//PHPSTORM WAY
const verifyPassword = async (password, hashedPassword) => {

    const isValid = await compare(password, hashedPassword)
    return isValid;
}


const generateAccessToken = async (data) => {

    const token = await sign({...data}, process.env.AccessTokenPrivateKey, {
        expiresIn: "60d"
    })

    return token

}


const verifyAccessToken =  (token) => {


    try {
        const tokenPayload =  verify(token, process.env.AccessTokenPrivateKey)
        return tokenPayload
    } catch (err) {
        console.log("verify access token error", err)
    }
}


const generateRefreshToken = async (data) => {

    const token = await sign({...data}, process.env.RefreshTokenPrivateKey, {
        expiresIn: "15d"
    })
    return token

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
