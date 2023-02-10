import { Handle, Position } from "reactflow";

const BudgetNode = ({data}) => {
	return (
		<>
			<Handle type='target' position={Position.Top}/>
			<div className="border-blue-500 border-2 p-2 rounded-md text-blue-500 font-bold">
				{data.budget}
			</div>
			<Handle type="source" position={Position.Bottom} id="a"/>
		</>
	)

}

export default BudgetNode