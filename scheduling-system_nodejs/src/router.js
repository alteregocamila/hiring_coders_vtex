import { Router } from 'express'
import multer from 'multer'

import multerConfig from './config/multer'

import User from './app/models/User'

import UserController from './app/controllers/UserController'
import SessionController from './app/controllers/SessionController'
import FileController from './app/controllers/FileController'
import CollaboratorController from './app/controllers/CollaboratorController'
import AppointmentController from './app/controllers/AppointmentController'
import ScheduleController from './app/controllers/ScheduleController'
import NotificationsController from './app/controllers/NotificationsController'

import authMiddleware from './app/middlewares/auth'

const routes = new Router()
const upload = multer(multerConfig)

routes.get('/', (req, res) => {
  res.json({ message: 'Okay' })
})

//Test Route
routes.get('/test', async (req, res) => {
  // console.log('xxxxxxxxxx')
  const user = await User.create({
    name: 'Camila',
    email: 'camila@email.com',
    password_hash: '123456'
  })
  return res.json(user)
})

routes.post('/users', UserController.store)
routes.post('/session', SessionController.store)

//Authenticated Routes
routes.use(authMiddleware)
routes.put('/users', UserController.update)

// Appointment Route
routes.post('/appointments', AppointmentController.store)

//Appointment List
routes.get('/appointments', AppointmentController.index)

//Collaborators list
routes.get('./collaborator', CollaboratorController.index)

//Schedule List
routes.get('/schedule', ScheduleController.index)

// Notifications List
routes.get('/notifications', NotificationsController.index)

// Mark as read
routes.put('/notifications/:id', NotificationsController.update)

//Upload of files
routes.post('/files', upload.single('file'), FileController.store)
// routes.post('/files', upload.single('file'), (req, res) => {
//   return res.json({ message: 'Everything is ok' })
// })

export default routes
