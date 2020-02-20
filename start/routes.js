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

Route.post('/', () => {
  return { greeting: 'Hello world in JSON' }
})

Route.post('users', 'UserController.store')

Route.post('index', 'UserController.index')

Route.post('login', 'UserController.login')

Route.post('logout', 'UserController.logout')

Route.get('user', 'UserController.user')