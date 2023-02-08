import { Handle, Position } from "reactflow";

const BudgetNode = ({data}) => {
	return (
		<>
			<Handle type='target' position={Position.Top}/>
			<div className=" p-3 border border-red-400">
				{data.budget}
			</div>
			<Handle type="source" position={Position.Bottom} id="a"/>
		</>
	)

}

export default BudgetNode