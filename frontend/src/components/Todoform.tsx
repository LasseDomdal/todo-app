import { useState, useEffect } from "react";
import { createTodo, updateTodo } from "../services/TodoService";
import { Todo } from "../types/Todo";
import { MoodEmoji } from "../types/Emoji";

interface Props {
  existingTodo?: Todo;
  onSave: () => void;
}

const ToDoForm: React.FC<Props> = ({ existingTodo, onSave }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [mood, setMood] = useState(2);
  const [dueDate, setDueDate] = useState("");

  const moodOptions = [
    { value: 1, label: `${MoodEmoji(1)} Glad` },
    { value: 2, label: `${MoodEmoji(2)} Neutral` },
    { value: 3, label: `${MoodEmoji(3)} Trist` },
    { value: 4, label: `${MoodEmoji(4)} Spændt` },
    { value: 5, label: `${MoodEmoji(5)} Træt` },
  ];


  useEffect(() => {
    if (existingTodo) {
      setTitle(existingTodo.title);
      setDescription(existingTodo.description || "");
      setMood(existingTodo.mood);
      setDueDate(existingTodo.dueDate.split("T")[0]);
    }
  }, [existingTodo]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const todoData = { title, description, mood, dueDate, isCompleted: false };

    try {
      if (existingTodo) {
        await updateTodo(existingTodo.id, todoData);
      } else {
        await createTodo(todoData);
      }
      onSave();
    } catch (error) {
      console.error("Fejl ved gemning:", error);
    }
  };

  return (
    <div className="p-4 bg-white shadow-md rounded-md text-black">
      <h2 className="text-xl font-semibold mb-4 ">{existingTodo ? "Opdater Opgave" : "Opret Ny Opgave"}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Titel"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded text-color black"
          required
        />
        <textarea
          placeholder="Beskrivelse"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        />
        <select
          value={mood}
          onChange={(e) => setMood(Number(e.target.value))}
          className="w-full p-2 border border-gray-300 rounded"
          required
        >
          <option value="" disabled>
            Choose mood
          </option>
          {moodOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
        >
          {existingTodo ? "Opdater Opgave" : "Opret Opgave"}
        </button>
      </form>
    </div>
  );
};

export default ToDoForm;
