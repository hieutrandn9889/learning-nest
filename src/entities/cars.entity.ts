import { BaseEntity, Column, Entity, PrimaryGeneratedColumn , ManyToOne, JoinColumn} from "typeorm";
import { CategoriesEntity } from "./categories.entity";

@Entity('cars')
export class CarsEntity extends BaseEntity{
    /**
     * xac dinh id la khoa chinh
     *
     * nhiều chiếc xe phụ thuộc 1 loại xe
   */
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    productName: string;

    @Column()
    price: string;

    @Column()
    category_id: number;

    // lấy ra đối tượng category
    @ManyToOne(()=> CategoriesEntity)
    @JoinColumn({name:'category_id', referencedColumnName:'id'})
    category: CategoriesEntity;
}