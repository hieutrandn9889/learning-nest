import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import RoleEntity from './role.entity';


@Entity()
class UserEntity {
    // id luôn tăng dùng increment
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    roleId: number;

    @ManyToOne(()=> RoleEntity)
    @JoinColumn({name:'roleId', referencedColumnName:'id'})
    role: RoleEntity;

}

export default UserEntity;