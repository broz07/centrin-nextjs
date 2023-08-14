'use client';

import { useState } from 'react';
import UserContentHeader from './UserContentHeader';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  MenuItem,
  TextField,
} from '@mui/material';
import { IUserAdd, RoleEnum, roleSelectValues } from '@centrin/types/user';
import { addUser } from '@centrin/utils/users';
import { NotificationPosition, NotificationType, notify } from '@centrin/utils/notify';
import UserContentDataProvider from './UserContentDataProvider';

const UserContent: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [passwordError, setPasswordError] = useState<boolean>(false);
  const [requiredError, setRequiredError] = useState<string[]>([]);
  const [passwordErrorText, setPasswordErrorText] = useState<string>('');
  const [selectValue, setSelectValue] = useState<RoleEnum>(RoleEnum.USER);
  const [refresh, setRefresh] = useState<boolean>(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handlePasswordChange = (): void => {
    const password = (document.getElementById('password') as HTMLInputElement).value;
    const passwordAgain = (document.getElementById('password-again') as HTMLInputElement).value;

    if (password.trim() === '') {
      setPasswordError(true);
      setPasswordErrorText('Heslo nesmí být prázdné');
    } else if (password !== passwordAgain) {
      setPasswordError(true);
      setPasswordErrorText('Hesla se neshodují');
    } else {
      setPasswordError(false);
      setPasswordErrorText('');
    }
  };

  const handleRequiredError = () => {
    const name = (document.getElementById('name') as HTMLInputElement).value;
    const surname = (document.getElementById('surname') as HTMLInputElement).value;
    const username = (document.getElementById('username') as HTMLInputElement).value;

    const requiredError: string[] = [];

    if (name.trim() === '') {
      requiredError.push('name');
    }
    if (surname.trim() === '') {
      requiredError.push('surname');
    }
    if (username.trim() === '') {
      requiredError.push('username');
    }

    setRequiredError(requiredError);
  };

  const handleSubmit = async () => {
    const name = (document.getElementById('name') as HTMLInputElement).value;
    const surname = (document.getElementById('surname') as HTMLInputElement).value;
    const email = (document.getElementById('email') as HTMLInputElement).value;
    const username = (document.getElementById('username') as HTMLInputElement).value;
    const password = (document.getElementById('password') as HTMLInputElement).value;
    // const passwordAgain = (document.getElementById("password-again") as HTMLInputElement).value;

    handlePasswordChange();
    handleRequiredError();

    if (requiredError.length === 0 && !passwordError) {
      if (name.trim() === '' || surname.trim() === '' || username.trim() === '' || password.trim() === '') {
        return;
      }
      const user: IUserAdd = {
        name,
        surname,
        email,
        username,
        password,
      };

      const added = await addUser(user, selectValue);

      if (added) {
        notify('Uživatel byl úspěšně přidán! 🤗', NotificationType.SUCCESS, NotificationPosition.BR);
        setSelectValue(RoleEnum.USER);
        setRefresh(!refresh);
        setOpen(false);
      } else {
        notify('Uživatele se nepodařilo přidat! 😥', NotificationType.ERROR, NotificationPosition.BR);
      }
    }
  };

  return (
    <>
      <Dialog open={open} fullWidth>
        <DialogTitle>
          <b>Přidat uživatele</b>
        </DialogTitle>
        <DialogContent>
          <FormControl fullWidth>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Jméno"
              type="text"
              fullWidth
              required
              error={requiredError.includes('name')}
              helperText={requiredError.includes('name') ? 'Jméno nesmí být prázdné' : ''}
            />
            <TextField
              margin="dense"
              id="surname"
              label="Příjmení"
              type="text"
              fullWidth
              required
              error={requiredError.includes('surname')}
              helperText={requiredError.includes('surname') ? 'Příjmení nesmí být prázdné' : ''}
            />
            <TextField
              margin="dense"
              id="username"
              label="Přihlašovací jméno"
              type="text"
              fullWidth
              required
              error={requiredError.includes('username')}
              helperText={requiredError.includes('username') ? 'Přihlašovací jméno nesmí být prázdné' : ''}
            />
            <TextField margin="dense" id="email" label="Email" type="email" fullWidth />
            <TextField
              margin="dense"
              id="password"
              label="Heslo"
              type="password"
              fullWidth
              required
              error={passwordError}
              helperText={passwordErrorText}
              onChange={handlePasswordChange}
            />
            <TextField
              margin="dense"
              id="password-again"
              label="Heslo znovu"
              type="password"
              fullWidth
              required
              error={passwordError}
              helperText={passwordErrorText}
              onChange={handlePasswordChange}
            />
            <TextField
              margin="dense"
              id="role"
              label="Role"
              select
              fullWidth
              defaultValue={selectValue}
              helperText="Vyberte roli uživatele"
              required
            >
              {roleSelectValues.map(option => (
                <MenuItem key={option.value} value={option.value} onClick={() => setSelectValue(option.value)}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Zrušit</Button>
          <Button onClick={handleSubmit} variant="contained" endIcon={<PersonAddIcon />}>
            Přidat
          </Button>
        </DialogActions>
      </Dialog>
      <UserContentHeader handleClickOpen={handleClickOpen} />
      <UserContentDataProvider refresh={refresh} />
    </>
  );
};

export default UserContent;
