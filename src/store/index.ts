import create from 'zustand'
import {
	Connection,
	Edge,
	EdgeChange,
	Node,
	NodeAddChange,
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
		return get().nodes.find(({id}) => targetId === id)
	},
	onChangeBudget : (value : number) => {
		set({
			budget : value
		})
	},
	onConnect : (connection : Connection) => {
		set({
			edges : addEdge({
				...connection,
				label : get().budget,
				animated : true
			}, get().edges)
		})
		const {source, target} = connection;
		const sourceNode = get().getNodeById(source);
		const targetNode = get().getNodeById(target);
		set({
			nodes : get().nodes.map(node => {
				if(node.id === targetNode.id){
					return {
						...node,
						data : {
							budget : (parseInt(sourceNode.data.budget) + parseInt(get().budget))
						}
					}
				}
				return node;
			})
		})
	},
	addNode : (node) => {
		set({
			nodes : [node, ...get().nodes]
		})
	}
}))

export default useStore