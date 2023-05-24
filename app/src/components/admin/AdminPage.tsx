'use client'

import { IUser } from "@centrin/types/User/User";
import PageLayout from "../ui/PageLayout";
import PageHeader from "../ui/PageHeader";
import AdminHeader from "./AdminHeader";
import PageContent from "../ui/PageContent";
import { useState } from "react";
import PlanContentDataProvider from "./PlanContent/PlanContentDataProvider";
import StatsContentDataProvider from "./StatsContent/StatsContentDataProvider";
import UserContent from "./UserContent/UserContent";

interface Props{
    readonly user : IUser;
}

export interface IAdminContentState{
    content : string;
    description : string;
}

export const userContent: IAdminContentState = {
    content : "users",
    description : "Správa uživatelů"
}

export const planContent: IAdminContentState = {
    content : "plans",
    description : "Správa týdenních plánů"
}

export const statsContent: IAdminContentState = {
    content : "stats",
    description : "Uživatelské statistiky"
}

const AdminPage: React.FC<Props> = ({user}) => {
    const [content, setContent] = useState<IAdminContentState>(userContent);

    return (
        <PageLayout user={user}>
            <PageHeader>
                <AdminHeader content={content} setContent={setContent}/>
            </PageHeader>
            <PageContent>
                {content === userContent && <UserContent /> }
                {content === planContent && <PlanContentDataProvider /> }
                {content === statsContent && <StatsContentDataProvider /> }
            </PageContent>
        </PageLayout>
    )
};

export default AdminPage;