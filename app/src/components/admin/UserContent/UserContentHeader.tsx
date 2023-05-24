'use client'
import styles from '@centrin/styles/admin/admin.module.css'
import { Button } from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

interface Props{
    handleClickOpen: () => void;
}

const UserContentHeader: React.FC<Props> = ({handleClickOpen}) => {
    return (
        <div className={styles.userContentHeader}>
            <h3>Tabulka uživatelů</h3>
            <Button 
                variant="contained" 
                size="small" 
                startIcon={<PersonAddIcon/>} 
                sx={{
                    backgroundColor: "#f6f6f6",
                    color: "#303030",
                    '&:hover': {
                        backgroundColor: "#e6e6e6",
                        color: "#303030",
                    }

                }}
                onClick={handleClickOpen}
            >
                Přidat uživatele
            </Button>
        </div>
    );
}

export default UserContentHeader;