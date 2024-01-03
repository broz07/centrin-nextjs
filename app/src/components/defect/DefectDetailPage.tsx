import { IFullDefect } from "@centrin/types/defects.dto";

interface Props{
    defect: IFullDefect;
}

const DefectDetailPage: React.FC<Props> = ({defect}) => {
    return (
        <div>
            {defect.description}
        </div>
    );
};

export default DefectDetailPage;