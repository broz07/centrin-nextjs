'use server';
import pool from './db';
import { IGetUsersQuery, IQueryUser, IUser, IUserAdd, RoleEnum } from '@centrin/types/User/User';
import { hashPassword } from './auth';


export const getUsers = async (): Promise<IUser[]> => {
  const client = await pool.connect();
  const query = 'SELECT users.id as id, users.name, users.surname, users.username, users.email, users.role_id, roles.name as role_name, roles.description as role_desc FROM centrin.users AS users JOIN centrin.roles AS roles ON users.role_id=roles.id;';
  const result = await client.query<IGetUsersQuery>(query);
  const data = result.rows;
  client.release();

  const users: IUser[] = data.map((user) => {
    return {
      id: user.id,
      name: user.name,
      surname: user.surname,
      username: user.username,
      email: user.email,
      displayName: `${user.name} ${user.surname}`,
      role: {
        id: user.role_id,
        name: user.role_name,
        description: user.role_desc,
      },
    };
  });

  return users;
}

export const addUser = async (user: IUserAdd, role: RoleEnum = RoleEnum.USER): Promise<boolean> => {
  const client = await pool.connect(); 
  const query = `INSERT INTO centrin.users (name, surname, username, email, password, role_id) VALUES ('${user.name}', '${user.surname}', '${user.username}', '${user.email}', '${hashPassword(user.password)}', ${role});`;
  try {
    await client.query(query);
    client.release();
    return true;
  } catch (err) {
    console.error(err);
    return false; 
  }
};

export const deleteUser = async (id: number): Promise<boolean> => {
  const client = await pool.connect();
  const query = `DELETE FROM centrin.users WHERE id=${id};`;

  try {
    await client.query(query);
    client.release();
    return true;
  }
  catch (err) {
    console.error(err);
  }

  return false;
}

export const updateUser = async (id: number, user: IUser): Promise<boolean> => {
  const client = await pool.connect();
  const query = `UPDATE centrin.users SET name='${user.name}', surname='${user.surname}', username='${user.username}', email='${user.email}', role_id=${user.role.id} WHERE id=${id};`;

  try {
    await client.query(query);
    client.release();
    return true;
  }
  catch (err) {
    console.error(err);
  }

  return false;
};

export const getUser = async (id: number): Promise<IUser | null> => {
  const client = await pool.connect();
  const query =  `SELECT users.id AS id, users.name AS name, users.surname AS surname, users.username AS username, users.email AS email, users.role_id AS role_id, roles.name AS role_name, roles.description AS role_desc FROM centrin.users AS users JOIN centrin.roles AS roles ON users.role_id=roles.id WHERE users.id=${id};`;
  const result = await client.query<IQueryUser>(query);
  const data = result.rows[0];
  client.release();

  if (!data) {
    return null;
  }

  const user: IUser = {
    id: data.id,
    name: data.name,
    surname: data.surname,
    username: data.username,
    email: data.email,
    displayName: `${data.name} ${data.surname}`,
    role: {
      id: data.role_id,
      name: data.role_name,
      description: data.role_desc,
    },
  };

  return user;
};

export const resetUserPassword = async (id: number, password: string): Promise<boolean> => {
  const client = await pool.connect();
  const query = `UPDATE centrin.users SET password='${hashPassword(password)}' WHERE id=${id};`;

  try {
    await client.query(query);
    client.release();
    return true;
  }
  catch (err) {
    console.error(err);
  }

  return false;
}

