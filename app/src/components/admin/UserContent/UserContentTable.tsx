'use client';

import { useUserContentContext } from '@centrin/contexts/AdminPage/UserContentContext';
import { getUsers } from '@centrin/utils/server/users';
import {
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
import { useEffect, useState } from 'react';
import { useContextMenu } from 'react-contexify';
import SingleMenu from '../Menus/SingleMenu';
import BulkMenu from '../Menus/BulkMenu';

const UserContentTable: React.FC = () => {
	const { users, setUsers, refresh, refreshFlag } = useUserContentContext();
	const { show } = useContextMenu();

	const [selected, setSelected] = useState<string[]>([]);

	const resetSelected = () => {
		setSelected([]);
	};

	const isSelected = (name: string) => selected.indexOf(name) !== -1;

	const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.checked) {
			const newSelecteds = users.map((n) => n.id.toString());
			setSelected(newSelecteds as string[]);
			return;
		}
		setSelected([]);
	};

	const handleClick = (name: string) => {
		const selectedIndex = selected.indexOf(name);
		let newSelected: string[] = [];

		if (selectedIndex === -1) {
			newSelected = newSelected.concat(selected, name);
		} else if (selectedIndex === 0) {
			newSelected = newSelected.concat(selected.slice(1));
		} else if (selectedIndex === selected.length - 1) {
			newSelected = newSelected.concat(selected.slice(0, -1));
		} else if (selectedIndex > 0) {
			newSelected = newSelected.concat(
				selected.slice(0, selectedIndex),
				selected.slice(selectedIndex + 1),
			);
		}

		setSelected(newSelected);
	};

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

	useEffect(() => {
		const fetchUsers = async () => {
			const users = await getUsers();
			setUsers(users);
		};

		fetchUsers();
	}, [refreshFlag, setUsers]);

	const showMenu = (e: React.MouseEvent) => {
		e.preventDefault();
		if (selected.length === 0) {
			show({
				id: 'single-user-menu',
				event: e,
				props: {
					userId: parseInt(e.currentTarget.id, 10),
				},
			});
		} else {
			show({
				id: 'bulk-user-menu',
				event: e,
				props: {
					userIds: selected.map((id) => parseInt(id, 10)),
				},
			});
		}
	};

	return (
		<Paper
			square
			sx={{
				height: 'calc(100vh - 50px - 72px - 52px)',
				maxHeight: 'calc(100vh - 50px - 72px - 52px)',
				overflowX: 'auto',
				overflowY: 'hidden',
			}}
		>
			<SingleMenu />
			<BulkMenu resetSelected={resetSelected} />

			<TableContainer
				component={Paper}
				square
				sx={{
					height: 'calc(100vh - 50px - 72px - 52px)',
					maxHeight: 'calc(100vh - 50px - 72px - 52px)',
				}}
			>
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
							<TableCell padding="checkbox">
								<Checkbox
									indeterminate={
										selected.length > 0 && selected.length < users.length
									}
									checked={users.length > 0 && selected.length === users.length}
									onChange={handleSelectAllClick}
								/>
							</TableCell>
							<TableCell>ID</TableCell>
							<TableCell>Jméno</TableCell>
							<TableCell>Příjmení</TableCell>
							<TableCell>Uživatelské jméno</TableCell>
							<TableCell>Email</TableCell>
							<TableCell>Role</TableCell>
							{/* <TableCell align="center">Akce</TableCell> */}
						</TableRow>
					</TableHead>
					<TableBody>
						{users
							.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
							.map((user) => {
								const isItemSelected = isSelected(user.id.toString());

								return (
									<TableRow
										id={`${user.id}`}
										key={user.id}
										onContextMenu={showMenu}
										hover
										selected={isItemSelected}
										role="checkbox"
										tabIndex={-1}
										aria-checked={isItemSelected}
									>
										<TableCell
											padding="checkbox"
											onClick={() => handleClick(user.id.toString())}
											sx={{
												cursor: 'pointer',
											}}
										>
											<Checkbox checked={isItemSelected} />
										</TableCell>
										<TableCell align="center">{user.id}</TableCell>
										<TableCell align="center">{user.name}</TableCell>
										<TableCell align="center">{user.surname}</TableCell>
										<TableCell align="center">{user.username}</TableCell>
										<TableCell align="center">
											{user.email || '- - -'}
										</TableCell>
										<TableCell align="center">
											{user.role.description}
										</TableCell>
									</TableRow>
								);
							})}
					</TableBody>
				</Table>
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
				count={users.length || 0}
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

export default UserContentTable;
