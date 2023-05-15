'use client'
import { IUser } from "@centrin/types/User/User";
import { removeToken } from "@centrin/utils/cookies";
import { useRouter } from "next/navigation";
import styles from '@centrin/styles/ui/ui.module.css';


interface Props{
    readonly user : IUser;
}

const Sidebar: React.FC<Props> = ({user}) => {
    const router = useRouter();
    
    const handleLogout = () => {
        console.log("Logout clicked");
        removeToken();
        router.replace("/login");
    }

    return (
        <div className={styles.sidebar}>
            <button onClick={handleLogout}>{user.displayName}</button>
        </div>
    )
};

export default Sidebar;
