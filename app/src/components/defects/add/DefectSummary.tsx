'use client';

import {
	IndoorLocationType,
	useDefectAddContext,
} from '@centrin/contexts/DefectPage/DefectAddContext';
import { useUserContext } from '@centrin/contexts/UserContext';
import { IDefectAdd } from '@centrin/types/defects.dto';
import { ICorridor, IRoom } from '@centrin/types/locations.dto';
import { notify } from '@centrin/utils/client/notify';
import { Grid, Stack, TextField } from '@mui/material';

import { useEffect } from 'react';

const DefectSummary: React.FC = () => {
	const { user } = useUserContext();
	const {
		selectedLocation,
		selectedTypeId,
		selectedSeverityId,
		description,
		info,
		locality,
		indoorLocationType,
		defectToAdd,
		setDefectToAdd,
		severities,
	} = useDefectAddContext();

	useEffect(() => {
		if (!user || !selectedLocation || !description) {
			// notify("Neni uživatel, lokace nebo popis")
			return;
		}

		if (!locality) {
			// notify("Neni lokalita")
			return;
		}

		if (locality === 'indoor' && !indoorLocationType) {
			// notify("Neni typ lokace")
			return;
		}

		const defect: IDefectAdd = {
			description: description,
			info: info,
			severity_id: selectedSeverityId,
			type_id: selectedTypeId,
			created_by: user.id,
			location: selectedLocation,
			location_type:
				locality === 'indoor'
					? (indoorLocationType as IndoorLocationType)
					: locality,
		};

		// console.log(defect);
		setDefectToAdd(defect);
	}, [
		description,
		indoorLocationType,
		info,
		locality,
		selectedLocation,
		selectedSeverityId,
		selectedTypeId,
		setDefectToAdd,
		user,
	]);

	const getBuilding = (defect: IDefectAdd) => {
		const location = defect.location as IRoom | ICorridor;
		return location.building_name;
	};

	const getFloor = (defect: IDefectAdd) => {
		const location = defect.location as IRoom | ICorridor;
		return location.floor_name;
	};

	const getSeverityName = (defect: IDefectAdd) => {
		if (!defect.severity_id) {
			return severities?.find((s) => s.id === 1)?.name;
		}

		const severity = severities?.find((s) => s.id === defect.severity_id);
		return severity?.name;
	};

	return (
		<>
			{defectToAdd ? (
				<Stack
					spacing={2}
					height="100%"
					maxWidth="600px"
					width="100%"
					padding={2}
					justifyContent="center"
					alignItems="center"
				>
					<h1>Rekapitulace závady</h1>
					<TextField
						label="Popis závady"
						value={defectToAdd.description}
						disabled
						fullWidth
					/>
					<TextField
						label="Detailní popis závady"
						value={defectToAdd.info || 'Bez popisu'}
						disabled
						multiline
						rows={4}
						fullWidth
					/>
					{/* <TextField
						label="Lokalita"
						disabled
						fullWidth
						value={formatLocation(defectToAdd)}
					/> */}
					{defectToAdd.location_type === 'outdoor' ? (
						<TextField
							fullWidth
							disabled
							label="Lokalita"
							value={defectToAdd.location.name}
						/>
					) : (
						<Grid
							container
							// spacing={2}
							width="100%"
						>
							<Grid
								item
								xs={4}
								sx={{
									padding: '0 !important',
								}}
							>
								<TextField
									fullWidth
									label="Budova"
									value={getBuilding(defectToAdd)}
									disabled
								/>
							</Grid>
							<Grid
								item
								xs={4}
								sx={{
									padding: '0 0 0 16px !important',
								}}
							>
								<TextField
									fullWidth
									label="Patro"
									value={getFloor(defectToAdd)}
									disabled
								/>
							</Grid>
							<Grid
								item
								xs={4}
								sx={{
									padding: '0 0 0 16px !important',
								}}
							>
								<TextField
									fullWidth
									label="Místo"
									value={defectToAdd.location.name}
									disabled
								/>
							</Grid>
						</Grid>
					)}
					<Grid container width="100%">
						<Grid item xs={6}>
							<TextField
								fullWidth
								label="Typ závady"
								value={
									defectToAdd.type_id
										? defectToAdd.type_id === 2
											? 'Úklid'
											: 'Závada'
										: 'Závada'
								}
								disabled
							/>
						</Grid>
						<Grid
							item
							xs={6}
							sx={{
								padding: '0 0 0 16px !important',
							}}
						>
							<TextField
								fullWidth
								label="Závažnost"
								value={getSeverityName(defectToAdd)}
								disabled
							/>
						</Grid>
					</Grid>
				</Stack>
			) : null}
		</>
	);
};

export default DefectSummary;
