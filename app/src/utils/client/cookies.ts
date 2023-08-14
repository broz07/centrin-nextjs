import Cookies from 'js-cookie';

const TOKEN_NAME = 'jwtToken';
// const TOKEN_TTL = 60 * 60 * 24 * 7; // 7 days
const TOKEN_TTL = 60 * 60 * 24; // 1 day

/**
 * Function to set JWT token to cookies
 * @param {string} token
 * */
export const setToken = (token: string): void => {
	// console.log('setToken', token)
	Cookies.set(TOKEN_NAME, token);
};

/**
 * Function to get JWT token from cookies
 * @returns {string | undefined} token
 * */
export const getToken = (): string | undefined => {
	return Cookies.get(TOKEN_NAME);
};

/**
 * Function to remove JWT token from cookies
 * */
export const removeToken = (): void => {
	Cookies.remove(TOKEN_NAME);
};

/**
 * Function to set cookie to cookies
 * @param {string} key
 * @param {any} value
 * @param {number} ttl
 * */
export const setCookie = (key: string, value: any, ttl?: number): void => {
	if (!ttl) {
		Cookies.set(key, value);
		return;
	}
	Cookies.set(key, value, { expires: ttl });
};

/**
 * Function to get cookie from cookies
 * @param {string} key
 * @returns {any | string | undefined} cookie
 * */
export const getCookie = (key: string): any | string | undefined => {
	return Cookies.get(key);
};

/**
 * Function to remove cookie from cookies
 * @param {string} key
 * */
export const removeCookie = (key: string): void => {
	Cookies.remove(key);
};
