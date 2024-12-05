import { BaseEntity, Column, Entity, PrimaryGeneratedColumn , ManyToOne, JoinColumn} from "typeorm";
import { CarsEntity } from "./cars.entity";

@Entity('colors')
export class ColorsEntity extends BaseEntity{
    /**
     * xac dinh id la khoa chinh
     *
     * nhiều màu sắc phụ thuộc 1 xe
   */
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    colorName: string;

    @Column()
    colorDescription: string;

    @Column()
    car_id: number;

    // lấy ra đối tượng car
    @ManyToOne(()=> CarsEntity)
    @JoinColumn({name:'car_id', referencedColumnName:'id'})
    car: CarsEntity;
}