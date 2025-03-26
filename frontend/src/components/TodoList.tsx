import { useEffect, useState } from "react";
import { getTodos, deleteTodo, updateTodo } from "../services/TodoService";
import { Todo } from "../types/Todo";
import { MoodEmoji } from "../types/Emoji";
import ToDoForm  from "./Todoform";





const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);

  useEffect(() => {
    loadTodos();
  }, []);

  const loadTodos = async () => {
    try {
      const data = await getTodos();
      setTodos(data);
    } catch (error) {
      console.error("Fejl ved hentning af to-do's:", error);
    }
  };

  const handleDelete = async (id : number) => {
    await deleteTodo(id);
    loadTodos(); // Opdater listen efter sletning
  };

  const handleToggleComplete = async (todo: Todo) => {
    const updatedTodo = { ...todo, isCompleted: !todo.isCompleted };
    console.log("Updating todo:", updatedTodo); // Log dataene før opdatering
    try {
      await updateTodo(todo.id, updatedTodo);
      loadTodos(); // Opdater listen efter statusændring
    } catch (error) {
      console.error("Fejl ved opdatering af to-do:", error);
    }
  };

  const handleUpdate = (todo: Todo) => {
    setEditingTodo(todo);
  };

  return (
    <div className="container mx-auto max-w-2xl px-6 py-8 flex flex-col items-center">
      <h1 className="text-3xl font-bold text-gray-700 mb-6">Todos</h1>

      <button 
        onClick={() => setEditingTodo({ id: 0, title: "", description: "", mood: 1, isCompleted: false, dueDate: "" })} 
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
      >
        + 
      </button>

      {editingTodo && (
        <ToDoForm 
          existingTodo={editingTodo.id ? editingTodo : undefined} 
          onSave={() => { 
            setEditingTodo(null);
            loadTodos(); 
          }} 
        />
      )}

      <div className="w-full space-y-4">
        {todos.map((todo) => (
          <div key={todo.id} className="w-full p-6 bg-white shadow-md rounded-lg border border-gray-200 text-center">
            <h2 className="text-xl font-semibold text-gray-800">{todo.title}</h2>
            <p className="text-gray-600 text-sm mt-2">{todo.description}</p>
            <span className="text-2xl">{MoodEmoji(todo.mood)}</span>
            

            <div className="flex space-x-2 justify-center mt-2">
              <span className={`px-3 py-1 rounded-full text-sm ${todo.isCompleted ? 'bg-green-500 text-white' : 'bg-yellow-500 text-black'}`}>
                {todo.isCompleted ? 'Afsluttet' : 'You can do it!'}
              </span>

              {!todo.isCompleted && todo.isOverdue && (
                <span className="px-3 py-1 bg-red-50 text-red-600 font-semibold rounded-full">
                  Overskredet
                </span>
              )}
            </div>

            <div className="text-sm text-gray-500">
              Forfaldsdato: {new Date(todo.dueDate).toLocaleDateString("da-DK")}
            </div>

            <div className="flex space-x-3 mt-4 justify-center">
              <button 
                onClick={() => handleDelete(todo.id)} 
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-300"
              >
                Slet
              </button>

              <button 
                onClick={() => handleUpdate(todo)}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
              >
                Opdater
              </button>
              
              <button
                onClick={() => handleToggleComplete(todo)}
                className={`px-3 py-1 rounded-full text-sm 'bg-green-500 text-white`}
              >
                {todo.isCompleted ? 'Fortryd' : 'Godkend'}
              </button>
            
              )
            
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodoList;
