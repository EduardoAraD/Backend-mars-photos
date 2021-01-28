import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import Like from './Like'

@Entity('user')
export default class User {
    @PrimaryGeneratedColumn('increment')
    id: number

    @Column()
    name: string

    @OneToMany(() => Like, like => like.user, {
      cascade: ['update', 'insert']
    })
    likes: Like[]
}
