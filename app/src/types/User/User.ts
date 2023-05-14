export enum RoleEnum{
    ADMIN = 'ADMIN',
    GUEST = 'GUEST',
}

export interface IUser {
    id: number;
    name: string;
    surname: string;
    email?: string;
    displayName: string;
    roles: RoleEnum[];
}

export class User {
    private id : number;
    private name: string;
    private surname: string;
    private email?: string;
    private displayName: string;
    private roles: RoleEnum[];

    constructor(id:number, name: string, surname: string, email?: string, roles: RoleEnum[] = [RoleEnum.GUEST]) {
        this.id = id;
        this.name = name;
        this.surname = surname;
        this.email = email;
        this.displayName = `${name} ${surname}`;
        this.roles = roles;
    }

    public getId(): number { return this.id; }
    public getName(): string { return this.name; }
    public getSurname(): string { return this.surname; }
    public getEmail(): string | undefined { return this.email; }
    public getDisplayName(): string { return this.displayName; }
    public getRoles(): RoleEnum[] { return this.roles; }

    public isAdmin(): boolean { return this.roles.includes(RoleEnum.ADMIN); }
    public isGuest(): boolean { return this.roles.includes(RoleEnum.GUEST); }

    public static fromJson(json: IUser): User {
        return new User(json.id, json.name, json.surname, json.email, json.roles);
    }

    public toJson(): IUser {
        return {
            id: this.id,
            name: this.name,
            surname: this.surname,
            email: this.email,
            displayName: this.displayName,
            roles: this.roles,
        };
    }
}