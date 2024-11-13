import {
    Column,
    Entity,
    JoinColumn,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';
import UserEntity from './user.entity';


@Entity()
class RoleEntity {
    // id luôn tăng dùng increment
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    name: string;

    @Column()
    content: string;

    @OneToMany(() => UserEntity, users => users.role)
    @JoinColumn()
    users: UserEntity[]

}

export default RoleEntity;