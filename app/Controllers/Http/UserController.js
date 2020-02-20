'use strict'

const User = use('App/Models/User')
const Hash = use('Hash')

class UserController {
    // creating and saving a new user (sign-up)
    async store({ request, response }) {
        try {
            // getting data passed within the request
            const data = request.only(['username', 'email', 'password'])

            // looking for user in database
            const userExists = await User.findBy('email', data.email)

            // if user exists don't save
            if (userExists) {
                return response.unauthorized({ message: 'User already registered' })
            }

            // if user doesn't exist, proceeds with saving him in DB
            const user = await User.create(data)
            response.send({ message: 'success' })

            return user
        } catch (err) {
            return response
                .status(err.status)
                .send(err)
        }
    }

    async login({ request, response }) {
        try {
            const { email, password } = request.all()
            const user = await User.query().where("email", email).first()

            if (user) {
                const passwordVerified = await Hash.verify(password, user.password)
                if (passwordVerified) {
                    return await response.ok({ message: 'hello', user: user })
                } else {
                    return response.badRequest({ message: 'badRequest' })
                }
            }
        } catch (error) {
            console.log('shit err')
            return response.status(error.status).send(error)
        }
    }

    async logout({ request, response, auth }) {
        // try {
        //     console.log(auth.check())
        // } catch (error) {
        //     response.send('You are not logged in')
        // }
        try {
            await auth.logout()
        } catch (error) {
            return response.status(error.status).send(error)
        }
    }

    async user({ request, response, auth }) {
        try {
            return await auth.getUser()
        } catch (error) {
            return response.send('You are not logged in')
        }
    }
}

module.exports = UserController
