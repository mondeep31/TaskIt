// Component for the Task Management App
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/react";
import { format } from "date-fns";
import { Edit, Trash2, Check } from "lucide-react";
import { Task } from "../types/task";
import { RootState, addTask, updateTask, deleteTask } from "../store/taskSlice";
import PriorityDropdown from "./ui/Dropdown";

export function TaskManagerContent() {
  const dispatch = useDispatch();
  const tasks = useSelector((state: RootState) => state.tasks);
  const [newTask, setNewTask] = useState("");
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [filter, setFilter] = useState("all");
  const [priority, setPriority] = useState<"low" | "medium" | "high">("medium");
  const [date, setDate] = useState<Date | null>(null);

  const addTaskHandler = () => {
    if (newTask.trim()) {
      dispatch(
        addTask({
          id: Date.now(),
          title: newTask,
          completed: false,
          priority,
          dueDate: date ? format(date, "yyyy-MM-dd") : "",
        })
      );
      setNewTask("");
      setPriority("medium");
      setDate(null);
    }
  };
  const updateTaskHandler = (task: Task) => {
    dispatch(updateTask(task));
    setEditingTask(null);
  };

  const deleteTaskHandler = (id: number) => {
    dispatch(deleteTask(id));
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.completed;
    if (filter === "incomplete") return !task.completed;
    return true;
  });

  return (
    <div className="h-96 flex justify-center flex-col">
      <div className="max-w-4xl mx-auto p-4 space-y-4">
        <h1 className="text-2xl font-bold text-center mb-6">
          Task Management App
        </h1>

        <div className="flex space-x-2">
          <div className="flex-grow px-3 py-2 rounded flex items-center">
            <Input
              type="text"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              placeholder="Add a new task"
              className="flex-grow px-3 py-2 rounded"
            />
            <PriorityDropdown
              priority={priority || "medium"}
              setPriority={setPriority}
            />
            <Input
              type="date"
              value={date ? format(date, "yyyy-MM-dd") : ""}
              onChange={(e) =>
                setDate(e.target.value ? new Date(e.target.value) : null)
              }
              className="px-3 py-2"
            />
            <Button
              size="md"
              onClick={addTaskHandler}
              className="flex bg-blue-500 text-white rounded"
            >
              Add Task
            </Button>
          </div>
        </div>

        <div className="flex justify-center space-x-2 mb-4">
          <Button
            onClick={() => setFilter("all")}
            className={`px-4 py-2 rounded ${
              filter === "all" ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
          >
            All
          </Button>
          <Button
            onClick={() => setFilter("completed")}
            className={`px-4 py-2 rounded ${
              filter === "completed" ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
          >
            Completed
          </Button>
          <Button
            onClick={() => setFilter("incomplete")}
            className={`px-4 py-2 rounded ${
              filter === "incomplete" ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
          >
            Incomplete
          </Button>
        </div>

        <div className="space-y-2">
          {filteredTasks.map((task) => (
            <div
              key={task.id}
              className="flex items-center space-x-2 p-2 border rounded"
            >
              {editingTask?.id === task.id ? (
                <input
                  type="text"
                  value={editingTask.title}
                  onChange={(e) =>
                    setEditingTask({ ...editingTask, title: e.target.value })
                  }
                  className="flex-grow px-2 py-1 border rounded"
                />
              ) : (
                <span
                  className={`flex-grow ${
                    task.completed ? "line-through text-gray-500" : ""
                  }`}
                >
                  {task.title}
                </span>
              )}
              <span
                className={`text-sm px-2 py-1 rounded ${
                  task.priority === "low"
                    ? "bg-green-200 text-green-800"
                    : task.priority === "medium"
                    ? "bg-yellow-200 text-yellow-800"
                    : "bg-red-200 text-red-800"
                }`}
              >
                {task.priority}
              </span>
              {task.dueDate && (
                <span className="text-sm text-gray-500">{task.dueDate}</span>
              )}
              <button
                onClick={() =>
                  updateTaskHandler({ ...task, completed: !task.completed })
                }
                className="p-1 bg-gray-200 rounded"
              >
                <Check
                  className={`h-4 w-4 ${
                    task.completed ? "text-green-500" : "text-gray-500"
                  }`}
                />
              </button>
              {editingTask?.id === task.id ? (
                <button
                  onClick={() => updateTaskHandler(editingTask)}
                  className="px-2 py-1 bg-blue-500 text-white rounded"
                >
                  Save
                </button>
              ) : (
                <button
                  onClick={() => setEditingTask(task)}
                  className="p-1 bg-gray-200 rounded"
                >
                  <Edit className="h-4 w-4" />
                </button>
              )}
              <button
                onClick={() => deleteTaskHandler(task.id)}
                className="p-1 bg-gray-200 rounded"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
