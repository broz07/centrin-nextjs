'use client';
import { useState } from 'react';
import { IUser, RoleEnum } from '@centrin/types/users.dto';
import { removeToken } from '@centrin/utils/client/cookies';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from '@centrin/styles/ui/ui.module.css';
import Image from 'next/image';
import { Avatar } from '@mui/material';

// import StatIcon from '../../../public/assets/icon-chart-line.svg';
import DefectIcon from '../../../public/assets/report-2.svg';
//import StatIcon from '../../../public/assets/icon-bar-chart.svg'
import PageLogo from '../../../public/assets/app-logo.svg';
// import HomeIcon from '../../../public/assets/icon-home.svg';
import HomeIcon from '../../../public/assets/home.svg';

import AdminIcon from '../../../public/assets/icon-admin-panel.svg';
// import AdminIcon from '../../../public/assets/icon-shield.svg';
// import CustomersIcon from '../../../public/assets/icon-customers.svg'
// import PanelIcon from '../../../public/assets/icon-search.svg'
import LogoutIcon from '../../../public/assets/icon-lock.svg';
//const defaultAvatar = '../../../public/assets/default-user-avatar.svg';

interface Props {
	readonly user: IUser;
}

const Sidebar: React.FC<Props> = ({ user }) => {
	const router = useRouter();
	const [avatar, setAvatar] = useState<string | undefined>(undefined);

	const handleLogout = () => {
		removeToken();
		router.refresh();
	};

	const toggleOpen = () => {
		const sidebar = document.querySelector(`.${styles.sidebar}`);
		sidebar?.classList.toggle(`${styles.open}`);
	};

	const stringToColor = (string: string) => {
		let hash = 0;
		let i;

		/* eslint-disable no-bitwise */
		for (i = 0; i < string.length; i += 1) {
			hash = string.charCodeAt(i) + ((hash << 5) - hash);
		}

		let color = '#';

		for (i = 0; i < 3; i += 1) {
			const value = (hash >> (i * 8)) & 0xff;
			color += `00${value.toString(16)}`.slice(-2);
		}
		/* eslint-enable no-bitwise */

		return color;
	};

	const stringAvatar = (name: string) => {
		return {
			sx: {
				bgcolor: stringToColor(name),
			},
			children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
		};
	};

	return (
		<aside className={`${styles.sidebar}`}>
			<div className={`${styles.sidebarInner}`}>
				<header className={`${styles.sidebarHeader}`}>
					<button className={`${styles.sidebarBurger}`} onClick={toggleOpen} />
					<Image
						src={PageLogo}
						alt="Cetrin Logo"
						className={`${styles.sidebarLogo}`}
						height={20}
					/>
				</header>
				<nav className={`${styles.sidebarNav}`}>
					<Link href="/">
						<button type="button">
							<Image src={HomeIcon} alt="Home Icon" />
							<span>Hlavní stránka</span>
						</button>
					</Link>
					<Link href="/defects">
						<button type="button">
							<Image
								src="/assets/warning-amber.svg"
								width={30}
								height={30}
								alt="Defect Icon"
							/>
							<span>Aktivní závady</span>
						</button>
					</Link>
					<Link href="/defects/history">
						<button type="button">
							<Image
								src="/assets/history.svg"
								width={30}
								height={30}
								alt="Defect Icon"
							/>
							<span>Historie závad</span>
						</button>
					</Link>
					{/* {user.role.id === RoleEnum.ADMIN && (
						<Link href="/statistics">
							<button type="button">
								<Image src={StatIcon} alt="Stat Icon" />
								<span>Statistiky</span>
							</button>
						</Link>
					)} */}
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
							<Avatar {...stringAvatar(user.displayName)} />
							<span>
								{user.displayName}
								<br />
								{user.role.description}
							</span>
						</button>
					</Link>
					<button type="button" onClick={handleLogout}>
						<Image src={LogoutIcon} alt="Logout Icon" />
						<span>Logout</span>
					</button>
				</footer>
			</div>
		</aside>
	);
};

export default Sidebar;
