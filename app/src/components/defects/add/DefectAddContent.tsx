'use client';

import { Button, Paper, Stack, Step, StepLabel, Stepper } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import DoneIcon from '@mui/icons-material/Done';
import { useDefectAddContext } from '@centrin/contexts/DefectPage/DefectAddContext';
import LocalitySelect from './LocalitySelect';
import LocationSelect from './LocationSelect';
import InfoSelect from './InfoSelect';
import DefectSummary from './DefectSummary';
import { IDefectAdd } from '@centrin/types/defects.dto';
import { addDefect } from '@centrin/utils/server/defects';
import {
	NotificationPosition,
	NotificationType,
	loadToast,
	updateToast,
} from '@centrin/utils/client/notify';
import { useRouter } from 'next/navigation';

const steps = [
	'Vyberte lokalitu',
	'Vyberte přesné místo',
	'Vyplňte popis závady',
	'Dokončení',
];

const DefectAddContent: React.FC = () => {
	const router = useRouter();
	const {
		activeStep,
		setActiveStep,
		locality,
		selectedLocation,
		description,
		defectToAdd,
	} = useDefectAddContext();

	const handleAddDefect = async (defect: IDefectAdd) => {
		const toast = loadToast('Přidávání závady...', NotificationPosition.BR);
		const added = await addDefect(defect);

		if (added) {
			updateToast(
				toast,
				'Závada byla úspěšně přidána. 👍🏻',
				NotificationType.SUCCESS,
				NotificationPosition.BR,
				2000,
			);
			router.push('/defects');
		} else {
			updateToast(
				toast,
				'Při přidávání závady došlo k chybě. 🤕',
				NotificationType.ERROR,
				NotificationPosition.BR,
				2000,
			);
			router.refresh();
		}
	};

	const handleNext = () => {
		if (activeStep === steps.length - 1) {
			if (!defectToAdd) return;

			handleAddDefect(defectToAdd);
			return;
		}
		setActiveStep((prevActiveStep) => prevActiveStep + 1);
	};

	const handleBack = () => {
		if (activeStep === 0) return;
		setActiveStep((prevActiveStep) => prevActiveStep - 1);
	};

	const renderStepContent = (step: number) => {
		switch (step) {
			case 0:
				return <LocalitySelect />;
			case 1:
				return <LocationSelect />;
			case 2:
				return <InfoSelect />;
			case 3:
				return <DefectSummary />;
			default:
				return <div>Step 1</div>;
		}
	};

	return (
		<Paper
			sx={{
				width: '100%',
				height: '100%',
				padding: '1rem 0',
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				justifyContent: 'center',
			}}
		>
			<Stack
				direction="column"
				justifyContent="space-between"
				alignItems="center"
				spacing={0}
				sx={{
					height: '100%',
					width: '70%',
				}}
			>
				<Stepper
					activeStep={activeStep}
					alternativeLabel
					sx={{
						width: '100%',
					}}
				>
					{steps.map((label) => (
						<Step key={label}>
							<StepLabel>{label}</StepLabel>
						</Step>
					))}
				</Stepper>
				{renderStepContent(activeStep)}
				<Stack
					direction="row"
					justifyContent="space-between"
					alignItems="center"
					spacing={0}
					sx={{
						width: '100%',
						padding: '0 4rem',
					}}
				>
					<Button
						startIcon={<ArrowBackIcon />}
						disabled={activeStep === 0}
						onClick={handleBack}
					>
						Zpět
					</Button>
					<Button
						variant="contained"
						color="primary"
						endIcon={
							activeStep === steps.length - 1 ? (
								<DoneIcon />
							) : (
								<ArrowForwardIcon />
							)
						}
						onClick={handleNext}
						disabled={
							(activeStep === 0 && !locality) ||
							(activeStep === 1 && !selectedLocation) ||
							(activeStep === 2 &&
								(!description || description.trim().length === 0)) ||
							(activeStep === 3 && !defectToAdd)
						}
					>
						{`${activeStep === steps.length - 1 ? 'Dokončit' : 'Další'}`}
					</Button>
				</Stack>
			</Stack>
		</Paper>
	);
};

export default DefectAddContent;
