import { SeverityEnum } from "@centrin/types/defects.dto";

export const randomRGB = (): string => {
	const r = Math.floor(Math.random() * 256);
	const g = Math.floor(Math.random() * 256);
	const b = Math.floor(Math.random() * 256);

	return `rgb(${r}, ${g}, ${b})`;
};

export const chartPallette = [
	'rgb(255, 99, 132)',
	'rgb(255, 159, 64)',
	'rgb(255, 205, 86)',
	'rgb(75, 192, 192)',
	'rgb(54, 162, 235)',
	'rgb(153, 102, 255)',
	'rgb(201, 203, 207)',
];

export const getSeverityColor = (severity: SeverityEnum): string => {
	switch (severity) {
		case SeverityEnum.UNCLASSIFIED:
			return 'rgb(201, 203, 207)';
		case SeverityEnum.LOW:
			return 'rgb(75, 192, 192)';
		case SeverityEnum.MEDIUM:
			return 'rgb(255, 205, 86)';
		case SeverityEnum.HIGH:
			return 'rgb(255, 159, 64)';
		case SeverityEnum.CRITICAL:
			return 'rgb(255, 99, 132)';
		default:
			return 'rgb(201, 203, 207)';
	}
}