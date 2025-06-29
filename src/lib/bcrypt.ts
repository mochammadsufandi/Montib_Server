import bcrypt from "bcryptjs";

interface comparePasswordParams {
    password : string, 
    hashedPassword : string
}



const salt = bcrypt.genSaltSync(10);

export const hashPassword = (password : string) : string => {
    return bcrypt.hashSync(password, salt);
}

export const comparePassword = ({password , hashedPassword } : comparePasswordParams ) : boolean => {
    return bcrypt.compareSync(password, hashedPassword);
}