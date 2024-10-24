import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, OneToMany, JoinColumn } from "typeorm";
import { CarsEntity } from "./cars.entity";

@Entity('logos')
export class LogosEntity extends BaseEntity{

    // xac dinh id la khoa chinh
    // oneToMany ở category vì 1 category có nhiều car
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    logoName: string;

    @Column()
    logoDescription: string;

    // lấy ra danh sách xe
    // trỏ đến () => CarsEntity và lấy đc đối tượng category của cars
    @OneToMany(() => CarsEntity, cars => cars.logo)
    @JoinColumn()
    cars: CarsEntity[]
}