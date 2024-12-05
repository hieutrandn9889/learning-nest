import { BaseEntity, Column, Entity, PrimaryGeneratedColumn , ManyToOne, JoinColumn, OneToMany} from "typeorm";
import { ColorsEntity } from "./colors.entity";
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

    /**
     * lấy ra color xe
     *
     * trỏ đến () => ColorsEntity và lấy đc đối tượng car của colors
   */
    @OneToMany(() => ColorsEntity, colors => colors.car)
    @JoinColumn()
    colors: ColorsEntity[]
}