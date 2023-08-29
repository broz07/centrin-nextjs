'use client';
import { IWorkplanDefect, IWorkplanSelect } from '@centrin/types/workplans.dto';
import React, { createContext, useState, useContext } from 'react';

interface WorkplanContextType {
	selectedWorkplan: IWorkplanSelect | undefined;
	setSelectedWorkplan: React.Dispatch<
		React.SetStateAction<IWorkplanSelect | undefined>
	>;
	loadingData: boolean;
	setLoadingData: React.Dispatch<React.SetStateAction<boolean>>;
	workplanDefects: IWorkplanDefect[];
	setWorkplanDefects: React.Dispatch<React.SetStateAction<IWorkplanDefect[]>>;
	refreshFlag: boolean;
	setRefreshFlag: React.Dispatch<React.SetStateAction<boolean>>;
	refresh: () => void;
	selectedDefect: IWorkplanDefect | undefined;
	setSelectedDefect: React.Dispatch<
		React.SetStateAction<IWorkplanDefect | undefined>
	>;
}

const WorkplanContext = createContext<WorkplanContextType | undefined>(
	undefined,
);

export function useWorkplanContext(): WorkplanContextType {
	const context = useContext(WorkplanContext);
	if (!context) {
		throw new Error(
			'useWorkplanContext must be used within a WorkplanContextProvider',
		);
	}
	return context;
}

export function WorkplanContextProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	const [selectedWorkplan, setSelectedWorkplan] = useState<
		IWorkplanSelect | undefined
	>(undefined);
	const [loadingData, setLoadingData] = useState<boolean>(false);
	const [workplanDefects, setWorkplanDefects] = useState<IWorkplanDefect[]>([]);
	const [refreshFlag, setRefreshFlag] = useState<boolean>(false);
	const [selectedDefect, setSelectedDefect] = useState<
		IWorkplanDefect | undefined
	>(undefined);

	const refresh = () => {
		setRefreshFlag((prev) => !prev);
	};

	const value: WorkplanContextType = {
		selectedWorkplan,
		setSelectedWorkplan,
		loadingData,
		setLoadingData,
		workplanDefects,
		setWorkplanDefects,
		refreshFlag,
		setRefreshFlag,
		refresh,
		selectedDefect,
		setSelectedDefect,
	};

	return (
		<WorkplanContext.Provider value={value}>
			{children}
		</WorkplanContext.Provider>
	);
}
