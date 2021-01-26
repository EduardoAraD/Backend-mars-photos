import Photo from '../models/Photo'

export default {
  render (photo: Photo) {
    return {
      url: photo.url,
      description: photo.description,
      like: photo.like
    }
  }
}
