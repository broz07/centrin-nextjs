import AdminPage from "@centrin/components/admin/AdminPage";
import { RoleEnum } from "@centrin/types/user";
import { authUser } from "@centrin/utils/auth";
import { getUser, isLogged } from "@centrin/utils/auth";
import { redirect } from 'next/navigation';

const Admin = async () => {

    const logged = await isLogged();
    if (!logged) {
        redirect("/login");
    };
    
    const user = await getUser();
  
    if (!user) {
        redirect("/login");
    }

    const verified = await authUser([RoleEnum.ADMIN, RoleEnum.MANAGER, RoleEnum.REDITEL]);
    if (!verified) {
        redirect("/");
    }

    return (
        <AdminPage user={user} />
    )
};

export default Admin;