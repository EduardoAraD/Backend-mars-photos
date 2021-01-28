import Like from '../models/Like'
import Photo from '../models/Photo'
import User from '../models/User'

import UserView from './UserView'

export default {
  render (photo: Photo) {
    return {
      id: photo.id,
      url: photo.url,
      date: photo.date
    }
  },
  renderLike (photo: Photo, likes: number, user: User, like: Like) {
    return {
      photo: {
        id: photo.id,
        url: photo.url,
        date: photo.date
      },
      likes,
      user: UserView.render(user),
      like: {
        id: !like ? -1 : like.id
      }
    }
  },
  renderMany (photos: Photo[]) {
    return photos.map(item => this.render(item))
  }
}
