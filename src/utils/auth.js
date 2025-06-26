import {compare, hash} from "bcryptjs";
import {sign, verify} from "jsonwebtoken"
// import {cookies} from "next/headers";


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


const verifyAccessToken = async (token) => {


    try {
        const tokenPayload = await verify(token, process.env.AccessTokenPrivateKey)
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


// export const authUser = async () => {
//
//     const token = cookies().get("token")?.value;
//
//     let user = null;
//
//     if (token) {
//         try {
//             const tokenPayload = await verifyAccessToken(token);
//             console.log('Payload:', tokenPayload);
//
//             if (tokenPayload) {
//                 user = await UserModel.findOne({email: tokenPayload.email});
//             }
//         } catch (err) {
//             console.error('Token validation failed:', err);
//         }
//     }
//
//
//     return user;
// }


// create route checkAuth


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
