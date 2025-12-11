"use client";

import React, { useState, useEffect } from "react";

interface IPerson {
  _id: string;
  name: string;
}

export default function Home() {
  const [people, setPeople] = useState<IPerson[]>([]);
  const [newName, setNewName] = useState("");
  const [editId, setEditId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  const [error, setError] = useState("");

  // Fetch all persons
  const fetchPeople = async () => {
    const res = await fetch("/api/person");
    const data = await res.json();
    setPeople(data);
  };

  useEffect(() => {
    fetchPeople();
  }, []);

  // Create
  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/person", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: newName }),
    });

    if (!res.ok) {
      const d = await res.json();
      alert(d.error);
      return;
    }

    setNewName("");
    fetchPeople();
  };

  // Delete
  const handleDelete = async (id: string) => {
    await fetch(`/api/person/${id}`, { method: "DELETE" });
    fetchPeople();
  };

  // Update
  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch(`/api/person/${editId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: editName }),
    });

    setEditId(null);
    setEditName("");
    fetchPeople();
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-xl">

      <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">
        Next.js + MongoDB CRUD
      </h1>

      {/* Add Person Form */}
      <form
        onSubmit={handleCreate}
        className="flex gap-3 mb-6"
      >
        <input
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          placeholder="Enter name"
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg 
             focus:ring-2 focus:ring-blue-400 focus:outline-none
             text-gray-900 placeholder-gray-600"
        />
        <button
          type="submit"
          className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 
                     transition-all font-semibold"
        >
          Add
        </button>
      </form>

      {/* Error */}
      {error && (
        <div className="text-red-600 font-medium mb-4">{error}</div>
      )}

      {/* List of People */}
      <ul className="space-y-4">
        {people.map((p) => (
          <li
            key={p._id}
            className="flex justify-between items-center p-4 bg-gray-100 rounded-lg shadow"
          >
            {editId === p._id ? (
              <form onSubmit={handleUpdate} className="flex w-full gap-3">
                <input
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-600"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-semibold"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => setEditId(null)}
                  className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 font-semibold"
                >
                  Cancel
                </button>
              </form>
            ) : (
              <>
                <span className="text-lg font-semibold text-gray-900">{p.name}</span>

                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      setEditId(p._id);
                      setEditName(p.name);
                    }}
                    className="px-3 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 font-semibold"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(p._id)}
                    className="px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-semibold"
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>

      {people.length === 0 && (
        <p className="text-center text-gray-400 mt-8">
          No people found. Add one above!
        </p>
      )}
    </div>
  );
}
