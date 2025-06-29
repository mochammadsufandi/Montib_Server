import { comparePassword, hashPassword } from "../lib/bcrypt";
import { generateToken } from "../lib/jsonwebtoken";
import { CustomResponseError } from "../middleware/errorHandler";
import User from "../models/user.model";

export interface userParams {
    username : string,
    email : string,
    password : string,
    role : string
}

export interface loginParams {
    email : string,
    password : string
}


class UserService {

    static async createUser(userParams : userParams) : Promise<void> {
        const {username,email,password,role} = userParams;
        if(!username || !email || !password || !role) {
            throw new CustomResponseError({
                name : "Invalid Input",
                message : "Please Input All Required Field",
                statusCode : 400
            })
        }
        const existingUser = await User.findOne({email : RegExp(`^${email}$`, "i")});
        if(existingUser) {
            throw new CustomResponseError({
                name : "Existing User",
                message : "User is Already Exist",
                statusCode : 400
            })
        }
        const hashedPassword = hashPassword(password);
        const newUser = new User({
            username,
            email : email.toLowerCase(),
            password : hashedPassword,
            role});
        await newUser.save();
    }

    static async login(loginParams : loginParams) : Promise<string> {
        const {email, password} = loginParams;
        if(!email || !password) {
            throw new CustomResponseError({
                name : "Invalid Input",
                message : "Please Input All Required File",
                statusCode : 400
            })
        }
        const loginUser = await User.findOne({email : RegExp(`^${email}$`, "i")});
        if(!loginUser) {
            throw new CustomResponseError({
                name : "User Not Found",
                message : `User with email ${email} is not Found`,
                statusCode : 400
            })
        }
        const checkPassword = comparePassword({password, hashedPassword : loginUser.password});
        if(!checkPassword) {
            throw new CustomResponseError({
                name : "Invalid Password",
                message : "Your Password is not correct",
                statusCode : 400
            })
        }
        const loginToken = generateToken({username : loginUser.username, email : loginUser.email});
        return loginToken;
    }
}


export default UserService;