export enum RoleEnum {
	ADMIN = 1,
	USER = 2,
	GUEST = 3,
	UDRZBA = 4,
	SUPERVISOR = 5,
	SESTRA = 6,
	PECOVATEL = 7,
	UKLIZEC = 8,
	REDITEL = 9,
	MANAGER = 10,
	KUCHAR = 11,
}

export const roleSelectValues = [
	{
		value: RoleEnum.ADMIN,
		label: 'Administrátor',
	},
	{
		value: RoleEnum.USER,
		label: 'Běžný uživatel',
	},
	{
		value: RoleEnum.UDRZBA,
		label: 'Údržbář',
	},
	{
		value: RoleEnum.SUPERVISOR,
		label: 'Vedoucí pracovník',
	},
	{
		value: RoleEnum.SESTRA,
		label: 'Zdravotní sestra',
	},
	{
		value: RoleEnum.PECOVATEL,
		label: 'Pečovatel',
	},
	{
		value: RoleEnum.UKLIZEC,
		label: 'Uklízeč',
	},
	{
		value: RoleEnum.REDITEL,
		label: 'Ředitel',
	},
	{
		value: RoleEnum.MANAGER,
		label: 'Manažer',
	},
	{
		value: RoleEnum.KUCHAR,
		label: 'Kuchař',
	},
];

export interface IRole {
	id: RoleEnum;
	name: string;
	description?: string;
}

export interface IQueryUser {
	id: number;
	name: string;
	surname: string;
	username: string;
	email?: string;
	role_id: number;
	role_name: string;
	role_desc?: string;
}

export interface IGetUsersQuery {
	id: number;
	name: string;
	surname: string;
	username: string;
	email: string;
	role_id: number;
	role_name: string;
	role_desc: string;
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

export interface IUserAdd {
	name: string;
	surname: string;
	username: string;
	email?: string;
	password: string;
}

export interface IUserUpdate {
	name: string;
	surname: string;
	username: string;
	email?: string;
	role: RoleEnum;
}
