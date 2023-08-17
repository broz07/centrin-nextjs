import { Id, toast } from 'react-toastify';
//import 'react-toastify/dist/ReactToastify.css';

export enum NotificationType {
	SUCCESS = 'success',
	ERROR = 'error',
	WARNING = 'warning',
	INFO = 'info',
}

export enum NotificationPosition {
	TL = 'top-left',
	TR = 'top-right',
	TC = 'top-center',
	BL = 'bottom-left',
	BR = 'bottom-right',
	BC = 'bottom-center',
}

export const notify = (
	message: string,
	type?: NotificationType,
	position: NotificationPosition = NotificationPosition.TL,
	closeTime: number = 5000,
) => {
	switch (type) {
		case NotificationType.SUCCESS:
			toast.success(message, {
				position: position,
				autoClose: closeTime,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: 'light',
			});
			break;
		case NotificationType.ERROR:
			toast.error(message, {
				position: position,
				autoClose: closeTime,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: 'light',
			});
			break;
		case NotificationType.WARNING:
			toast.warn(message, {
				position: position,
				autoClose: closeTime,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: 'light',
			});
			break;
		case NotificationType.INFO:
			toast.info(message, {
				position: position,
				autoClose: closeTime,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: 'light',
			});
			break;
		default:
			toast(message, {
				position: position,
				autoClose: closeTime,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: 'light',
			});
			break;
	}
};

export const notifyWithPromise = async (
	promise: Promise<any>,
	successMessage: string,
	errorMessage: string,
	position: NotificationPosition = NotificationPosition.TL,
	closeTime: number = 5000,
) => {
	const result = await toast.promise(
		promise,
		{
			pending: 'Loading...',
			success: successMessage,
			error: errorMessage,
		},
		{
			position: position,
			autoClose: closeTime,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
			theme: 'light',
		},
	);

	return result;
};

export const loadToast = (
	message: string,
	position: NotificationPosition = NotificationPosition.BR,
): Id => {
	return toast.loading(message, {
		position: position,
	});
};

export const updateToast = (
	id: Id,
	message: string,
	type: NotificationType = NotificationType.SUCCESS,
	position: NotificationPosition = NotificationPosition.BR,
	closeTime: number = 5000,
	isLoading: boolean = false,
) => {
	toast.update(id, {
		render: message,
		type: type,
		position: position,
		autoClose: closeTime,
		isLoading: isLoading,
		hideProgressBar: false,
		closeOnClick: true,
		pauseOnHover: true,
		draggable: true,
		progress: undefined,
		theme: 'light',
	});
};
