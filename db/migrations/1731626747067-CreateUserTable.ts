import UserEntity from "src/entities/user.entity";
import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUserTable1731626747067 implements MigrationInterface {
    name = 'CreateUserTable1731626747067'

    public async up(queryRunner: QueryRunner): Promise<void> {
        const userEntity = queryRunner.connection.getRepository(UserEntity);
        await userEntity.insert([
            {
                id:1,
                name: 'hieutran1',
                email:'hieutran1@gmail.com',
                roleId:1,
            },
            {
                id:2,
                name: 'hieutran2',
                email:'hieutran2@gmail.com',
                roleId:2,
            },
        ])
    }

    public async down(queryRunner: QueryRunner): Promise<void> {

    }

}
