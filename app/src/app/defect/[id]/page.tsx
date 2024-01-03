import DefectDetailPage from "@centrin/components/defect/DefectDetailPage";
import PageContent from "@centrin/components/ui/PageContent";
import PageHeader from "@centrin/components/ui/PageHeader";
import PageLayout from "@centrin/components/ui/PageLayout";
import { UserContextProvider } from "@centrin/contexts/UserContext";
import { IFullDefect } from "@centrin/types/defects.dto";
import { getUser, isLogged } from "@centrin/utils/server/auth";
import { getDefect } from "@centrin/utils/server/defects";
import { redirect } from "next/navigation";

const DefectPage = async ({ params }: { params: { id: string } }) => {
    const logged = await isLogged();
	if (!logged) {
		redirect('/login');
	}

	const user = await getUser();

	if (!user) {
		redirect('/login');
	}

	const { id } = params

	const defect: IFullDefect | false= await getDefect(parseInt(id));

	// console.log(defect);

	if (!defect) {
		//TODO
		return(
			<PageLayout user={user}>
				<h1>Defect not found</h1>
			</PageLayout>
		)
	}

    return (
		<PageLayout user={user}>
			<PageHeader>
				<h1 style={{margin: 0}}>Detail závady</h1>
			</PageHeader>
			<PageContent>
				<DefectDetailPage defect={defect} />
			</PageContent>
		</PageLayout>
    );
};

export default DefectPage;