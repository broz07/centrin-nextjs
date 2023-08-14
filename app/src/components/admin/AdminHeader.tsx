'use client';
import styles from '@centrin/styles/admin/admin.module.css';
import { IAdminContentState, planContent, statsContent, userContent } from './AdminPage';
import { Button, ButtonGroup } from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import EditCalendarIcon from '@mui/icons-material/EditCalendar';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';

interface Props {
  content: IAdminContentState;
  setContent: React.Dispatch<React.SetStateAction<IAdminContentState>>;
}

const AdminHeader: React.FC<Props> = ({ content, setContent }) => {
  return (
    <div className={styles.headerWrapper}>
      <div className={styles.headerGroup}>
        <h1>Admin Panel</h1>
        <span>{content.description}</span>
      </div>
      <div className={styles.buttonsWrapper}>
        <ButtonGroup>
          <Button startIcon={<PeopleIcon />} onClick={() => setContent(userContent)}>
            Uživatelé
          </Button>
          <Button startIcon={<EditCalendarIcon />} onClick={() => setContent(planContent)}>
            Plány
          </Button>
          <Button startIcon={<LeaderboardIcon />} onClick={() => setContent(statsContent)}>
            Statistiky
          </Button>
        </ButtonGroup>
      </div>
    </div>
  );
};

export default AdminHeader;
