'use client';

import { Button, Paper, Stack, Step, StepLabel, Stepper } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import DoneIcon from '@mui/icons-material/Done';
import { useState } from 'react';
import { useDefectAddContext } from '@centrin/contexts/DefectPage/DefectAddContext';
import LocalitySelect from './LocalitySelect';
import LocationSelect from './LocationSelect';

const steps = [
	'Vyberte lokalitu',
	'Vyberte přesné místo',
	'Vyplňte popis závady',
	'Dokončení',
];

const DefectAddContent: React.FC = () => {
	const { activeStep, setActiveStep, locality, selectedLocation } =
		useDefectAddContext();

	const handleNext = () => {
		if (activeStep === steps.length - 1) {
			// TODO: submit form

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
				return <div>Step 3</div>;
			case 3:
				return <div>Step 4</div>;
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
							(activeStep === 1 && !selectedLocation)
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
