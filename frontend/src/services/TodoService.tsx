import axios from "axios";
import { Todo } from "../types/Todo";

const API_URL = "http://localhost:5021/api/todo"; 



export const getTodos = async () => {
  const response = await axios.get<Todo[]>(API_URL);
  console.log("TEXT", response.data);
  return response.data;
};

export const createTodo = async (todo: Omit<Todo, "id">): Promise<Todo> => {
  const response = await axios.post<Todo>(API_URL, todo);
  return response.data;
};

export const updateTodo = async (id: number, todo: Partial<Todo>): Promise<Todo> => {
  const response = await axios.put<Todo>(`${API_URL}/${id}`, { ...todo, id });
  return response.data;
};

export const deleteTodo = async (id: number): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`);
}
