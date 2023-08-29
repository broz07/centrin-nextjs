'use client';

import { useDefectAddContext } from '@centrin/contexts/DefectPage/DefectAddContext';
import { useUserContext } from '@centrin/contexts/UserContext';
import { RoleEnum } from '@centrin/types/users.dto';
import {
	NotificationPosition,
	NotificationType,
	notify,
} from '@centrin/utils/client/notify';
import { getSeverities } from '@centrin/utils/server/defects';
import {
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	Stack,
	TextField,
} from '@mui/material';
import { useEffect } from 'react';

const InfoSelect: React.FC = () => {
	const {
		selectedLocation,
		severities,
		setSeverities,
		description,
		setDescription,
		info,
		setInfo,
		selectedTypeId,
		setSelectedTypeId,
		selectedSeverityId,
		setSelectedSeverityId,
	} = useDefectAddContext();

	const { user } = useUserContext();

	useEffect(() => {
		const fetchSeverities = async () => {
			const fetchedSeverities = await getSeverities();

			if (!fetchedSeverities) {
				notify(
					'Nepodařilo se načíst seznam závažností',
					NotificationType.ERROR,
					NotificationPosition.BR,
					3000,
				);
				return;
			}
			setSeverities(fetchedSeverities);
		};

		fetchSeverities();
	}, [setSeverities]);

	return (
		<Stack
			spacing={2}
			sx={{
				width: '100%',
				maxWidth: '400px',
			}}
		>
			<TextField
				fullWidth
				required
				label="Stručný popis (max. 40 znaků)"
				placeholder='Např. "Rozbité okno"'
				value={description || ''}
				onChange={(e) => {
					if (e.target.value.length <= 40) {
						setDescription(e.target.value);
					}
				}}
				error={
					description
						? description.trim() === '' || description.length > 40
						: false
				}
				color={
					description
						? description.length == 40
							? 'warning'
							: 'success'
						: 'error'
				}
				helperText={
					description && description.trim() !== ''
						? description.length == 40
							? 'Dosáhli jste maximální délky! (40/40)'
							: `${description.length}/40`
						: 'Stručný popis je povinný!'
				}
			/>
			<TextField
				fullWidth
				label="Podrobný popis"
				multiline
				rows={4}
				value={info || ''}
				onChange={(e) => {
					setInfo(e.target.value);
				}}
			/>
			<FormControl fullWidth>
				<InputLabel id="defect-type-select">Typ závady</InputLabel>
				<Select
					id="defect-type-select"
					label="Typ závady"
					value={selectedTypeId || ''}
					onChange={(e) => {
						setSelectedTypeId(e.target.value as number);
					}}
				>
					<MenuItem value={3}>Závada</MenuItem>
					<MenuItem value={2}>Úklid</MenuItem>
					{user &&
						[RoleEnum.ADMIN, RoleEnum.MANAGER].includes(user.role.id) && (
							<MenuItem value={1}>Pravidelná údržba</MenuItem>
						)}
					{user &&
						[RoleEnum.ADMIN, RoleEnum.MANAGER].includes(user.role.id) && (
							<MenuItem value={4}>Plánovaná práce</MenuItem>
						)}
				</Select>
			</FormControl>
			<FormControl fullWidth>
				<InputLabel id="defect-severity-select">Závažnost závady</InputLabel>
				<Select
					id="defect-severity-select"
					label="Závažnost závady"
					value={selectedSeverityId || ''}
					onChange={(e) => {
						setSelectedSeverityId(e.target.value as number);
					}}
				>
					{severities?.map((severity) => (
						<MenuItem key={severity.id} value={severity.id}>
							{severity.name}
						</MenuItem>
					))}
				</Select>
			</FormControl>
		</Stack>
	);
};

export default InfoSelect;
