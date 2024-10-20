import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, OneToMany, JoinColumn } from "typeorm";
import { CarsEntity } from "./cars.entity";

@Entity('categories')
export class CategoriesEntity extends BaseEntity{

    // xac dinh id la khoa chinh
    // oneToMany ở category vì 1 category có nhiều car
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    categoryName: string;

    @Column()
    description: string;

    // lấy ra danh sách xe
    // trỏ đến () => CarsEntity và lấy đc đối tượng category của cars
    @OneToMany(() => CarsEntity, cars => cars.category)
    @JoinColumn()
    cars: CarsEntity[]
}