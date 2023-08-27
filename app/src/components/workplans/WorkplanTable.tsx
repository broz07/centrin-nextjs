'use client';

import { useWorkplanContext } from '@centrin/contexts/WorkplanPage/WorkplanContext';
import {
	Box,
	Button,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Toolbar,
	Tooltip,
	Typography,
} from '@mui/material';
import PongLoader from '../loaders/PongLoader';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import AddIcon from '@mui/icons-material/Add';
import Image from 'next/image';

import styles from '@centrin/styles/workplans/workplans.module.scss';
import {
	formatDate,
	formatLocation,
	getformatedDateRange,
} from '@centrin/utils/workplan';

interface Props {
	openAddDialog: () => void;
}

const WorkplanTable: React.FC<Props> = ({ openAddDialog }) => {
	const { selectedWorkplan, loadingData, workplanDefects, refreshFlag } =
		useWorkplanContext();

	return (
		<Paper
			sx={{
				height: '100%',
			}}
		>
			<Toolbar
				variant="dense"
				sx={{
					height: '50px !important',
					padding: '0 1rem',
					backgroundColor: '#303030',
					color: '#f6f6f6',

					h3: {
						flex: '1 1 100%',
					},
				}}
			>
				<h3>
					{` ${selectedWorkplan && getformatedDateRange(selectedWorkplan)}`}
				</h3>
				<Button
					variant="contained"
					size="small"
					// startIcon={<PersonAddIcon />}
					sx={{
						backgroundColor: '#f6f6f6',
						whiteSpace: 'nowrap',
						color: '#303030',
						'&:hover': {
							backgroundColor: '#e6e6e6',
							color: '#303030',
						},
						minWidth: 'auto',
					}}
					onClick={openAddDialog}
					startIcon={<PlaylistAddIcon />}
					disabled={!selectedWorkplan || loadingData}
				>
					Přidat závady do plánu
				</Button>
			</Toolbar>
			<TableContainer
				component={Paper}
				square
				sx={{
					height: 'calc(100% - 50px)',
				}}
			>
				{loadingData || !selectedWorkplan ? (
					<PongLoader />
				) : (
					<>
						{workplanDefects.length > 0 ? (
							<Table
								size="medium"
								padding="normal"
								stickyHeader
								sx={{
									td: {
										textAlign: 'center',
										overflow: 'hidden',
										fontFamily: 'inherit',
										// padding: '0.4rem 0.8rem',
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
										<TableCell>Čas zápisu</TableCell>
										<TableCell>Popis závady</TableCell>
										<TableCell>Umístění</TableCell>
										<TableCell>Stav</TableCell>
										<TableCell>Typ</TableCell>
										<TableCell>Zapsal(a)</TableCell>
										<TableCell>Řeší</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{workplanDefects.map((defect) => (
										<TableRow key={defect.id} hover tabIndex={-1}>
											<TableCell>
												{`${formatDate(defect.start_time)}`}
											</TableCell>
											<Tooltip
												title={`${defect.severity}`}
												disableInteractive
												arrow
												placement="bottom"
											>
												<TableCell
													className={`${
														styles[`severity${defect.severity_id}`]
													}`}
												>
													{`${defect.description}`}
												</TableCell>
											</Tooltip>
											<TableCell>{formatLocation(defect)}</TableCell>
											<TableCell
												className={`${styles[`state${defect.state_id}`]}`}
											>
												{defect.state_description}
											</TableCell>
											<TableCell>{defect.type_name}</TableCell>
											<TableCell>{`${defect.created_by_name} ${defect.created_by_surname}`}</TableCell>
											<TableCell>{`${
												defect.assigned_to
													? `${defect.assigned_to_name} ${defect.assigned_to_surname}`
													: '-'
											}`}</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						) : (
							<Box
								sx={{
									// position: "relative",
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
									V tomto plánu nejsou žádné závady!
								</span>
							</Box>
						)}
					</>
				)}
			</TableContainer>
		</Paper>
	);
};

export default WorkplanTable;
