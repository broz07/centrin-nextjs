'use client'
import { useState } from "react";
import { IUser } from "@centrin/types/User/User";
import { removeToken } from "@centrin/utils/cookies";
import { useRouter } from "next/navigation";
import Link from "next/link";
import styles from '@centrin/styles/ui/ui.module.css';
import Image from "next/image";
import { Avatar } from '@mui/material';

import PageLogo from '../../../public/assets/app-logo.svg'
import HomeIcon from '../../../public/assets/icon-home.svg'
import CustomersIcon from '../../../public/assets/icon-customers.svg'
import PanelIcon from '../../../public/assets/icon-search.svg'
import LogoutIcon from '../../../public/assets/icon-lock.svg'
import AdminIcon from '../../../public/assets/icon-admin.svg'
const defaultAvatar = '../../../public/assets/default-user-avatar.svg';


//TODO

interface Props{
    readonly user : IUser;
}

const Sidebar: React.FC<Props> = ({user}) => {
    const router = useRouter();
    const [avatar, setAvatar] = useState<string>(defaultAvatar)
    
    const handleLogout = () => {
        removeToken();
        router.replace("/login");
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
                            <span>Homepage</span>
                        </button>
                    </Link>
                </nav>
                <footer>
                    <button className={`${styles.userAvatar}`}>
                        <Avatar src={avatar} />
                        <span>{user.displayName}<br />{user.role.description}</span>
                    </button>
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
