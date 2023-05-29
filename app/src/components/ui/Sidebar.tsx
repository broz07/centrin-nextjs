'use client'
import { useState } from "react";
import { IUser, RoleEnum } from "@centrin/types/User/User";
import { removeToken } from "@centrin/utils/cookies";
import { useRouter } from "next/navigation";
import Link from "next/link";
import styles from '@centrin/styles/ui/ui.module.css';
import Image from "next/image";
import { Avatar } from '@mui/material';


import StatIcon from '../../../public/assets/icon-chart-line.svg'
import DefectIcon from '../../../public/assets/icon-alarm.svg'
//import StatIcon from '../../../public/assets/icon-bar-chart.svg'
import PageLogo from '../../../public/assets/app-logo.svg'
import HomeIcon from '../../../public/assets/icon-home.svg'
//import AdminIcon from '../../../public/assets/icon-admin-panel.svg'
import AdminIcon from '../../../public/assets/icon-shield.svg'
// import CustomersIcon from '../../../public/assets/icon-customers.svg'
// import PanelIcon from '../../../public/assets/icon-search.svg'
import LogoutIcon from '../../../public/assets/icon-lock.svg'
//const defaultAvatar = '../../../public/assets/default-user-avatar.svg';

interface Props{
    readonly user : IUser;
}

const Sidebar: React.FC<Props> = ({user}) => {
    const router = useRouter();
    const [avatar, setAvatar] = useState<string|undefined>(undefined)
    
    const handleLogout = () => {
        removeToken();
        router.refresh();
    };

    const toggleOpen = () => {
        const sidebar = document.querySelector(`.${styles.sidebar}`);
        sidebar?.classList.toggle(`${styles.open}`);
    }

    return (
        <aside className={`${styles.sidebar}`}>
            <div className={`${styles.sidebarInner}`}>
                <header className={`${styles.sidebarHeader}`}>
                    <button className={`${styles.sidebarBurger}`} onClick={toggleOpen} />
                    <Image src={PageLogo} alt="Cetrin Logo" className={`${styles.sidebarLogo}`} height={20}/>
                </header>                
                <nav className={`${styles.sidebarNav}`}>
                    <Link href="/">
                        <button type="button">
                            <Image src={HomeIcon} alt="Home Icon"/>
                            <span>Hlavní stránka</span>
                        </button>
                    </Link>
                    <Link href="/defects">
                        <button type="button">
                            <Image src={DefectIcon} alt="Defect Icon"/>
                            <span>Závady</span>
                        </button>
                    </Link>
                    {user.role.id === RoleEnum.ADMIN && (
                        <Link href="/statistics">
                            <button type="button">
                                <Image src={StatIcon} alt="Stat Icon"/>
                                <span>Statistiky</span>
                            </button>
                        </Link>
                    )}
                    {user.role.id === RoleEnum.ADMIN && (
                        <Link href="/admin">
                            <button type="button">
                                <Image src={AdminIcon} alt="Admin Icon" />
                                <span>Administrace</span>
                            </button>
                        </Link>
                    )}
                </nav>
                <footer>
                    <Link href="/profile">
                        <button className={`${styles.userAvatar}`}>
                            <Avatar src={avatar} />
                            <span>{user.displayName}<br />{user.role.description}</span>
                        </button>
                    </Link>
                    <button type="button" onClick={handleLogout}>
                        <Image src={LogoutIcon} alt="Logout Icon"/>
                        <span>Logout</span>
                    </button>
                </footer>
            </div>
        </aside>
    );    
};

export default Sidebar;
