const createBudgetNode = ({id, value}) => ({
	id,
	type : 'budget',
	data : {budget : 0 },
	position : {x : Math.random() * 200, y : Math.random() * 200}
})


export default createBudgetNode