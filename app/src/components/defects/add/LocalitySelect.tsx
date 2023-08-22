'use client';

import { useDefectAddContext } from '@centrin/contexts/DefectPage/DefectAddContext';
import { Card, CardContent, CardMedia, Stack } from '@mui/material';

const LocalitySelect: React.FC = () => {
	const { locality, setLocality } = useDefectAddContext();

	return (
		<Stack
			direction="row"
			justifyContent="center"
			alignItems="center"
			spacing={10}
			sx={{
				width: '100%',
			}}
		>
			<Card
				sx={{
					width: '30%',
					height: '100%',
					border: locality === 'outdoor' ? '3px solid #211B6C' : '',
				}}
				onClick={() => setLocality('outdoor')}
				// variant='outlined'
			>
				<CardMedia
					component="img"
					alt="Venkovní prostory"
					height="180"
					image="/assets/undraw_outside.svg"
				/>
				<CardContent
					sx={{
						textAlign: 'center',
					}}
				>
					<h2>Venkovní prostory</h2>
				</CardContent>
			</Card>
			<Card
				sx={{
					width: '30%',
					height: '100%',
					border: locality === 'indoor' ? '3px solid #211B6C' : '',
				}}
				onClick={() => setLocality('indoor')}
			>
				<CardMedia
					component="img"
					alt="Vnitřní prostory"
					height="180"
					image="/assets/undraw_inside.svg"
				/>
				<CardContent
					sx={{
						textAlign: 'center',
					}}
				>
					<h2>Vnitřní prostory</h2>
				</CardContent>
			</Card>
		</Stack>
	);
};

export default LocalitySelect;
