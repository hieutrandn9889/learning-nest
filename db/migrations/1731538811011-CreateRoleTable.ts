import RoleEntity from "src/entities/role.entity";
import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateRoleTable1731538811011 implements MigrationInterface {
    name = 'CreateRoleTable1731538811011'

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
    }

    public async down(queryRunner: QueryRunner): Promise<void> {

    }

}
