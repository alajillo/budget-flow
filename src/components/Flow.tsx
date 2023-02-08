import React, { useMemo } from 'react';
import ReactFlow, {Panel} from 'reactflow';
import { shallow } from 'zustand/shallow';
import BudgetNode from './CustomNode';
import 'reactflow/dist/style.css';
import createBudgetNode from '../nodeTemplates/budgetNode';
import useStore from '../store';

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
  addNode : state.addNode,
  budget : state.budget,
  onChangeBudget : state.onChangeBudget
});

function Flow() {
	const nodeTypes = useMemo(() => ({budget :BudgetNode}),[])	
	const { nodes, edges, onNodesChange, onEdgesChange, onConnect, addNode, budget, onChangeBudget } = useStore(selector, shallow);
	const onCreateBudgetNode = () => {
		const newNode = createBudgetNode({id : `budget-${nodes.length}`, data : { value : 0}})
		addNode(newNode)
	}
	return (
	<ReactFlow
		nodes={nodes}
		edges={edges}
		onNodesChange={onNodesChange}
		onEdgesChange={onEdgesChange}
		onConnect={onConnect}
		nodeTypes={nodeTypes}
		fitView
	>
		<Panel position='top-center'>
			<button 
				className=' bg-blue-500 border-blue-500 border-4 p-4 rounded-md text-white font-bold'
				onClick={onCreateBudgetNode}
				>
					create budget node
			</button>
		</Panel>
		<Panel position='top-left'>
			<input
				type='number'
				value={budget}
				className=' bg-blue-500 border-blue-500 border-4 p-4 rounded-md text-white font-bold'
				onChange={(e) => onChangeBudget(e.target.value)}
				/>
		</Panel>
	</ReactFlow>
  );
}

export default Flow;