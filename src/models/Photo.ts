import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm'
import Like from './Like'

@Entity('photo')
export default class Photo {
    @PrimaryGeneratedColumn('increment')
    id: number

    @Column()
    url: string

    @Column()
    description: string

    @Column()
    date: string

    @OneToMany(() => Like, like => like.photo, {
      cascade: ['insert', 'update']
    })
    likes: Like[]
}
