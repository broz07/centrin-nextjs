'use client';

import { ILoginLog } from '@centrin/types/logging.dto';
import { getLoginLogs } from '@centrin/utils/server/logging';
import { formatDate } from '@centrin/utils/workplan';
import {
	Box,
	Stack,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';

const LoginLogPanel: React.FC = () => {
	const [loading, setLoading] = useState<boolean>(true);
	const [loginData, setLoginData] = useState<ILoginLog[]>([]);

	useEffect(() => {
		const fetchLogs = async () => {
			const result = await getLoginLogs(13);

			if (result) {
				setLoginData(result);
				setLoading(false);
			}
		};
		fetchLogs();
	}, []);

	return (
		<Stack
			sx={{
				width: '100%',
				height: '100%',
				maxHeight: '100%',
				padding: '0.5rem',
				paddingTop: '0.95rem',
				// backgroundColor: 'green'
			}}
		>
			<Typography
				variant="h6"
				sx={{
					fontWeight: 'bold',
					textAlign: 'center',
					fontSize: '20px',
					// backgroundColor: 'red'
					color: '#6e6e6e',
				}}
			>
				Naposledy přihlášení uživatelé
			</Typography>
			<TableContainer component={Box}>
				<Table size="small" padding="none" stickyHeader>
					<TableHead>
						<TableRow>
							<TableCell sx={{ fontWeight: 'bold' }}>Uživatel</TableCell>
							<TableCell sx={{ fontWeight: 'bold' }}>Datum a čas</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{loginData.map((row, index) => (
							<TableRow key={index} hover>
								<TableCell>{row.displayName}</TableCell>
								<TableCell>{formatDate(row.timestamp)}</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</Stack>
	);
};

export default LoginLogPanel;
