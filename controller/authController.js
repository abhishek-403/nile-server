const User = require('../models/Users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const { success, error } = require('../utils/responseWrapper');

const signUpController = async (req, res) => {

    try {
        const { name, email, password } = req.body;
        if (!email || !password) {
            return res.send(error(400, "All fields required!"))
        }


        const invalid = await User.findOne({ email });

        if (invalid) {
            return res.send(error(409, "User already exists."))

        }

        const hashedPassword = await bcrypt.hash(password, 10);



        const currUser = await User.create({
            name, email, password: hashedPassword
        })

        const accessToken = createAccessToken({ _id: currUser._id })
        const refreshToken = createRefreshToken({ _id: currUser._id })

        res.cookie('jwt', refreshToken, {
            httpOnly: true,
            secure: true
        })

        return res.send(success(201, { accessToken }))
    }
    catch (e) {
        return res.send(error(500, e.message))

    }



}

const loginController = async (req, res) => {

    try {


        const { email, password } = req.body;
        if (!email || !password) {
            return res.send(error(400, "All field required!"))
        }

        const currUser = await User.findOne({ email }).select('+password');

        if (!currUser) {
            return res.send(error(404, "User not found!"))
        }

        const compare = await bcrypt.compare(password, currUser.password);

        if (!compare) {
            return res.send(error(401, "Wrong Password!"))
        }





        return res.send(success(200, { currUser }))







    } catch (e) {
        return res.send(error(500, e.message))
    }



}


const logOutController = async (req, res) => {

    try {

        res.clearCookie('jwt', {
            httpOnly: true,
            secure: true
        })
        return res.send(success(200, 'User logged out'))

    } catch (e) {
        return res.send(error(500, e.message))

    }
}









const refreshAccessTokenController = async (req, res) => {
    try {
        const cookies = req.cookies;
        const refreshToken = cookies.jwt;

        if (!refreshToken) {
            return res.send(error(401, "Refresh Token required"))
        }

    } catch (e) {
        return res.send(error(500, e.message))

    }

}






function createAccessToken(body) {
    const accessToken = jwt.sign(body, process.env.ACCESS_TOKEN_KEY, {
        expiresIn: '1h'
    })
    return accessToken;

}

function createRefreshToken(body) {
    const refreshToken = jwt.sign(body, process.env.REFRESH_TOKEN_KEY, {
        expiresIn: '1y'
    })

    return refreshToken;

}





module.exports = {
    signUpController,
    loginController,
    refreshAccessTokenController,
    logOutController

}