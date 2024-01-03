'use client';

import { useDefectContext } from '@centrin/contexts/DefectPage/DefectContext';
import {
	Box,
	IconButton,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TablePagination,
	TableRow,
	Tooltip,
} from '@mui/material';
import Image from 'next/image';
import { useEffect, useState } from 'react';
// import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import SummarizeIcon from '@mui/icons-material/Summarize';
import CommentIcon from '@mui/icons-material/Comment';
import CommentsDisabledIcon from '@mui/icons-material/CommentsDisabled';
import { useContextMenu } from 'react-contexify';
import SingleDefectMenu from './Menus/SingleDefectMenu';
import styles from '@centrin/styles/defects/defects.module.scss';
import { usePathname } from 'next/navigation';
import { getDefect } from '@centrin/utils/server/defects';
import { DateTime } from 'luxon';
import { IFullDefect } from '@centrin/types/defects.dto';
import ShowInfoDialog from './Dialogs/ShowInfoDialog';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import PongLoader from '../loaders/PongLoader';

const DefectsTable: React.FC = () => {
	const pathname = usePathname();

	const [isHistory, setIsHistory] = useState<boolean>(false);

	useEffect(() => {
		if (pathname === '/defects/history') {
			setIsHistory(true);
		} else {
			setIsHistory(false);
		}
	}, [pathname]);

	const { defects, formatLocation, setSelectedDefect, loadingData } =
		useDefectContext();

	const [showInfoDialog, setShowInfoDialog] = useState<boolean>(false);
	const [showDefect, setShowDefect] = useState<IFullDefect | undefined>(
		undefined,
	);
	const [showDialogType, setShowDialogType] = useState<'info' | 'note'>('info');

	const openInfoDialog = (defect: IFullDefect, type: 'info' | 'note') => {
		setShowDefect(defect);
		setShowDialogType(type);
		setShowInfoDialog(true);
	};

	const closeInfoDialog = () => {
		setShowInfoDialog(false);
		// setShowDefect(undefined);
		// setShowDialogType('info');
	};

	const resetInfoDialog = () => {
		setShowDefect(undefined);
		setShowDialogType('info');
	};

	const { show } = useContextMenu();

	const [page, setPage] = useState<number>(0);
	const [rowsPerPage, setRowsPerPage] = useState<number>(25);

	const handleChangePage = (event: unknown, newPage: number) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (
		event: React.ChangeEvent<HTMLInputElement>,
	) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	const formatDate = (date: Date, targetTimezone: string = 'Europe/Prague') => {
		const dt = DateTime.fromJSDate(date).setZone(targetTimezone);

		const formattedDate = dt.toFormat('dd.MM.yyyy HH:mm:ss');

		return formattedDate;
	};

	const showMenu = async (e: React.MouseEvent) => {
		e.preventDefault();

		const fetchedDefect = await getDefect(parseInt(e.currentTarget.id, 10));
		if (fetchedDefect) {
			setSelectedDefect(fetchedDefect);
		} else {
			console.log('Error fetching defect');
			setSelectedDefect(undefined);
		}

		show({
			id: 'single-defect-menu',
			event: e,
			// props: {
			// 	defectId: parseInt(e.currentTarget.id, 10),
			// },
		});
	};

	return (
		<Paper
			square
			sx={{
				height: 'calc(100vh - 72px - 52px)',
				maxHeight: 'calc(100vh - 72px - 52px)',
				overflowX: 'auto',
				overflowY: 'hidden',
			}}
		>
			<ShowInfoDialog
				open={showInfoDialog}
				close={closeInfoDialog}
				defect={showDefect}
				type={showDialogType}
				reset={resetInfoDialog}
			/>
			<SingleDefectMenu />
			<TableContainer
				component={Paper}
				square
				sx={{
					height: 'calc(100vh - 72px - 52px)',
					maxHeight: 'calc(100vh - 72px - 52px)',
				}}
			>
				{loadingData ? (
					<PongLoader />
				) : (
					<>
						{defects.length === 0 ? (
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
									Žádné záznamy
								</span>
							</Box>
						) : (
							<Table
								stickyHeader
								sx={{
									// whiteSpace: 'nowrap',
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
										<TableCell>Čas zápisu</TableCell>
										{isHistory && <TableCell>Čas uzavření</TableCell>}
										<TableCell>Popis závady</TableCell>
										<TableCell>Umístění</TableCell>
										<TableCell>Stav</TableCell>
										<TableCell>Typ</TableCell>
										<TableCell>Zapsal(a)</TableCell>
										<TableCell>Řeší</TableCell>
										{isHistory && <TableCell>Uzavřel(a)</TableCell>}
										<TableCell></TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{defects
										.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
										.map((defect) => {
											const formatedDate = formatDate(defect.start_time);
											const formatedDateEnd = defect.end_time
												? formatDate(defect.end_time)
												: '- - -';

											return (
												<TableRow
													id={`${defect.id}`}
													key={defect.id}
													onContextMenu={showMenu}
													hover
													tabIndex={-1}
												>
													<TableCell>{`${formatedDate}`}</TableCell>
													{isHistory && (
														<TableCell>{`${formatedDateEnd}`}</TableCell>
													)}
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
															<Box
																sx={{
																	display: 'flex',
																	flexDirection: 'row',
																	alignItems: 'center',
																	justifyContent: 'space-between',
																	height: '100%',
																	width: '100%',
																}}
															>
																{`${defect.description}`}
																<Tooltip
																	title="Zobrazit detailní popis závady"
																	disableInteractive
																	arrow
																	placement="right"
																>
																	<span>
																		<IconButton
																			size="small"
																			disabled={!defect.info}
																			onClick={() =>
																				openInfoDialog(defect, 'info')
																			}
																		>
																			{defect.info ? (
																				<CommentIcon />
																			) : (
																				<CommentsDisabledIcon />
																			)}
																		</IconButton>
																	</span>
																</Tooltip>
															</Box>
														</TableCell>
													</Tooltip>
													<TableCell>{formatLocation(defect)}</TableCell>
													{isHistory ? (
														<TableCell
															className={`${styles[`state${defect.state_id}`]}`}
														>
															<Box
																sx={{
																	display: 'flex',
																	flexDirection: 'row',
																	alignItems: 'center',
																	justifyContent: 'space-between',
																	height: '100%',
																	width: '100%',
																}}
															>
																{`${defect.state_description}`}
																<Tooltip
																	title="Zobrazit závěrečnou zprávu"
																	disableInteractive
																	arrow
																	placement="right"
																>
																	<span>
																		<IconButton
																			size="small"
																			disabled={!defect.note}
																			onClick={() =>
																				openInfoDialog(defect, 'note')
																			}
																		>
																			<SummarizeIcon />
																		</IconButton>
																	</span>
																</Tooltip>
															</Box>
														</TableCell>
													) : (
														<TableCell
															className={`${styles[`state${defect.state_id}`]}`}
														>
															{`${defect.state_description}`}
														</TableCell>
													)}

													<TableCell>{`${defect.type_name}`}</TableCell>
													<TableCell>{`${defect.created_by_name} ${defect.created_by_surname}`}</TableCell>
													<TableCell>{`${
														defect.assigned_to
															? `${defect.assigned_to_name} ${defect.assigned_to_surname}`
															: '-'
													}`}</TableCell>
													{isHistory && (
														<TableCell>
															{`${
																defect.solved_by
																	? `${defect.solved_by_name} ${defect.solved_by_surname}`
																	: '-'
															}`}
														</TableCell>
													)}
													<TableCell>
														<Tooltip
															title="Zobrazit detail závady"
															disableInteractive
															arrow
															placement="left"
														>
															<IconButton
																href={`/defect/${defect.id}`}
															>
																<ArrowForwardIosIcon />
															</IconButton>
														</Tooltip>
													</TableCell>
												</TableRow>
											);
										})}
								</TableBody>
							</Table>
						)}
					</>
				)}
			</TableContainer>
			<TablePagination
				labelRowsPerPage="Záznamů na stránku:"
				rowsPerPageOptions={[10, 25, 50, 100]}
				component="div"
				sx={{
					display: 'flex',
					flexDirection: 'row',
					alignItems: 'center',
					justifyContent: 'flex-start',
					height: '52px',
					position: 'absolute',
					bottom: 0,
				}}
				count={defects.length || 0}
				page={page}
				rowsPerPage={rowsPerPage}
				onPageChange={handleChangePage}
				onRowsPerPageChange={handleChangeRowsPerPage}
				showFirstButton
				showLastButton
			/>
		</Paper>
	);
};

export default DefectsTable;
