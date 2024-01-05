import styles from '@centrin/styles/home/home.module.scss';
import { Box, Grid } from '@mui/material';
import DefectChart from './panels/DefectChart';
import BuildingsChart from './panels/BuildingsChart';
import WeeksChart from './panels/WeeksChart';
import MaintainersChart from './panels/MaintainersChart';

const AdminContent: React.FC = () => {
	return (
		<div className={`${styles.adminContent}`}>
			<Box
				sx={{
					width: '100%',
					height: '100%',
					display: 'grid',
					gridTemplateColumns: 'repeat(3, 1fr)',
					gridTemplateRows: 'repeat(2, 1fr)',
					gap: '0.5rem',
					padding: '0.5rem',
				}}
			>
				<Box
					sx={{
						gridArea: ' 1 / 1 / 2 / 2',
						boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.2)',
						borderRadius: '5px',
						// border:"1px solid red"
					}}
				>
					<DefectChart />
				</Box>
				<Box
					sx={{
						gridArea: '1 / 2 / 2 / 3',
						boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.2)',
						borderRadius: '5px',
						// border:"1px solid red"
					}}
				>
					<WeeksChart />
				</Box>
				<Box
					sx={{
						gridArea: '1 / 3 / 2 / 4',
						boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.2)',
						borderRadius: '5px',
						// border:"1px solid red"
					}}
				>
					<BuildingsChart />
				</Box>
				<Box
					sx={{
						gridArea: '2 / 1 / 3 / 2',
						boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.2)',
						borderRadius: '5px',
						// border:"1px solid red"
					}}
				>
					<MaintainersChart />
				</Box>
				<Box
					sx={{
						gridArea: '2 / 2 / 3 / 3',
						boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.2)',
						borderRadius: '5px',
						// border:"1px solid red"
					}}
				>
					vykon zamestnancu
				</Box>
				<Box
					sx={{
						gridArea: '2 / 3 / 3 / 4',
						boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.2)',
						borderRadius: '5px',
						// border:"1px solid red"
					}}
				>
					pocet neopravitelnych zavad
				</Box>
			</Box>
		</div>
	);
};

export default AdminContent;
