'use client';
import {
	ICorridor,
	IOutdoorLocation,
	IRoom,
} from '@centrin/types/locations.dto';
import React, { createContext, useState, useContext } from 'react';

type LocalityType = 'indoor' | 'outdoor';
type IndoorLocationType = 'corridor' | 'room';

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
		IOutdoorLocation | undefined
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
	};

	return (
		<DefectAddContext.Provider value={value}>
			{children}
		</DefectAddContext.Provider>
	);
}
