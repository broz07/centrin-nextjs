import { getDefects } from '@centrin/utils/defects';

const Testing = async () => {
	const data = await getDefects();

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
