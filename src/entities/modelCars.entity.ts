import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, OneToMany, JoinColumn } from "typeorm";
import { ColorsEntity } from "./colors.entity";

@Entity('models')
export class ModelCarsEntity extends BaseEntity{

    // xac dinh id la khoa chinh
    // oneToMany ở category vì 1 category có nhiều car
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    modelCarName: string;

    @Column()
    modelCarDescription: string;

    // lấy ra danh sách xe
    // trỏ đến () => CarsEntity và lấy đc đối tượng category của cars
    @OneToMany(() => ColorsEntity, colors => colors.modelCar)
    @JoinColumn()
    colors: ColorsEntity[]
}