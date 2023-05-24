'use client'

import { use, useEffect, useState } from "react";
import { IUser } from "@centrin/types/User/User";
import { Button, ButtonGroup, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { NotificationPosition, NotificationType, notify } from "@centrin/utils/notify";
import { deleteUser } from "@centrin/utils/users";

interface Props{
    data: IUser[];
    refreshFlag: boolean;
    setRefreshFlag: React.Dispatch<React.SetStateAction<boolean>>;
}

const UserContentTable: React.FC<Props> = ({data, refreshFlag, setRefreshFlag}) => {
    const [open, setOpen] = useState<boolean>(false);
    const [modalUser, setModalUser] = useState<IUser | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        setIsLoading(false);
    }, []);

    const handleClickOpen = (user: IUser) => {
        setModalUser(user);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setModalUser(null);
    };

    const handleDelete = async () => {
        if (modalUser){
            const deleted = await deleteUser(modalUser.id);

            if (deleted){
                notify("Uživatel byl úspěšně odstraněn 👍🏻", NotificationType.SUCCESS, NotificationPosition.BR)
                setOpen(false);
                setModalUser(null);
                setRefreshFlag(!refreshFlag);
            }else{
                notify("Nastala chyba při odstraňování uživatele 👎🏻", NotificationType.ERROR, NotificationPosition.BR)
                setOpen(false);
                setModalUser(null);
            }   
        }else{
            notify("Nepodařilo se odstranit uživatele 👎🏻", NotificationType.ERROR, NotificationPosition.BR)
            setOpen(false);
            setModalUser(null);
        }
    };

    return (
        <>
        {isLoading ? (
            <div>Loading...</div>
        ) : (
            <>
                
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Odstranění uživatele {modalUser?.displayName}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Opravdu chcete odstranit uživatele {modalUser?.displayName} s oprávněním {modalUser?.role.description}?
                    </DialogContentText>
                    <DialogActions>
                        <Button onClick={handleClose}>Zrušit</Button>
                        <Button variant="contained" endIcon={<DeleteIcon />} onClick={handleDelete}>Odstranit</Button>
                    </DialogActions>
                </DialogContent>
            </Dialog>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Jméno</th>
                        <th>Příjmení</th>
                        <th>Login</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Akce</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((user) => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.name}</td>
                            <td>{user.surname}</td>
                            <td>{user.username}</td>
                            <td>{user.email}</td>
                            <td>{user.role.description}</td>
                            <td>
                                <ButtonGroup variant="text">
                                    <IconButton>
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton>
                                        <DeleteIcon onClick={()=> handleClickOpen(user)} />
                                    </IconButton>
                                </ButtonGroup>
                            </td>
                        </tr>
                    ))
                    }                         
                </tbody>
            </table>
        </>)}</>
    );
}

export default UserContentTable;