'use client';

import React, { createContext, useState, useContext } from 'react';

interface IContentType {
	content: string;
	description: string;
}

export const userContent: IContentType = {
	content: 'users',
	description: 'Správa uživatelů',
};

export const planContent: IContentType = {
	content: 'plans',
	description: 'Správa týdenních plánů',
};

export const statsContent: IContentType = {
	content: 'stats',
	description: 'Uživatelské statistiky',
};

interface AdminPageContextType {
	contentType: IContentType;
	setContentType: React.Dispatch<React.SetStateAction<IContentType>>;
	refreshFlag: boolean;
	setRefreshFlag: React.Dispatch<React.SetStateAction<boolean>>;
	refresh: () => void;
}

const AdminPageContext = createContext<AdminPageContextType | undefined>(
	undefined,
);

export function useAdminPageContext(): AdminPageContextType {
	const context = useContext(AdminPageContext);
	if (!context) {
		throw new Error(
			'useAdminPageContext must be used within a AdminPageContextProvider',
		);
	}
	return context;
}

export function AdminPageContextProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	const [contentType, setContentType] = useState<IContentType>(userContent);
	const [refreshFlag, setRefreshFlag] = useState<boolean>(false);

	const refresh = () => {
		setRefreshFlag((prev) => !prev);
	};

	const value: AdminPageContextType = {
		contentType,
		setContentType,
		refreshFlag,
		setRefreshFlag,
		refresh,
	};

	return (
		<AdminPageContext.Provider value={value}>
			{children}
		</AdminPageContext.Provider>
	);
}
