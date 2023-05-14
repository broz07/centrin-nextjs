'use server';
import { IUser, RoleEnum, User } from '@centrin/types/User/User';
//import Cookies from 'js-cookie';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

const TOKEN_NAME = 'jwtToken';
const SECRET_KEY = 'secretKey';
// const TOKEN_TTL = 60 * 60 * 24 * 7; // 7 days
const TOKEN_TTL = 60 * 60 * 24; // 1 day

/**
 * Function to generate JWT token
 * @param {IUser} user
 * @returns {string} token
 * */
export const generateToken = async (user: IUser) : Promise<string> => {
  const token = jwt.sign(user, SECRET_KEY, { expiresIn: TOKEN_TTL });
  console.log('generateToken', token)
  return token;
};

/**
 * Function to verify JWT token
 * @param {string} token
 * @returns {IUser | null} user
 * */
export const verifyToken = async (token: string) : Promise<IUser | null> => {
  try {
    return jwt.verify(token, SECRET_KEY) as IUser;
  } catch (error) {
    return null;
  }
};

// /**
//  * Function to set JWT token to cookies
//  * @param {string} token
//  * */
// export const setToken = async (token: string): void => {
//   console.log('setToken', token)
//   Cookies.set(TOKEN_NAME, token);
// };

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
export const authUser = async (validRoles: RoleEnum[]) : Promise<boolean> => {
    const token = await await getToken();
    if (token) {
        const user = await verifyToken(token);
        if (user) {
            return validRoles.some(role => user.roles.includes(role));
        }
        return false;
    }
    return false;
}

/**
 * Function to check if user is authorized as admin
 * @returns {boolean} isAuthorized
 * */
export const authAdmin = async () : Promise<boolean> => {
    return authUser([RoleEnum.ADMIN]);
}

/**
 * Function to check if user is authorized as guest
 * @returns {boolean} isAuthorized
 * */
export const authGuest = async () : Promise<boolean> => {
    return authUser([RoleEnum.GUEST]);
}

/**
 * Function to check if user is logged
 * @returns {boolean} isLogged
 * */
export const isLogged = async () : Promise<boolean> => {
    const token = await getToken();
    if (token) {
        const user = await verifyToken(token);
        if (user) {
            return true;
        }
        return false;
    }
    return false;
}

/**
 * Function to get user from token
 * @returns {IUser | null} user
 * */
export const getUser = async () : Promise<IUser | null> => {
    const token = await getToken();
    if (token) {
        return verifyToken(token);
    }
    return null;
}