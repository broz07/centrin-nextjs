'use client'

import { useDefectContext } from "@centrin/contexts/DefectPage/DefectContext";
import { NotificationPosition, NotificationType, notify } from "@centrin/utils/client/notify";
import { getDefects } from "@centrin/utils/server/defects";
import { useEffect } from "react";

const DefectsContent: React.FC = () => {
    const { defects, setDefects, refresh, refreshFlag } = useDefectContext();

    useEffect(() => {
        const fetchDefects = async () => {
            const fetchedDefects = await getDefects()

            if (!fetchedDefects) {
                notify("Nepodařilo se načíst závady! 😓", NotificationType.ERROR, NotificationPosition.BR, 2000)
                return
            }

            setDefects(fetchedDefects)
        }

        fetchDefects()
    }, [refreshFlag, setDefects]);

    return (
        <div>
            <h1>Defects</h1>
            {/* {defects.map((defect) => (
                <div key={defect.id}>
                    <p>{defect.description}</p>
                    </div>
            ))} */}
        </div>
    )
}

export default DefectsContent