import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('accounts')
export class AccountsEntity extends BaseEntity{
    
    // xac dinh id la khoa chinh
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    password: string;

    @Column()
    permission: string;

}