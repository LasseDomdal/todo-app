
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TodoList from "./components/TodoList";

function App() {
  return (
    <div className="flex justify-center items-center h-screen">
<Router>
      <Routes>
        <Route path="/" element={<TodoList />} />
      </Routes>
    </Router>
 
    </div>
    ); 
}

export default App;
