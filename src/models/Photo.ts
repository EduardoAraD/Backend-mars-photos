import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('photo')
export default class Photo {
    @PrimaryGeneratedColumn('increment')
    id: number

    @Column()
    url: string

    @Column()
    description: string

    @Column()
    like: number
}
