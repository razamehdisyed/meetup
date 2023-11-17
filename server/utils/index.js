import bcrypt from 'bcryptjs'
import JWT from 'jsonwebtoken'


//create hashed password
export const hashString = async (useValue) => {
    const salt = await bcrypt.genSalt(10)

    const hashedpassword = await bcrypt.hash(useValue, salt)
    return hashedpassword
}
// compare password
export const compareString = async (userPassword, password) => {
    const isMatch = await bcrypt.compare(userPassword, password)
    return isMatch
}
//json web token
export function createJWT(id) {
    return JWT.sign({ userId: id}, process.env.JWT_SECRET_KEY, {
        expiresIn:"id",
    })
}