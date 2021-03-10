'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/', () => {
  return { greeting: 'Hello world in JSON' }
})

// Groups routes together by a prefix
Route.group(() => {
  //Sends the requests to our controller method created using adonis make:controller User
  // then defining the register method
  Route.post('auth/register', "UserController.register")
  Route.post('auth/login', "UserController.login")

}).prefix("api")
