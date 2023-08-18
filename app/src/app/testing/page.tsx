import { getAllDefects } from '@centrin/utils/server/defects';

const Testing = async () => {
	const data = await getAllDefects();

	return (
		<div>
			<h1>Testing</h1>
			<div>
				{data.map((item: any, index: any) => {
					return <div key={index}>{item.description}</div>;
				})}
			</div>
		</div>
	);
};

export default Testing;
