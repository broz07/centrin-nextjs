'use client';

import {
	AppBar,
	Box,
	Button,
	Checkbox,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	IconButton,
	Paper,
	Slide,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableFooter,
	TableHead,
	TableRow,
	Toolbar,
	Typography,
} from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import React, { useEffect, useState } from 'react';
import { useWorkplanContext } from '@centrin/contexts/WorkplanPage/WorkplanContext';
import {
	formatDate,
	formatLocation,
	getformatedDateRange,
} from '@centrin/utils/workplan';
import Image from 'next/image';
import { IFullDefect } from '@centrin/types/defects.dto';
import {
	addDefectsToWorkplan,
	getAvailableDefects,
} from '@centrin/utils/server/workplan';
import {
	NotificationPosition,
	NotificationType,
	loadToast,
	notify,
	updateToast,
} from '@centrin/utils/client/notify';
import { LoadingButton } from '@mui/lab';
import PongLoader from '@centrin/components/loaders/PongLoader';

interface Props {
	open: boolean;
	close: () => void;
}

const Transition = React.forwardRef(function Transition(
	props: TransitionProps & {
		children: React.ReactElement;
	},
	ref: React.Ref<unknown>,
) {
	return <Slide direction="up" ref={ref} {...props} />;
});

const AddToWorkplanDialog: React.FC<Props> = ({ open, close }) => {
	const { selectedWorkplan, refresh, workplanDefects } = useWorkplanContext();

	const [availableDefects, setAvailableDefects] = useState<IFullDefect[]>([]);
	const [selectedDefects, setSelectedDefects] = useState<string[]>([]);
	const [loadingData, setLoadingData] = useState<boolean>(false);
	const [loadingButton, setLoadingButton] = useState<boolean>(false);

	const isSelected = (id: string): boolean => {
		return selectedDefects.includes(id);
	};

	const selectDefect = (id: string) => {
		const selectedIndex = selectedDefects.indexOf(id);
		let newSelected: string[] = [];

		if (selectedIndex === -1) {
			newSelected = newSelected.concat(selectedDefects, id);
		} else if (selectedIndex === 0) {
			newSelected = newSelected.concat(selectedDefects.slice(1));
		} else if (selectedIndex === selectedDefects.length - 1) {
			newSelected = newSelected.concat(selectedDefects.slice(0, -1));
		} else if (selectedIndex > 0) {
			newSelected = newSelected.concat(
				selectedDefects.slice(0, selectedIndex),
				selectedDefects.slice(selectedIndex + 1),
			);
		}

		setSelectedDefects(newSelected);
	};

	const selectAllDefects = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.checked) {
			const newSelecteds = availableDefects.map((n) => n.id.toString());
			setSelectedDefects(newSelecteds as string[]);
			return;
		}
		setSelectedDefects([]);
	};

	const resetSelected = () => {
		setSelectedDefects([]);
	};

	const closeDialog = () => {
		refresh();
		setLoadingButton(false);
		setLoadingData(false);
		resetSelected();
		setAvailableDefects([]);
		close();
	};

	useEffect(() => {
		if (!open) return;
		const fetchAvaliableDefects = async () => {
			setLoadingData(true);
			const fetchedDefects = await getAvailableDefects();

			if (!fetchedDefects) {
				notify(
					'Nepodařilo se načíst data o závadách! 🤕',
					NotificationType.ERROR,
					NotificationPosition.BR,
					3000,
				);
				closeDialog();
			} else {
				setAvailableDefects(fetchedDefects);
			}
			setLoadingData(false);
			// console.log(fetchedDefects);
		};
		fetchAvaliableDefects();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [close, open]);

	const handleSave = async () => {
		if (!selectedWorkplan) return;

		setLoadingButton(true);
		const toast = loadToast('Přidávám závady do týdenního plánu...');

		const selectedConverted = selectedDefects.map((id) => parseInt(id));

		const saved = await addDefectsToWorkplan(
			selectedConverted,
			selectedWorkplan,
		);

		if (!saved) {
			updateToast(
				toast,
				'Nepodařilo se přidat závady do týdenního plánu! 🤕',
				NotificationType.ERROR,
				NotificationPosition.BR,
				3000,
			);
		} else {
			updateToast(
				toast,
				'Závady byly úspěšně přidány do týdenního plánu! 🎉',
				NotificationType.SUCCESS,
				NotificationPosition.BR,
				3000,
			);
		}

		closeDialog();
	};

	return (
		<Dialog
			open={open}
			onClose={closeDialog}
			fullScreen
			TransitionComponent={Transition}
		>
			<AppBar
				sx={{
					position: 'relative',
					backgroundColor: '#31308e',
				}}
			>
				<Toolbar>
					<IconButton
						edge="start"
						color="inherit"
						onClick={closeDialog}
						aria-label="close"
					>
						<CloseIcon />
					</IconButton>
					<Typography
						variant="h6"
						component="div"
						sx={{ ml: 2, flex: 1, fontWeight: 'bold' }}
					>
						Přidat závadu do týdenního plánu
					</Typography>
					<Box
						sx={{
							marginRight: '1rem',
						}}
					>
						<b>Vybraný týden:</b>
						{` ${selectedWorkplan && getformatedDateRange(selectedWorkplan)}`}
					</Box>
				</Toolbar>
			</AppBar>
			<TableContainer
				component={Paper}
				square
				sx={{
					height: '100%',
				}}
			>
				{loadingData ? (
					<Box
						sx={{
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
							justifyContent: 'center',
							height: '100%',
							width: '100%',
							backgroundColor: 'rgba(0, 0, 0, 0.5)',
						}}
					>
						<PongLoader />
					</Box>
				) : (
					<>
						{availableDefects.filter(
							(defect) =>
								!workplanDefects.some(
									(workplanDefect) => workplanDefect.id === defect.id,
								),
						).length > 0 ? (
							<Table
								stickyHeader
								sx={{
									td: {
										textAlign: 'center',
										overflow: 'hidden',
										fontFamily: 'inherit',
										padding: '0.4rem 0.8rem',
									},
									th: {
										fontWeight: 'bold',
										textAlign: 'center',
										fontFamily: 'inherit',
									},
								}}
							>
								<TableHead>
									<TableRow>
										<TableCell padding="checkbox">
											<Checkbox
												indeterminate={
													selectedDefects.length > 0 &&
													selectedDefects.length < availableDefects.length
												}
												checked={
													availableDefects.length > 0 &&
													selectedDefects.length === availableDefects.length
												}
												onChange={selectAllDefects}
											/>
										</TableCell>
										<TableCell>Čas zápisu</TableCell>
										<TableCell>Popis závady</TableCell>
										<TableCell>Umístění</TableCell>
										<TableCell>Stav</TableCell>
										<TableCell>Typ</TableCell>
										<TableCell>Zapsal(a)</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{availableDefects
										.filter(
											(defect) =>
												!workplanDefects.some(
													(workplanDefect) => workplanDefect.id === defect.id,
												),
										)

										.map((defect) => (
											<TableRow
												hover
												key={defect.id}
												onClick={() => selectDefect(defect.id.toString())}
												role="checkbox"
												aria-checked={isSelected(defect.id.toString())}
												tabIndex={-1}
												selected={isSelected(defect.id.toString())}
											>
												<TableCell padding="checkbox">
													<Checkbox
														checked={isSelected(defect.id.toString())}
														inputProps={{
															'aria-labelledby': defect.id.toString(),
														}}
													/>
												</TableCell>
												<TableCell>{`${formatDate(
													defect.start_time,
												)}`}</TableCell>
												<TableCell>{defect.description}</TableCell>
												<TableCell>{formatLocation(defect)}</TableCell>
												<TableCell>{defect.state_description}</TableCell>
												<TableCell>{defect.type_name}</TableCell>
												<TableCell>{`${defect.created_by_name} ${defect.created_by_surname}`}</TableCell>
											</TableRow>
										))}
								</TableBody>
							</Table>
						) : (
							<Box
								sx={{
									display: 'flex',
									flexDirection: 'column',
									alignItems: 'center',
									justifyContent: 'center',
									height: '100%',
									width: '100%',
								}}
							>
								<Image
									src="/assets/undraw_empty.svg"
									width={500}
									height={500}
									alt="Picture of the author"
								/>
								<span
									style={{
										fontSize: '1.5rem',
										fontWeight: 500,
										color: '#9e9e9e',
									}}
								>
									Žádné další závady k přiřazení!
								</span>
								<Button
									variant="contained"
									startIcon={<AddIcon />}
									href="/defects/add"
									sx={{
										marginTop: '1rem',
									}}
								>
									Vytvořit novou závadu
								</Button>
							</Box>
						)}
					</>
				)}
			</TableContainer>
			<LoadingButton
				loading={loadingButton}
				loadingPosition="center"
				variant="contained"
				startIcon={<PlaylistAddIcon />}
				disabled={selectedDefects.length === 0}
				onClick={handleSave}
			>
				Přidat závady to týdenního plánu
			</LoadingButton>
		</Dialog>
	);
};

export default AddToWorkplanDialog;
