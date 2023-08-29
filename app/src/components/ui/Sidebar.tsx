'use client';
import { useState } from 'react';
import { IUser, RoleEnum } from '@centrin/types/users.dto';
import { removeToken } from '@centrin/utils/client/cookies';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from '@centrin/styles/ui/ui.module.css';
import Image from 'next/image';
import { Avatar } from '@mui/material';

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
						src="/assets/app-logo.svg"
						alt="Cetrin Logo"
						className={`${styles.sidebarLogo}`}
						height={20}
						width={20}
					/>
				</header>
				<nav className={`${styles.sidebarNav}`}>
					<Link href="/">
						<button type="button">
							<Image
								src="/assets/home.svg"
								alt="Home Icon"
								width={30}
								height={30}
							/>
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
					{[RoleEnum.ADMIN, RoleEnum.MANAGER, RoleEnum.UDRZBA].includes(
						user.role.id,
					) && (
						<Link href="/workplans">
							<button type="button">
								<Image
									src="/assets/event-note.svg"
									alt="Workplan Icon"
									width={30}
									height={30}
								/>
								<span>Pracovní plány</span>
							</button>
						</Link>
					)}
					{user.role.id === RoleEnum.ADMIN && (
						<Link href="/admin">
							<button type="button">
								<Image
									src="/assets/icon-admin-panel.svg"
									alt="Admin Icon"
									width={30}
									height={30}
								/>
								<span>Administrace</span>
							</button>
						</Link>
					)}
				</nav>
				<footer>
					<Link href="/">
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
						<Image
							src="/assets/icon-lock.svg"
							alt="Logout Icon"
							width={30}
							height={30}
						/>
						<span>Logout</span>
					</button>
				</footer>
			</div>
		</aside>
	);
};

export default Sidebar;
