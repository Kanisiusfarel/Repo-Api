import React, { useEffect, useState } from "react";
import axios from "axios";

const ManageEvent = () => {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch events from the API
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get("/api/admin/events", {
          headers: {
            Authorization: `Bearer YOUR_ACCESS_TOKEN`,
          },
        });
        setEvents(response.data); // Assume API returns an array of events
        setLoading(false);
      } catch (err) {
        setError("Failed to load events");
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // Handle delete event
  const handleDelete = async (eventId: string) => {
    try {
      await axios.delete(`/api/admin/events/${eventId}`, {
        headers: {
          Authorization: `Bearer YOUR_ACCESS_TOKEN`,
        },
      });
      setEvents(events.filter((event) => event.id !== eventId)); // Remove deleted event from the list
    } catch (err) {
      setError("Failed to delete event");
    }
  };

  // Handle edit event (redirect to create or edit page)
  const handleEdit = (eventId: string) => {
    window.location.href = `/admin/events/edit/${eventId}`;
  };

  return (
    <div className="w-full h-screen bg-gray-100 p-5">
      <div className="w-full max-w-7xl mx-auto bg-white p-6 shadow-lg rounded-lg">
        <h2 className="text-center text-3xl font-semibold text-gray-800 mb-6">Manage Events</h2>

        {loading && <p>Loading events...</p>}
        {error && <p className="text-red-500">{error}</p>}

        {!loading && !error && (
          <table className="w-full table-auto border-collapse border border-gray-200">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b text-left">Event Name</th>
                <th className="py-2 px-4 border-b text-left">Category</th>
                <th className="py-2 px-4 border-b text-left">Price</th>
                <th className="py-2 px-4 border-b text-left">Stock</th>
                <th className="py-2 px-4 border-b text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {events.map((event) => (
                <tr key={event.id}>
                  <td className="py-2 px-4 border-b">{event.name}</td>
                  <td className="py-2 px-4 border-b">{event.category}</td>
                  <td className="py-2 px-4 border-b">{event.price}</td>
                  <td className="py-2 px-4 border-b">{event.stock}</td>
                  <td className="py-2 px-4 border-b">
                    <button
                      onClick={() => handleEdit(event.id)}
                      className="text-blue-500 hover:text-blue-700 mr-3"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(event.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default ManageEvent;
