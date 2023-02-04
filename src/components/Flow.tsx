import { useState } from 'react';
import ReactFlow, { Controls, Background} from 'reactflow';
import 'reactflow/dist/style.css';

const Flow = () => {
	const nodes = [
		{
			id : '1',
			data : {
				label : 'Hello'
			},
			position : {
				x : 20,
				y : 20,
			},
		},
		{
			id : '2',
			data : {
				label : 'Hello'
			},
			position : {
				x : 100,
				y : 100,
			},
		}
	]
	const edges = [
		{
			id : '1-2',
			source: '1',
			target : '2',
			label : 'to the',
			type : 'step'
		}
	]
	return (
		<div className='w-full h-full'>
			<ReactFlow
				nodes={nodes}
				edges={edges}
			>
				<Background/>
				<Controls/>
			</ReactFlow>
		</div>
	)
}

export default Flow;