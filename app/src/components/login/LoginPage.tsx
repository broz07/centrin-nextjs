'use client'

import { generateToken, login } from "@centrin/utils/auth";
import { setToken } from "@centrin/utils/cookies";
import { NotificationPosition, NotificationType, notify } from "@centrin/utils/notify";
import { useRouter } from "next/navigation";

const LoginPage: React.FC = () => {
    const router = useRouter();
    const handleClick = async () => {
        const user =  await login("admin", "admin");
        if (!user) {
            console.log("test");
            notify("Nesprávné přihlašovací údaje! 😢", NotificationType.ERROR);
            return;
        }
        const token = await generateToken(user)
        setToken(token);
        notify("Přihlášení proběhlo úspěšně! 🤗", NotificationType.SUCCESS, NotificationPosition.BR)
        router.replace("/");
    };

    return (
        <div>
        <h1>Login</h1>
        <button onClick={handleClick}>Login</button>
        </div>
    );
};

export default LoginPage;