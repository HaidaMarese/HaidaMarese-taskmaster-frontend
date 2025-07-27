import React, { useState, useEffect } from "react";
import { backendClient } from "../Clients/backendClient";
import { useNavigate } from "react-router-dom";
import StatusBadge from "../components/StatusBadge";

function DashboardPage() {
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [projectTitle, setProjectTitle] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskStatus, setTaskStatus] = useState("To Do");

  const rawToken = JSON.parse(localStorage.getItem("TaskMaster-app-token"));
  const token = rawToken?.startsWith("Bearer ") ? rawToken.split(" ")[1] : rawToken;
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const [projectRes, taskRes] = await Promise.all([
        backendClient.get("/projects", {
          headers: { Authorization: `Bearer ${token}` },
        }),
        backendClient.get("/tasks", {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);
      setProjects(projectRes.data);
      setTasks(taskRes.data);
    } catch (err) {
      console.error("Error fetching data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [token]);

  const handleAddProject = async () => {
    try {
      await backendClient.post(
        "/projects",
        { name: projectTitle, description: projectDescription },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setProjectTitle("");
      setProjectDescription("");
      setShowProjectModal(false);
      fetchData();
    } catch (err) {
      console.error("Failed to create project:", err);
    }
  };

  const handleAddTask = async () => {
    if (projects.length === 0) {
      alert("Please create a project first.");
      return;
    }

    try {
      const projectId = projects[0]._id;
      await backendClient.post(
        `/projects/${projectId}/tasks`,
        {
          title: taskTitle,
          description: taskDescription,
          status: taskStatus,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setTaskTitle("");
      setTaskDescription("");
      setTaskStatus("To Do");
      fetchData();
    } catch (err) {
      console.error("Failed to create task:", err);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await backendClient.delete(`/tasks/${taskId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchData();
    } catch (err) {
      console.error("Failed to delete task:", err);
    }
  };

  return (
    <main className="min-h-screen bg-gray-100 dark:bg-gray-900 pt-20 px-4 text-gray-800 dark:text-white">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">

        <div className="bg-white dark:bg-gray-800 p-6 rounded shadow-md">
          <h2 className="text-lg font-bold mb-4">Add New Task</h2>
          <input
            type="text"
            placeholder="Title"
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
            className="w-full border p-2 rounded mb-2 dark:bg-gray-700 dark:border-gray-600"
          />
          <textarea
            placeholder="Description"
            value={taskDescription}
            onChange={(e) => setTaskDescription(e.target.value)}
            className="w-full border p-2 rounded mb-2 dark:bg-gray-700 dark:border-gray-600"
          />
          <select
            value={taskStatus}
            onChange={(e) => setTaskStatus(e.target.value)}
            className="w-full border p-2 rounded mb-4 dark:bg-gray-700 dark:border-gray-600"
          >
            <option>To Do</option>
            <option>In Progress</option>
            <option>Done</option>
          </select>
          <button
            onClick={handleAddTask}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Add Task
          </button>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded shadow-md">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">My Projects</h2>
            <button
              className="bg-blue-600 text-white text-sm px-3 py-1 rounded hover:bg-blue-700"
              onClick={() => setShowProjectModal(true)}
            >
              New Project
            </button>
          </div>
          {loading ? (
            <p>Loading projects...</p>
          ) : projects.length === 0 ? (
            <p className="text-gray-500">No projects found.</p>
          ) : (
            <div className="space-y-4">
              {projects.map((project) => (
                <div
                  key={project._id}
                  className="p-4 border rounded shadow flex justify-between items-start dark:border-gray-600"
                >
                  <div>
                    <h3 className="font-semibold">{project.name}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {project.description}
                    </p>
                  </div>
                  <StatusBadge status={project.status || "To Do"} />
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded shadow-md">
          <h2 className="text-xl font-bold mb-4">Tasks</h2>
          {loading ? (
            <p>Loading tasks...</p>
          ) : tasks.length === 0 ? (
            <p className="text-gray-500">No tasks available.</p>
          ) : (
            <ul className="space-y-3">
              {tasks.map((task) => (
                <li
                  key={task._id}
                  className="p-3 border rounded shadow-sm bg-gray-50 dark:bg-gray-700 dark:border-gray-600"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-semibold">{task.title}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        {task.description}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <StatusBadge status={task.status} />
                      <button
                        onClick={() => handleDeleteTask(task._id)}
                        className="text-red-500 hover:text-red-700 font-semibold text-sm"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <footer className="text-center text-sm text-gray-500 dark:text-gray-400 mt-8">
        © 2025 TaskMaster • <span className="underline cursor-pointer">Privacy</span> •{" "}
        <span className="underline cursor-pointer">Terms</span>
      </footer>

      {showProjectModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded shadow-md w-[90%] max-w-md">
            <h2 className="text-xl font-bold mb-4">Add New Project</h2>
            <input
              type="text"
              placeholder="Project Title"
              value={projectTitle}
              onChange={(e) => setProjectTitle(e.target.value)}
              className="w-full border p-2 rounded mb-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <textarea
              placeholder="Project Description"
              value={projectDescription}
              onChange={(e) => setProjectDescription(e.target.value)}
              className="w-full border p-2 rounded mb-4 dark:bg-gray-700 dark:border-gray-600"
            />
            <div className="flex justify-end gap-2">
              <button
                className="bg-gray-300 dark:bg-gray-600 px-4 py-2 rounded"
                onClick={() => setShowProjectModal(false)}
              >
                Cancel
              </button>
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded"
                onClick={handleAddProject}
              >
                Add Project
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

export default DashboardPage;
