import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
} from 'typeorm';


@Entity()
class RoleEntity {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    name: string;

    @Column()
    content: string;

}

export default RoleEntity;