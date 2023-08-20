'use client';

import { useDefectContext } from '@centrin/contexts/DefectPage/DefectContext';
import {
	Box,
	Checkbox,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TablePagination,
	TableRow,
} from '@mui/material';
import Image from 'next/image';
import { useState } from 'react';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

const DefectsTable: React.FC = () => {
	const {
		defects,
		selectAllDefects,
		selectDefect,
		selectedDefects,
		isSelected,
		formatLocation,
	} = useDefectContext();

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

	const formatDate = (date: Date) => {
		const d = new Date(date);
		return `${d.getDate()}. ${
			d.getMonth() + 1
		}. ${d.getFullYear()} ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`;
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
			<TableContainer
				component={Paper}
				square
				sx={{
					height: 'calc(100vh - 72px - 52px)',
					maxHeight: 'calc(100vh - 72px - 52px)',
				}}
			>
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
						padding="normal"
						size="medium"
						sx={{ whiteSpace: 'nowrap' }}
					>
						<TableHead>
							<TableRow
								sx={{
									th: {
										fontWeight: 'bold',
										textAlign: 'center',
									},
								}}
							>
								{/* <TableCell padding="checkbox">
									<Checkbox
										indeterminate={
											selectedDefects.length > 0 &&
											selectedDefects.length < defects.length
										}
										checked={
											defects.length > 0 &&
											selectedDefects.length === defects.length
										}
										onChange={selectAllDefects}
									/>
								</TableCell> */}
								<TableCell>Čas zápisu</TableCell>
								<TableCell>Popis závady</TableCell>
								<TableCell>Umístění</TableCell>
								<TableCell>Stav</TableCell>
								<TableCell>Typ závady</TableCell>
								<TableCell>Zapsal(a)</TableCell>
								<TableCell>Přiděleno</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{defects
								.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
								.map((defect) => {
									const isItemSelected = isSelected(defect.id.toString());
									const formatedDate = formatDate(defect.start_time);

									return (
										<TableRow
											// id={`${user.id}`}
											key={defect.id}
											// onContextMenu={showMenu}
											hover
											selected={isItemSelected}
											role="checkbox"
											tabIndex={-1}
											aria-checked={isItemSelected}
										>
											{/* <TableCell
											padding="checkbox"
											onClick={() => selectDefect(defect.id.toString())}
											sx={{
												cursor: 'pointer',
											}}
										>
											<Checkbox checked={isItemSelected} />
										</TableCell> */}
											<TableCell>{`${formatedDate}`}</TableCell>
											<TableCell>
												{`${defect.description}`}
												{/* TODO styling */}
												{defect.info && <InfoOutlinedIcon />}
											</TableCell>
											<TableCell>{formatLocation(defect)}</TableCell>
											<TableCell>{`${defect.state_description}`}</TableCell>
											<TableCell>{`${defect.type_name}`}</TableCell>
											<TableCell>{`${defect.created_by_name} ${defect.created_by_surname}`}</TableCell>
											<TableCell>{`${
												defect.assigned_to
													? `${defect.assigned_to_name} ${defect.assigned_to_surname}`
													: 'Nepřiděleno'
											}`}</TableCell>
										</TableRow>
									);
								})}
						</TableBody>
					</Table>
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
