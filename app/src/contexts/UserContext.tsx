'use client';

import { IUser } from '@centrin/types/users.dto';
import React, { createContext, useState, useContext } from 'react';

interface UserContextType {
	user?: IUser;
	setUser: React.Dispatch<React.SetStateAction<IUser | undefined>>;
}
const UserContext = createContext<UserContextType | undefined>(undefined);

export function useUserContext(): UserContextType {
	const context = useContext(UserContext);
	if (!context) {
		throw new Error('useUserContext must be used within a UserContextProvider');
	}
	return context;
}

export function UserContextProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	const [user, setUser] = useState<IUser | undefined>(undefined);

	const value: UserContextType = {
		user,
		setUser,
	};

	return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
