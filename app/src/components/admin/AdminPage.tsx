import { IUser } from "@centrin/types/User/User";
import PageLayout from "../ui/PageLayout";
import Sidebar from "../ui/Sidebar";
import PageContentWrapper from "../ui/PageContentWrapper";
import dynamic from "next/dynamic";

interface Props{
    readonly user : IUser;
}

const AdminPage: React.FC<Props> = ({user}) => {
    return (
        <PageLayout user={user}>
            <h1>Admin Panel</h1>
        </PageLayout>
    )
};

export default AdminPage;