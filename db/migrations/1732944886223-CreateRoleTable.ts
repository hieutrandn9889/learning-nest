import { MigrationInterface, QueryRunner } from "typeorm";
import RoleEntity from "src/entities/role.entity";
import { CategoriesEntity } from "src/entities/categories.entity";
import { CarsEntity } from "src/entities/cars.entity";
import { ColorsEntity } from "src/entities/colors.entity";

export class CreateRoleTable1732944886223 implements MigrationInterface {
    name = 'CreateRoleTable1732944886223'

    

    public async up(queryRunner: QueryRunner): Promise<void> {
        const roleEntity = queryRunner.connection.getRepository(RoleEntity);
        await roleEntity.insert([
            {
                id:1,
                name: 'ADMIN',
                content:'QUAN_LY',
            },
            {
                id:2,
                name: 'STUDENT',
                content:'HOCVIEN',
            },
        ])

        const categoriesEntity = queryRunner.connection.getRepository(CategoriesEntity);
        await categoriesEntity.insert([
            {
                id:1,
                categoryName: 'testCategory1',
                categoryDescription:'testCategory1',
            },
            {
                id:2,
                categoryName: 'testCategory2',
                categoryDescription:'testCategory2',
            },
        ])

        const carsEntity = queryRunner.connection.getRepository(CarsEntity);
        await carsEntity.insert([
            {
                id:1,
                productName: 'testCar1',
                price:'123123123',
                category_id:1
            },
            {
                id:2,
                productName: 'testCar2',
                price:'123123123',
                category_id:1
            },
        ])


        const colorsEntity = queryRunner.connection.getRepository(ColorsEntity);
        await colorsEntity.insert([
            {
                id:1,
                colorName: 'testColor1',
                colorDescription:'testColor1',
                car_id:1,
            },
            {
                id:2,
                colorName: 'testColor2',
                colorDescription:'testColor2',
                car_id:1,
            },
        ])
    }

    public async down(queryRunner: QueryRunner): Promise<void> {

    }

}
