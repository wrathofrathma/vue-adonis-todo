'use strict'

// use() is an adonis specific method that they recommend replacing require() with
// Here we're importing the user lucid model
const User = use("App/Models/User")

class UserController {
    //Adding auth to the object passed gives us access to the Auth from the AuthProvider defined in app.js
    // Auth type is defined in config/auth.js
    async login({request, auth}) {
        // request.all groups together all the request parameters, then we use object deconstruction to get the necessary items
        const {email, password} = request.all();
        //Auth attempt
        const token = await auth.attempt(email, password);
        return token;

    }

    async register({request}) {
        // request.all groups together all the request parameters, then we use object deconstruction to get the necessary items
        const { email, password } = request.all();

        //Calls the asynchronous model method to create a new user.
        // Adonis comes with a UserSchema that already includes username, email, and password
        const user = await User.create({
            email,
            password,
            username: email,
        })

        return this.login(...arguments);
    }
}

module.exports = UserController
