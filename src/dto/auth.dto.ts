import UserEntity from "src/entities/user.entity";

export class AuthResponseDto {
    id: number;
    username: string;
    permission: string;
    constructor({ id, username, permission }) {
        this.id = id;
        this.username = username;
        this.permission = permission ;
        return this;
    };
}

export class AuthPayloadDto{
    username: string;
    password: string;
}

export class AuthPermission{
    id?: number;
    token?: string;
    expiredTime?: string;
    constructor({ id, token, expiredTime }) {
        this.id = id;
        this.token = token;
        this.expiredTime = expiredTime ;
        return this;
    };
}


 /**
    [
        {
            "id": 1,
            "name": "hieutran1",
            "email": "hieutran1@gmail.com",
            "roleId": 1,
            "role": {
                "id": 1,
                "name": "ADMIN",
                "content": "QUAN_LY"
        }
        }
    ]
*/
export class UserDto{
    name: string;
    email: string;
    role: string;
    content:string;
    constructor(user: UserEntity ) {
        this.name = user.name;
        this.email = user.email;
        this.role = user.role.name ;
        this.content = user.role.content ;
        return {...this};
    };
}