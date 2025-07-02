import jwt, {SignOptions, JwtPayload} from "jsonwebtoken";
import dotenv from "dotenv";

interface jwtPayload {
    email : string,
    username : string
}

dotenv.config();
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY as string;

const jwtOption : SignOptions = {
    expiresIn : "2h",
};

export const generateToken = (payload : jwtPayload) : string => {
    return jwt.sign(payload, JWT_SECRET_KEY, jwtOption)
}

export const verifyToken = (token : string) : JwtPayload | string => {
    try {
        const loginUser = jwt.verify(token, JWT_SECRET_KEY);
        if(typeof loginUser === "string") {
            return ""
        } else {
            return loginUser
        }
    } catch (error) {
        console.log(error);
        return ""
    }
}

