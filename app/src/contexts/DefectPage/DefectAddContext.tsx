'use client';
import { IDefectAdd, ISeverity } from '@centrin/types/defects.dto';
import {
	ICorridor,
	IOutdoorLocation,
	IRoom,
} from '@centrin/types/locations.dto';
import React, { createContext, useState, useContext } from 'react';

export type LocalityType = 'indoor' | 'outdoor';
export type IndoorLocationType = 'corridor' | 'room';

interface DefectAddContextType {
	activeStep: number;
	setActiveStep: React.Dispatch<React.SetStateAction<number>>;
	locality: LocalityType | undefined;
	setLocality: React.Dispatch<React.SetStateAction<LocalityType | undefined>>;
	outdoorLocations: IOutdoorLocation[] | undefined;
	setOutdoorLocations: React.Dispatch<
		React.SetStateAction<IOutdoorLocation[] | undefined>
	>;
	selectedLocation: IOutdoorLocation | ICorridor | IRoom | undefined;
	setSelectedLocation: React.Dispatch<
		React.SetStateAction<IOutdoorLocation | undefined>
	>;
	indoorLocationType: IndoorLocationType | undefined;
	setIndoorLocationType: React.Dispatch<
		React.SetStateAction<IndoorLocationType | undefined>
	>;
	corridors: ICorridor[] | undefined;
	setCorridors: React.Dispatch<React.SetStateAction<ICorridor[] | undefined>>;
	rooms: IRoom[] | undefined;
	setRooms: React.Dispatch<React.SetStateAction<IRoom[] | undefined>>;
	selectedBuildingId: number | undefined;
	setSelectedBuildingId: React.Dispatch<
		React.SetStateAction<number | undefined>
	>;
	selectedFloorId: number | undefined;
	setSelectedFloorId: React.Dispatch<React.SetStateAction<number | undefined>>;
	severities: ISeverity[] | undefined;
	setSeverities: React.Dispatch<React.SetStateAction<ISeverity[] | undefined>>;
	selectedTypeId: number | undefined;
	setSelectedTypeId: React.Dispatch<React.SetStateAction<number | undefined>>;
	selectedSeverityId: number | undefined;
	setSelectedSeverityId: React.Dispatch<
		React.SetStateAction<number | undefined>
	>;
	description: string | undefined;
	setDescription: React.Dispatch<React.SetStateAction<string | undefined>>;
	info: string | undefined;
	setInfo: React.Dispatch<React.SetStateAction<string | undefined>>;
	defectToAdd: IDefectAdd | undefined;
	setDefectToAdd: React.Dispatch<React.SetStateAction<IDefectAdd | undefined>>;
}

const DefectAddContext = createContext<DefectAddContextType | undefined>(
	undefined,
);

export function useDefectAddContext(): DefectAddContextType {
	const context = useContext(DefectAddContext);
	if (!context) {
		throw new Error(
			'useDefectAddContext must be used within a DefectAddContextProvider',
		);
	}
	return context;
}

export function DefectAddContextProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	const [activeStep, setActiveStep] = useState(0);
	const [locality, setLocality] = useState<LocalityType | undefined>(undefined);
	const [outdoorLocations, setOutdoorLocations] = useState<
		IOutdoorLocation[] | undefined
	>(undefined);
	const [selectedLocation, setSelectedLocation] = useState<
		IOutdoorLocation | ICorridor | IRoom | undefined
	>(undefined);
	const [indoorLocationType, setIndoorLocationType] = useState<
		IndoorLocationType | undefined
	>(undefined);
	const [corridors, setCorridors] = useState<ICorridor[] | undefined>(
		undefined,
	);
	const [rooms, setRooms] = useState<IRoom[] | undefined>(undefined);
	const [selectedBuildingId, setSelectedBuildingId] = useState<
		number | undefined
	>(undefined);
	const [selectedFloorId, setSelectedFloorId] = useState<number | undefined>(
		undefined,
	);
	const [severities, setSeverities] = useState<ISeverity[] | undefined>(
		undefined,
	);
	const [selectedTypeId, setSelectedTypeId] = useState<number | undefined>(
		undefined,
	);

	const [selectedSeverityId, setSelectedSeverityId] = useState<
		number | undefined
	>(undefined);
	const [description, setDescription] = useState<string | undefined>(undefined);
	const [info, setInfo] = useState<string | undefined>(undefined);
	const [defectToAdd, setDefectToAdd] = useState<IDefectAdd | undefined>(
		undefined,
	);

	const value: DefectAddContextType = {
		activeStep,
		setActiveStep,
		locality,
		setLocality,
		outdoorLocations,
		setOutdoorLocations,
		selectedLocation,
		setSelectedLocation,
		indoorLocationType,
		setIndoorLocationType,
		corridors,
		setCorridors,
		rooms,
		setRooms,
		selectedBuildingId,
		setSelectedBuildingId,
		selectedFloorId,
		setSelectedFloorId,
		severities,
		setSeverities,
		selectedTypeId,
		setSelectedTypeId,
		selectedSeverityId,
		setSelectedSeverityId,
		description,
		setDescription,
		info,
		setInfo,
		defectToAdd,
		setDefectToAdd,
	};

	return (
		<DefectAddContext.Provider value={value}>
			{children}
		</DefectAddContext.Provider>
	);
}
