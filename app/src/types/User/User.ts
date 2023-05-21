export enum RoleEnum{
    ADMIN = 1,
    USER = 2,
    GUEST = 3,
}

export interface IRole{
    id: RoleEnum;
    name: string;
    description?: string;
}

export interface IUser {
    id: number;
    name: string;
    surname: string;
    username: string;
    email?: string;
    displayName: string;
    role: IRole;
}

// export class User {
//     private id? : number;
//     private name?: string;
//     private surname?: string;
//     private email?: string;
//     private displayName?: string;
//     private roles: RoleEnum[];

//     constructor(userInterface?: IUser, id?:number, name?: string, surname?: string, email?: string, roles: RoleEnum[] = [RoleEnum.GUEST]) {
//         if (userInterface) {
//             this.id = userInterface.id;
//             this.name = userInterface.name;
//             this.surname = userInterface.surname;
//             this.email = userInterface.email;
//             this.displayName = userInterface.displayName;
//             this.roles = userInterface.roles;
//             return;
//         }
//         this.id = id;
//         this.name = name;
//         this.surname = surname;
//         this.email = email;
//         this.displayName = `${name} ${surname}`;
//         this.roles = roles;
//     }

//     public getId(): number | undefined { return this.id; }
//     public getName(): string | undefined { return this.name; }
//     public getSurname(): string | undefined { return this.surname; }
//     public getEmail(): string | undefined { return this.email; }
//     public getDisplayName(): string | undefined { return this.displayName; }
//     public getRoles(): RoleEnum[] { return this.roles; }

//     public isAdmin(): boolean { return this.roles.includes(RoleEnum.ADMIN); }
//     public isGuest(): boolean { return this.roles.includes(RoleEnum.GUEST); }

//     public toJson(): IUser {
//         return {
//             id: this.id as number,
//             name: this.name as string,
//             surname: this.surname as string,
//             email: this.email,
//             displayName: this.displayName as string,
//             roles: this.roles,
//         };
//     }
// }