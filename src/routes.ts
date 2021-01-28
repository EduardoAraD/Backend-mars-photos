import { Router } from 'express'
import ApiController from './controllers/ApiController'
import PhotoController from './controllers/PhotoController'
import UserController from './controllers/UserController'
import LikeController from './controllers/LikeController'

const routes = Router()

routes.get('/', (request, response) => {
  return response.json({ message: 'Hello World' })
})

routes.get('/start-api', ApiController.getApiRequest)

routes.get('/users/:id', UserController.show)
routes.post('/users', UserController.create)
routes.delete('/users/:id', UserController.delete)

routes.get('/photos', PhotoController.index)
routes.post('/photos/:id', PhotoController.show)

routes.get('/likes/:id', LikeController.show)
routes.post('/likes', LikeController.create)
routes.delete('/likes/:id', LikeController.delete)

export default routes
