export default class Todo {
	todo: Object;

	getTodoFromStorage() {
		let todo = JSON.parse(localStorage.getItem("todo") || "null");
		if (!todo) {
			todo = {
				tasks: [
					{
						name: "Your Task goes here",
						completed: false,
					},
					{
						name: "Your completed Task goes here",
						completed: true,
					},
					{
						name: "Your Task goes here",
						completed: false,
					},
					{
						name: "Your completed Task goes here",
						completed: true,
					},
				],
				recycleBin: [
					{
						name: "Your deleted Task goes here",
						completed: true,
					},
					{
						name: "Your deleted Task goes here",
						completed: true,
					},
				],
			};
			localStorage.setItem("todo", JSON.stringify(todo));
		}
		console.log(todo);
		return todo;
	}
	constructor() {
		this.todo = this.getTodoFromStorage();
	}
}
