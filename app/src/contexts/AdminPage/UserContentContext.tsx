'use client';

import { IUser } from '@centrin/types/users';
import React, { createContext, useState, useContext } from 'react';

interface UserContentContextType {
	users: IUser[];
	setUsers: React.Dispatch<React.SetStateAction<IUser[]>>;
	refreshFlag: boolean;
	setRefreshFlag: React.Dispatch<React.SetStateAction<boolean>>;
	refresh: () => void;
	addUserOpen: boolean;
	setAddUserOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const UserContentContext = createContext<UserContentContextType | undefined>(
	undefined,
);

export function useUserContentContext(): UserContentContextType {
	const context = useContext(UserContentContext);
	if (!context) {
		throw new Error(
			'useUserContentContext must be used within a UserContentContextProvider',
		);
	}
	return context;
}

export function UserContentContextProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	const [users, setUsers] = useState<IUser[]>([]);
	const [refreshFlag, setRefreshFlag] = useState<boolean>(false);
	const [addUserOpen, setAddUserOpen] = useState<boolean>(false);

	const refresh = () => {
		setRefreshFlag((prev) => !prev);
	};

	const value: UserContentContextType = {
		users,
		setUsers,
		refreshFlag,
		setRefreshFlag,
		refresh,
		addUserOpen,
		setAddUserOpen,
	};

	return (
		<UserContentContext.Provider value={value}>
			{children}
		</UserContentContext.Provider>
	);
}
