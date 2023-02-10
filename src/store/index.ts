import create from 'zustand'
import {
	Connection,
	Edge,
	EdgeChange,
	Node,
	addEdge,
	OnNodesChange,
	OnEdgesChange,
	OnConnect,
	applyNodeChanges,
	applyEdgeChanges,
	NodeChange,
} from 'reactflow'
import { nodes, edges } from '../constant'

type RFState = {
	nodes : Node[],
	edges : Edge[],
	onNodesChange : OnNodesChange,
	onEdgesChange : OnEdgesChange,
	onConnect : OnConnect
}

const useStore = create<RFState>((set,get) => ({
	nodes,
	edges,
	budget : 0,
	onNodesChange : (changes : NodeChange[]) => {
		set({
			nodes : applyNodeChanges(changes,get().nodes)
		})
	},
	onEdgesChange : (changes : EdgeChange[]) => {
		set({
			edges : applyEdgeChanges(changes, get().edges)
		})
	},
	getNodeById : (targetId : string) => {
		const { nodes } = get();
		return nodes.find(({id}) => targetId === id)
	},
	onChangeBudget : (value : number) => {
		set({
			budget : value
		})
	},
	onConnect : (connection : Connection) => {
		const { nodes, edges, budget, getNodeById } = get();
		set({
			edges : addEdge({
				...connection,
				label : budget,
				animated : true
			}, edges)
		})
		const {source, target} = connection;
		const sourceNode = getNodeById(source);
		const targetNode = getNodeById(target);
		set({
			nodes : nodes.map(node => {
				if(node.id === targetNode.id){
					return {
						...node,
						data : {
							budget : (parseInt(sourceNode.data.budget) + parseInt(budget))
						}
					}
				}
				return node;
			})
		})
	},
	addNode : (node) => {
		const { nodes : prevNodes} = get();
		set({
			nodes : [node, ...prevNodes]
		})
	}
}))

export default useStore