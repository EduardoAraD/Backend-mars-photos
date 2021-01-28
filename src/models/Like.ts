import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import User from './User'
import Photo from './Photo'

@Entity('like')
export default class Like {
    @PrimaryGeneratedColumn('increment')
    id: number

    @ManyToOne(() => User, user => user.likes)
    @JoinColumn({ name: 'userId' })
    user: User

    @ManyToOne(() => Photo, photo => photo.likes)
    @JoinColumn({ name: 'photoId' })
    photo: Photo
}
