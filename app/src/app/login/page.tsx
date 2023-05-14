import LoginPage from "@centrin/components/login/LoginPage";
import { isLogged } from "@centrin/utils/auth";
import { redirect } from 'next/navigation';

const Login = async () => {
    if (await isLogged()){
        redirect("/");
    }
    return <LoginPage />;
};

export default Login;