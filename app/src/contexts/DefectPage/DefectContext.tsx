'use client';

import { IFullDefect } from '@centrin/types/defects.dto';
import React, { createContext, useState, useContext } from 'react';

interface DefectContextType {
	defects: IFullDefect[];
	setDefects: React.Dispatch<React.SetStateAction<IFullDefect[]>>;
	// selectedDefects: string[];
	// setSelectedDefects: React.Dispatch<React.SetStateAction<string[]>>;
	// isSelected: (id: string) => boolean;
	// selectDefect: (id: string) => void;
	// selectAllDefects: (event: React.ChangeEvent<HTMLInputElement>) => void;
	// resetSelected: () => void;
	refreshFlag: boolean;
	setRefreshFlag: React.Dispatch<React.SetStateAction<boolean>>;
	refresh: () => void;
	formatLocation: (defect: IFullDefect) => string;
	selectedDefect: IFullDefect | undefined;
	setSelectedDefect: React.Dispatch<
		React.SetStateAction<IFullDefect | undefined>
	>;
	loadingData: boolean;
	setLoadingData: React.Dispatch<React.SetStateAction<boolean>>;
}

const DefectContext = createContext<DefectContextType | undefined>(undefined);

export function useDefectContext(): DefectContextType {
	const context = useContext(DefectContext);
	if (!context) {
		throw new Error(
			'useDefectContext must be used within a DefectContextProvider',
		);
	}
	return context;
}

export function DefectContextProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	const [defects, setDefects] = useState<IFullDefect[]>([]);
	// const [selectedDefects, setSelectedDefects] = useState<string[]>([]);
	const [refreshFlag, setRefreshFlag] = useState<boolean>(false);
	const [selectedDefect, setSelectedDefect] = useState<IFullDefect | undefined>(
		undefined,
	);
	const [loadingData, setLoadingData] = useState<boolean>(false);
	// const isSelected = (id: string): boolean => {
	// 	return selectedDefects.includes(id);
	// };

	// const selectDefect = (id: string) => {
	// 	const selectedIndex = selectedDefects.indexOf(id);
	// 	let newSelected: string[] = [];

	// 	if (selectedIndex === -1) {
	// 		newSelected = newSelected.concat(selectedDefects, id);
	// 	} else if (selectedIndex === 0) {
	// 		newSelected = newSelected.concat(selectedDefects.slice(1));
	// 	} else if (selectedIndex === selectedDefects.length - 1) {
	// 		newSelected = newSelected.concat(selectedDefects.slice(0, -1));
	// 	} else if (selectedIndex > 0) {
	// 		newSelected = newSelected.concat(
	// 			selectedDefects.slice(0, selectedIndex),
	// 			selectedDefects.slice(selectedIndex + 1),
	// 		);
	// 	}

	// 	setSelectedDefects(newSelected);
	// };

	// const selectAllDefects = (event: React.ChangeEvent<HTMLInputElement>) => {
	// 	if (event.target.checked) {
	// 		const newSelecteds = defects.map((n) => n.id.toString());
	// 		setSelectedDefects(newSelecteds as string[]);
	// 		return;
	// 	}
	// 	setSelectedDefects([]);
	// };

	// const resetSelected = () => {
	// 	setSelectedDefects([]);
	// };

	const refresh = () => {
		setRefreshFlag((prev) => !prev);
	};

	const formatLocation = (defect: IFullDefect): string => {
		if (defect.outdoor_id)
			return `${defect.outdoor_name} ${
				defect.outdoor_description ? `(${defect.outdoor_description})` : ''
			}`;
		if (defect.corridor_id)
			return `${defect.building_name} - ${defect.floor_name} - ${defect.corridor_name}`;
		if (defect.room_id)
			return `${defect.building_name} - ${defect.floor_name} - ${defect.room_name}`;
		return '';
	};

	const value: DefectContextType = {
		defects,
		setDefects,
		// selectedDefects: selectedDefects,
		// setSelectedDefects: setSelectedDefects,
		// isSelected,
		// selectDefect,
		// selectAllDefects,
		// resetSelected,
		refreshFlag,
		setRefreshFlag,
		refresh,
		formatLocation,
		selectedDefect,
		setSelectedDefect,
		loadingData,
		setLoadingData,
	};

	return (
		<DefectContext.Provider value={value}>{children}</DefectContext.Provider>
	);
}
