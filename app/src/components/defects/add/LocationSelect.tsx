'use client';

import { useDefectAddContext } from '@centrin/contexts/DefectPage/DefectAddContext';
import {
	NotificationPosition,
	NotificationType,
	notify,
} from '@centrin/utils/client/notify';
import {
	getCorridorLocations,
	getOutdoorLocations,
	getRoomLocations,
} from '@centrin/utils/server/locations';
import {
	Box,
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	SelectChangeEvent,
	Stack,
} from '@mui/material';
import { useEffect } from 'react';

const LocationSelect: React.FC = () => {
	const {
		locality,
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
	} = useDefectAddContext();

	useEffect(() => {
		if (locality === 'outdoor') {
			setCorridors(undefined);
			setRooms(undefined);
			setSelectedBuildingId(undefined);
			setSelectedFloorId(undefined);

			const fetchOutdoorLocations = async () => {
				const locations = await getOutdoorLocations();

				if (locations) {
					console.log(locations);
					setOutdoorLocations(locations);
				} else {
					setOutdoorLocations(undefined);
					notify(
						'Nepodařilo se načíst seznam lokalit',
						NotificationType.ERROR,
						NotificationPosition.BR,
						2000,
					);
				}
			};
			fetchOutdoorLocations();
		} else {
			const fetchIndoorLocations = async () => {
				// setSelectedBuildingId(undefined);
				// setSelectedFloorId(undefined);
				// setSelectedLocation(undefined);
				setOutdoorLocations(undefined);

				if (!indoorLocationType) {
					setCorridors(undefined);
					setRooms(undefined);
					setSelectedBuildingId(undefined);
					setSelectedFloorId(undefined);
					return;
				}

				if (indoorLocationType === 'corridor') {
					setRooms(undefined);
					const fetchedCorridors = await getCorridorLocations();

					if (fetchedCorridors) {
						console.log(fetchedCorridors);
						setCorridors(fetchedCorridors);
					} else {
						setCorridors(undefined);
						notify(
							'Nepodařilo se načíst seznam chodeb',
							NotificationType.ERROR,
							NotificationPosition.BR,
							2000,
						);
					}
				}

				if (indoorLocationType === 'room') {
					setCorridors(undefined);
					const fetchedRooms = await getRoomLocations();

					if (fetchedRooms) {
						console.log(fetchedRooms);
						setRooms(fetchedRooms);
					} else {
						setRooms(undefined);
						notify(
							'Nepodařilo se načíst seznam místností',
							NotificationType.ERROR,
							NotificationPosition.BR,
							2000,
						);
					}
				}
			};
			fetchIndoorLocations();
		}
	}, [
		indoorLocationType,
		locality,
		setCorridors,
		setOutdoorLocations,
		setRooms,
		setSelectedBuildingId,
		setSelectedFloorId,
		setSelectedLocation,
	]);

	const handleIndoorSelectChange = (event: SelectChangeEvent) => {
		setSelectedLocation(undefined);
		setSelectedBuildingId(undefined);
		setSelectedFloorId(undefined);

		if (event.target.value === 'corridor') {
			setIndoorLocationType('corridor');
		}

		if (event.target.value === 'room') {
			setIndoorLocationType('room');
		}
	};

	return (
		<div>
			{locality && locality === 'outdoor' ? (
				<Box sx={{ minWidth: 300 }}>
					<FormControl fullWidth>
						<InputLabel id="outdoor-location-select">
							Vyberte lokalitu
						</InputLabel>
						<Select
							id="outdoor-location-select"
							label="Vyberte lokalitu"
							value={selectedLocation?.id.toString() || ''}
							// onChange={handleOutdoorSelectChange}
						>
							{outdoorLocations?.map((location) => (
								<MenuItem
									key={location.id}
									value={location.id.toString()}
									onClick={() => setSelectedLocation(location)}
								>
									{location.name}
								</MenuItem>
							))}
						</Select>
					</FormControl>
				</Box>
			) : (
				<Stack sx={{ minWidth: 500 }} spacing={2}>
					<FormControl fullWidth>
						<InputLabel id="indoor-type-select">
							Vyberte typ prostoru
						</InputLabel>
						<Select
							id="indoor-type-select"
							label="Vyberte typ prostoru"
							onChange={handleIndoorSelectChange}
							value={indoorLocationType || ''}
						>
							<MenuItem key="corridor" value="corridor">
								Chodba
							</MenuItem>
							<MenuItem key="room" value="room">
								Místnost
							</MenuItem>
						</Select>
					</FormControl>
					{indoorLocationType && (
						<FormControl fullWidth>
							<InputLabel id="building-select">Vyberte budovu</InputLabel>
							<Select
								id="building-select"
								label="Vyberte budovu"
								value={selectedBuildingId || ''}
							>
								{corridors
									?.filter(
										(corridor, index, self) =>
											index ===
											self.findIndex(
												(c) => c.building_id === corridor.building_id,
											),
									)
									.map((corridor) => {
										return (
											<MenuItem
												key={corridor.building_id}
												value={corridor.building_id}
												onClick={() => {
													setSelectedBuildingId(corridor.building_id);
													setSelectedFloorId(undefined);
													setSelectedLocation(undefined);
												}}
											>
												{corridor.building_name}
											</MenuItem>
										);
									})}
								{rooms
									?.filter(
										(room, index, self) =>
											index ===
											self.findIndex((c) => c.building_id === room.building_id),
									)
									.map((room) => {
										return (
											<MenuItem
												key={room.building_id}
												value={room.building_id}
												onClick={() => {
													setSelectedBuildingId(room.building_id);
													setSelectedFloorId(undefined);
													setSelectedLocation(undefined);
												}}
											>
												{room.building_name}
											</MenuItem>
										);
									})}
							</Select>
						</FormControl>
					)}
					{selectedBuildingId && (
						<FormControl fullWidth>
							<InputLabel id="floor-select">Vyberte patro</InputLabel>
							<Select
								id="floor-select"
								label="Vyberte umístění"
								value={selectedFloorId || ''}
							>
								{corridors
									?.filter(
										(corridor, index, self) =>
											index ===
												self.findIndex(
													(c) => c.floor_id === corridor.floor_id,
												) && corridor.building_id === selectedBuildingId,
									)
									.sort((a, b) => a.floor_name.localeCompare(b.floor_name))
									.map((corridor) => {
										return (
											<MenuItem
												key={corridor.floor_id}
												value={corridor.floor_id}
												onClick={() => {
													setSelectedFloorId(corridor.floor_id);
													setSelectedLocation(undefined);
												}}
											>
												{corridor.floor_name}
											</MenuItem>
										);
									})}
								{rooms
									?.filter(
										(room, index, self) =>
											index ===
												self.findIndex((c) => c.floor_id === room.floor_id) &&
											room.building_id === selectedBuildingId,
									)
									.sort((a, b) => a.floor_name.localeCompare(b.floor_name))
									.map((room) => {
										return (
											<MenuItem
												key={room.floor_id}
												value={room.floor_id}
												onClick={() => {
													setSelectedFloorId(room.floor_id);
													setSelectedLocation(undefined);
												}}
											>
												{room.floor_name}
											</MenuItem>
										);
									})}
							</Select>
						</FormControl>
					)}
					{selectedFloorId && (
						<FormControl fullWidth>
							<InputLabel id="place-select">Vyberte místo</InputLabel>
							<Select
								id="place-select"
								label="Vyberte místo"
								value={selectedLocation?.id.toString() || ''}
							>
								{corridors
									?.filter(
										(corridor) =>
											corridor.floor_id === selectedFloorId &&
											corridor.building_id === selectedBuildingId,
									)
									.map((corridor) => {
										return (
											<MenuItem
												key={corridor.id}
												value={corridor.id.toString()}
												onClick={() => setSelectedLocation(corridor)}
											>
												{corridor.name}
											</MenuItem>
										);
									})}
								{rooms
									?.filter(
										(room) =>
											room.floor_id === selectedFloorId &&
											room.building_id === selectedBuildingId,
									)
									.map((room) => {
										return (
											<MenuItem
												key={room.id}
												value={room.id.toString()}
												onClick={() => setSelectedLocation(room)}
											>
												{room.name}
											</MenuItem>
										);
									})}
							</Select>
						</FormControl>
					)}
				</Stack>
			)}
		</div>
	);
};

export default LocationSelect;
