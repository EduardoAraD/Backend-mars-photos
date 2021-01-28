import Like from '../models/Like'
import PhotoView from './PhotoView'
import UserView from './UserView'

export default {
  render (like: Like) {
    return {
      id: like.id,
      photo: PhotoView.render(like.photo),
      user: UserView.render(like.user)
    }
  }
}
