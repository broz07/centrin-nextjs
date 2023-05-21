import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export enum NotificationType {
    SUCCESS = "success",
    ERROR = "error",
    WARNING = "warning",
    INFO = "info",
}

export enum NotificationPosition {
    TL = "top-left",
    TR = "top-right",
    TC = "top-center",
    BL = "bottom-left",
    BR = "bottom-right",
    BC = "bottom-center",
}

export const notify = (message: string, type?: NotificationType, position: NotificationPosition = NotificationPosition.TL) => {
    switch(type){
        case NotificationType.SUCCESS:
            toast.success(message, {
                position: position,
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            break;
        case NotificationType.ERROR:
            toast.error(message, {
                position: position,
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            break;
        case NotificationType.WARNING:
            toast.warn(message, {
                position: position,
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            break;
        case NotificationType.INFO:
            toast.info(message, {
                position: position,
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            break;
        default:
            toast(message, {
                position: position,
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
    }
}
