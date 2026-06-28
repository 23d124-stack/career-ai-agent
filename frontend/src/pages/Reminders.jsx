import { useEffect, useState } from "react";
import API from "../services/api";

function Reminders() {
  const email = localStorage.getItem("email");

  const [task, setTask] = useState("");
  const [dueDate, setDueDate] = useState("");

  const [reminders, setReminders] = useState([]);

  useEffect(() => {
    loadReminders();
  }, []);

  const loadReminders = async () => {
    try {
      const res = await API.get(`/reminders/${email}`);
      setReminders(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const addReminder = async () => {
    if (!task || !dueDate) {
      alert("Please fill all fields");
      return;
    }

    try {
      const res = await API.post("/add_reminder", {
        email,
        task,
        due_date: dueDate,
      });

      alert(res.data.message);

      setTask("");
      setDueDate("");

      loadReminders();
    } catch (err) {
      console.log(err);
      alert("Failed to add reminder");
    }
  };

  const completeReminder = async (id) => {
    try {
      const res = await API.put(`/reminders/${id}`);

      alert(res.data.message);

      loadReminders();
    } catch (err) {
      console.log(err);
      alert("Failed to update reminder");
    }
  };

  const deleteReminder = async (id) => {
    try {
      const res = await API.delete(`/reminders/${id}`);

      alert(res.data.message);

      loadReminders();
    } catch (err) {
      console.log(err);
      alert("Failed to delete reminder");
    }
  };

  return (
    <div className="max-w-6xl mx-auto">

      {/* Add Reminder */}
      <div className="bg-white p-6 rounded-xl shadow mb-6">

        <h1 className="text-3xl font-bold mb-4">
          Reminder Manager
        </h1>

        <div className="grid md:grid-cols-3 gap-4">

          <input
            type="text"
            placeholder="Task"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            className="border p-3 rounded"
          />

          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="border p-3 rounded"
          />

          <button
            onClick={addReminder}
            className="bg-blue-600 text-white rounded-lg"
          >
            Add Reminder
          </button>

        </div>

      </div>

      {/* Reminder List */}
      <div className="bg-white p-6 rounded-xl shadow">

        <h2 className="text-2xl font-bold mb-4">
          My Reminders
        </h2>

        {reminders.length === 0 ? (
          <p>No reminders found.</p>
        ) : (
          <div className="space-y-4">

            {reminders.map((reminder) => (

              <div
                key={reminder.id}
                className="border rounded-xl p-4 flex justify-between items-center"
              >

                <div>
                  <h3 className="font-bold">
                    {reminder.task}
                  </h3>

                  <p>
                    Due: {reminder.due_date}
                  </p>

                  <p
                    className={
                      reminder.status === "Completed"
                        ? "text-green-600"
                        : "text-orange-600"
                    }
                  >
                    {reminder.status}
                  </p>
                </div>

                <div className="flex gap-3">

                  {reminder.status !== "Completed" && (
                    <button
                      onClick={() =>
                        completeReminder(reminder.id)
                      }
                      className="bg-green-600 text-white px-4 py-2 rounded"
                    >
                      Complete
                    </button>
                  )}

                  <button
                    onClick={() =>
                      deleteReminder(reminder.id)
                    }
                    className="bg-red-600 text-white px-4 py-2 rounded"
                  >
                    Delete
                  </button>

                </div>

              </div>

            ))}

          </div>
        )}

      </div>

    </div>
  );
}

export default Reminders;