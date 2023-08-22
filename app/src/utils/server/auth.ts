'use server';
import { IUser, RoleEnum, IRole, IQueryUser } from '@centrin/types/users.dto';
//import Cookies from 'js-cookie';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import pool from './db';

const TOKEN_NAME = 'jwtToken';
const SECRET_KEY = 'secretKey';
// const TOKEN_TTL = 60 * 60 * 24 * 7; // 7 days
const TOKEN_TTL = 60 * 60 * 24; // 1 day

/**
 * Function to hash password
 * @param {string} password
 * @returns {string} hashed password
 */
export const hashPassword = (password: string): string => {
	const hash = crypto.createHash('sha256');
	const saltedPassword = `${SECRET_KEY}${password}`;
	hash.update(saltedPassword);
	return hash.digest('hex');
};

export const login = async (
	username: string,
	password: string,
): Promise<IUser | null> => {
	const client = await pool.connect();
	// const query = `SELECT * FROM centrin.users WHERE username=${username} AND password=${hashPassword(password)}`;
	const query = `SELECT users.id AS id, users.name AS name, users.surname AS surname, users.username AS username, users.email AS email, users.role_id AS role_id, roles.name AS role_name, roles.description AS role_desc FROM centrin.users AS users JOIN centrin.roles AS roles ON users.role_id=roles.id WHERE username='${username}' AND password='${hashPassword(
		password,
	)}';`;
	// select * from centrin.users as users join centrin.roles as roles on users.role_id = roles.id where users.username='admin' and users.password='admin'
	const result = await client.query<IQueryUser>(query);
	const data = result.rows;

	if (data.length === 0) {
		return null;
	}

	const user: IUser = {
		id: data[0].id,
		name: data[0].name,
		surname: data[0].surname,
		username: data[0].username,
		email: data[0].email,
		displayName: `${data[0].name} ${data[0].surname}`,
		role: {
			id: data[0].role_id,
			name: data[0].role_name,
			description: data[0].role_desc,
		},
	};

	client.release();

	return user;
};

/**
 * Function to generate JWT token
 * @param {IUser} user
 * @returns {string} token
 * */
export const generateToken = async (user: IUser): Promise<string> => {
	const token = jwt.sign(user, SECRET_KEY, { expiresIn: TOKEN_TTL });
	//console.log('generateToken', token)
	return token;
};

/**
 * Function to verify JWT token
 * @param {string} token
 * @returns {IUser | null} user
 * */
export const verifyToken = async (token: string): Promise<IUser | null> => {
	try {
		return jwt.verify(token, SECRET_KEY) as IUser;
	} catch (error) {
		return null;
	}
};

/**
 * Function to get JWT token from cookies
 * @returns {string | undefined} token
 * */
export const getToken = async (): Promise<string | undefined> => {
	const cookieStore = cookies();
	return cookieStore.get(TOKEN_NAME)?.value;
};

// /**
//  * Function to remove JWT token from cookies
//  * */
// export const removeToken = async (): void => {
//   Cookies.remove(TOKEN_NAME);
// };

/**
 * Function to check if user is authorized
 * @param {RoleEnum[]} validRoles
 * @returns {boolean} isAuthorized
 * */
export const authUser = async (validRoles: RoleEnum[]): Promise<boolean> => {
	const token = await getToken();
	if (token) {
		const user = await verifyToken(token);
		if (user) {
			const userRole = user.role.id;
			if (validRoles.includes(userRole)) {
				return true;
			}
		}
		return false;
	}
	return false;
};

/**
 * Function to check if user is authorized as admin
 * @returns {boolean} isAuthorized
 * */
export const authAdmin = async (): Promise<boolean> => {
	return authUser([RoleEnum.ADMIN]);
};

/**
 * Function to check if user is authorized as guest
 * @returns {boolean} isAuthorized
 * */
export const authGuest = async (): Promise<boolean> => {
	return authUser([RoleEnum.GUEST]);
};

/**
 * Function to check if user is logged
 * @returns {boolean} isLogged
 * */
export const isLogged = async (): Promise<boolean> => {
	const token = await getToken();
	if (token) {
		const user = await verifyToken(token);
		if (user) {
			return true;
		}
		return false;
	}
	return false;
};

/**
 * Function to get user from token
 * @returns {IUser | null} user
 * */
export const getUser = async (): Promise<IUser | null> => {
	const token = await getToken();
	if (token) {
		return await verifyToken(token);
	}
	return null;
};
