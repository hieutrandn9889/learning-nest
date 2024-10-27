import { BaseEntity, Column, Entity, PrimaryGeneratedColumn , ManyToOne, JoinColumn} from "typeorm";
import { CategoriesEntity } from "./categories.entity";
import { LogosEntity } from "./logos.entity";
import { ModelCarsEntity } from "./modelCars.entity";

@Entity('cars')
export class ColorsEntity extends BaseEntity{
    
    // xac dinh id la khoa chinh
    // nhiều chiếc xe phụ thuộc 1 loại xe
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    colorName: string;

    @Column()
    colorDescription: string;

    @Column()
    category_id: number;

    // lấy ra đối tượng category
    @ManyToOne(()=> CategoriesEntity)
    @JoinColumn()
    category: CategoriesEntity;

    // lấy ra đối tượng logo
    @ManyToOne(()=> ModelCarsEntity)
    @JoinColumn()
    modelCar: ModelCarsEntity;

}