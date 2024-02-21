'use client';

import styles from '@centrin/styles/home/home.module.scss';
import { NotificationPosition, NotificationType, notify } from '@centrin/utils/client/notify';
import { Card, CardContent, CardMedia, Stack } from '@mui/material';
import { useRouter } from 'next/navigation';

const DefaultContent: React.FC = () => {
	const router = useRouter();

	return (
		<div className={styles.defaultContent}>
			<Stack
				direction="row"
				justifyContent="center"
				alignItems="center"
				spacing={2}
				sx={{
					width: '100%',
					height: '280px',
				}}
			>
				<Card
					sx={{
						width: '300px',
						height: '100%',
						userSelect: 'none',
						cursor: 'pointer',
					}}
					onMouseEnter={() => router.prefetch('/defects/add')}
					onClick={() => router.push('/defects/add')}
				>
					<CardMedia
						component="img"
						alt="Přidat závadu"
						height="180"
						image="/assets/undraw_add_tasks.svg"
					/>
					<CardContent
						sx={{
							textAlign: 'center',
						}}
					>
						<h2>Přidat závadu</h2>
					</CardContent>
				</Card>
				<Card
					sx={{
						width: '300px',
						height: '100%',
						userSelect: 'none',
						cursor: 'pointer',
					}}
					// onMouseEnter={() => router.prefetch('/defects/add')}
					// onClick={() => router.push('/defects/add')}
					onClick={
						() => notify('Funkce zatím není dostupná! 🛠️', NotificationType.WARNING, NotificationPosition.BR, 5000 )
					}
				>
					<CardMedia
						component="img"
						alt="Moje záznamy"
						height="180"
						image="/assets/undraw_my_tasks2.svg"
						
					/>
					<CardContent
						sx={{
							textAlign: 'center',
						}}
					>
						<h2>Moje záznamy</h2>
					</CardContent>
				</Card>
			</Stack>
		</div>
	);
};

export default DefaultContent;
