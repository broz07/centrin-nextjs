'use client'
import { RoleEnum, User } from "@centrin/types/User/User";
import { generateToken } from "@centrin/utils/auth";
import { setToken } from "@centrin/utils/cookies";
import { useRouter } from "next/navigation";

const TestUser: User = new User (1, "Test", "User", "", [RoleEnum.ADMIN]);

const LoginPage: React.FC = () => {
    const router = useRouter();
    const handleClick = async () => {
        console.log("Login clicked");
        setToken(await generateToken(TestUser.toJson()));
        router.push("/");
    };

    return (
        <div>
        <h1>Login</h1>
        <button onClick={handleClick}>Login</button>
        </div>
    );
};

export default LoginPage;