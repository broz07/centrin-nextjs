'use client'

import { use, useEffect, useState } from "react";
import { IUser, IUserUpdate, RoleEnum, roleSelectValues } from "@centrin/types/user";
import { Button, ButtonGroup, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, IconButton, MenuItem, TextField, Tooltip } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import PasswordIcon from '@mui/icons-material/Password';
import { NotificationPosition, NotificationType, notify } from "@centrin/utils/notify";
import { deleteUser, resetUserPassword, updateUser } from "@centrin/utils/users";

interface Props{
    data: IUser[];
    refreshFlag: boolean;
    setRefreshFlag: React.Dispatch<React.SetStateAction<boolean>>;
}

const UserContentTable: React.FC<Props> = ({data, refreshFlag, setRefreshFlag}) => {
    const [deleteOpen, setDeleteOpen] = useState<boolean>(false);
    const [modalUser, setModalUser] = useState<IUser | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [editOpen, setEditOpen] = useState<boolean>(false);
    const [selectValue, setSelectValue] = useState<RoleEnum>(RoleEnum.USER);
    const [passwordOpen, setPasswordOpen] = useState<boolean>(false);
    const [passwordError, setPasswordError] = useState<boolean>(false);
    const [passwordErrorText, setPasswordErrorText] = useState<string>("");

    useEffect(() => {
        setIsLoading(false);
    }, []);

    const handleEditOpen = (user: IUser) => {
        setModalUser(user);
        setSelectValue(user.role.id);
        setEditOpen(true);
    };

    const handleEditClose = () => {
        setEditOpen(false);
        setModalUser(null);
        setSelectValue(RoleEnum.USER);
    };

    const handlePasswordOpen = (user: IUser) => {
        setModalUser(user);
        setPasswordOpen(true);
    };

    const handlePasswordClose = () => {
        setPasswordOpen(false);
        setModalUser(null);
    };

    const handleDeleteOpen = (user: IUser) => {
        setModalUser(user);
        setDeleteOpen(true);
    };

    const handleDeleteClose = () => {
        setDeleteOpen(false);
        setModalUser(null);
    };

    const handleDelete = async () => {
        if (modalUser){
            const deleted = await deleteUser(modalUser.id);

            if (deleted){
                notify("Uživatel byl úspěšně odstraněn 👍🏻", NotificationType.SUCCESS, NotificationPosition.BR)
                setDeleteOpen(false);
                setModalUser(null);
                setRefreshFlag(!refreshFlag);
            }else{
                notify("Nastala chyba při odstraňování uživatele 👎🏻", NotificationType.ERROR, NotificationPosition.BR)
                setDeleteOpen(false);
                setModalUser(null);
            }   
        }else{
            notify("Nepodařilo se odstranit uživatele 👎🏻", NotificationType.ERROR, NotificationPosition.BR)
            setDeleteOpen(false);
            setModalUser(null);
        }
    };

    const handleEdit = async() => {
        const name = (document.getElementById("name") as HTMLInputElement).value;
        const surname = (document.getElementById("surname") as HTMLInputElement).value;
        const username = (document.getElementById("username") as HTMLInputElement).value;
        const email = (document.getElementById("email") as HTMLInputElement).value;
        

        if (name && surname && username && name.trim() !== "" && surname.trim() !== "" && username.trim() !== ""){
            if (modalUser){
                const editedUser: IUserUpdate = {
                    name: name,
                    surname: surname,
                    username: username,
                    email: email,
                    role: selectValue
                }

                const edited = await updateUser(modalUser.id, editedUser);

                if (edited){
                    notify("Uživatel byl úspěšně upraven 👍🏻", NotificationType.SUCCESS, NotificationPosition.BR)
                    setEditOpen(false);
                    setModalUser(null);
                    setRefreshFlag(!refreshFlag);
                }else{
                    notify("Nastala chyba při úpravě uživatele 👎🏻", NotificationType.ERROR, NotificationPosition.BR)
                    setEditOpen(false);
                    setModalUser(null);
                }
            }
        }
            

        
    }

    const passwordMatch = () => {
        const password = (document.getElementById("new-password") as HTMLInputElement).value;
        const password2 = (document.getElementById("new-password-repeat") as HTMLInputElement).value;

        if (password.trim() === "" || password2.trim() === ""){
            setPasswordError(true);
            setPasswordErrorText("Hesla nesmí být prázdná");
            return false;
        }

        if (password === password2){
            setPasswordError(false);
            setPasswordErrorText("");
            return true;
        }else{
            setPasswordError(true);
            setPasswordErrorText("Hesla se neshodují");
            return false;
        }
    }

    const handleResetPassword = async() => {
        if (modalUser){
            passwordMatch();
            if (!passwordError){
                const password = (document.getElementById("new-password") as HTMLInputElement).value;

                const reseted = await resetUserPassword(modalUser.id, password);

                if (reseted){
                    notify("Heslo bylo úspěšně změněno 👍🏻", NotificationType.SUCCESS, NotificationPosition.BR)
                    setPasswordOpen(false);
                    setPasswordError(false);
                    setPasswordErrorText("");
                    setModalUser(null);
                }else{
                    notify("Nastala chyba při měnění hesla 👎🏻", NotificationType.ERROR, NotificationPosition.BR)
                    setPasswordOpen(false);
                    setPasswordError(false);
                    setPasswordErrorText("");
                    setModalUser(null);
                }
            }
        }
    }

    return (
        <>
        {isLoading ? (
            <div>Loading...</div>
        ) : (
            <>
                
            <Dialog open={deleteOpen} onClose={handleDeleteClose}>
                <DialogTitle>Odstranění uživatele {modalUser?.displayName}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Opravdu chcete odstranit uživatele {modalUser?.displayName} s oprávněním {modalUser?.role.description}?
                    </DialogContentText>
                    <DialogActions>
                        <Button onClick={handleDeleteClose}>Zrušit</Button>
                        <Button variant="contained" endIcon={<DeleteIcon />} onClick={handleDelete}>Odstranit</Button>
                    </DialogActions>
                </DialogContent>
            </Dialog>

            <Dialog open={editOpen} onClose={handleEditClose}>
                <DialogTitle>Upravení uživatele {modalUser?.displayName}</DialogTitle>
                <DialogContent>
                <FormControl fullWidth>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Jméno"
                            type="text"
                            defaultValue={modalUser?.name}
                            fullWidth
                            required                            
                        />
                        <TextField
                            margin="dense"
                            id="surname"
                            label="Příjmení"
                            type="text"
                            defaultValue={modalUser?.surname}
                            fullWidth
                            required                            
                        />
                        <TextField
                            margin="dense"
                            id="username"
                            label="Přihlašovací jméno"
                            type="text"
                            defaultValue={modalUser?.username}
                            fullWidth
                            required                    
                        />
                        <TextField
                            margin="dense"
                            id="email"
                            label="Email"
                            type="email"
                            defaultValue={modalUser?.email}
                            fullWidth
                        />
                        <TextField
                            margin="dense"
                            id="role"
                            label="Role"
                            select
                            fullWidth
                            defaultValue={selectValue}                            
                            required                            
                        >
                            {roleSelectValues.map((option) => (
                                <MenuItem key={option.value} value={option.value}onClick={()=> setSelectValue(option.value)} >
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleEditClose}>Zrušit</Button>
                    <Button  variant="contained" endIcon={<EditIcon />} onClick={handleEdit}>Upravit</Button>
                </DialogActions>
            </Dialog>
            
            <Dialog open={passwordOpen} onClose={handlePasswordClose}>
                <DialogTitle>Změna hesla uživatele {modalUser?.displayName}</DialogTitle>
                <DialogContent>
                    <FormControl fullWidth>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="new-password"
                            label="Nové heslo"
                            type="password"
                            fullWidth
                            required
                            error={passwordError}
                            helperText={passwordErrorText}
                            onChange={passwordMatch}
                        />
                        <TextField
                            margin="dense"
                            id="new-password-repeat"
                            label="Nové heslo znovu"
                            type="password"
                            fullWidth
                            required
                            error={passwordError}
                            helperText={passwordErrorText}
                            onChange={passwordMatch}
                        />
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handlePasswordClose}>Zrušit</Button>
                    <Button variant="contained" endIcon={<PasswordIcon />} onClick={handleResetPassword}>Změnit heslo</Button>
                </DialogActions>
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
                                    <Tooltip title="Změnit heslo" arrow placement="bottom" disableInteractive>
                                        <IconButton onClick={() => handlePasswordOpen(user)}>                                        
                                            <PasswordIcon />                                        
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Upravit" arrow placement="bottom" disableInteractive>
                                        <IconButton  onClick={() => handleEditOpen(user)}>
                                            <EditIcon/>
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Odstranit" arrow placement="bottom" disableInteractive>
                                        <IconButton onClick={()=> handleDeleteOpen(user)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </Tooltip>
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