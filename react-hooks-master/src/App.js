import React, { useState } from 'react';
import { PlusCircle, Save, X, Edit, Trash2, User, UserCircle } from 'lucide-react';

// Componente AddUserForm estilizado
const AddUserForm = ({ addUser }) => {
  const initialFormState = { id: null, name: '', username: '' };
  const [user, setUser] = useState(initialFormState);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!user.name || !user.username) return;
    addUser(user);
    setUser(initialFormState);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="name">
          Name
        </label>
        <input
          type="text"
          name="name"
          id="name"
          value={user.name}
          onChange={handleInputChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="username">
          Username
        </label>
        <input
          type="text"
          name="username"
          id="username"
          value={user.username}
          onChange={handleInputChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          required
        />
      </div>
      <button 
        onClick={handleSubmit} 
        className="inline-flex items-center px-4 py-2 bg-indigo-600 border border-transparent rounded-md font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
      >
        <PlusCircle className="mr-2 h-4 w-4" />
        Add User
      </button>
    </div>
  );
};

// Componente EditUserForm estilizado
const EditUserForm = ({ currentUser, updateUser, setEditing }) => {
  const [user, setUser] = useState(currentUser);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    updateUser(user.id, user);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-indigo-500">
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="edit-name">
          Name
        </label>
        <input
          type="text"
          name="name"
          id="edit-name"
          value={user.name}
          onChange={handleInputChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="edit-username">
          Username
        </label>
        <input
          type="text"
          name="username"
          id="edit-username"
          value={user.username}
          onChange={handleInputChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>
      <div className="flex space-x-3">
        <button 
          onClick={handleSubmit} 
          className="inline-flex items-center px-4 py-2 bg-green-600 border border-transparent rounded-md font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
        >
          <Save className="mr-2 h-4 w-4" />
          Update
        </button>
        <button 
          onClick={() => setEditing(false)} 
          className="inline-flex items-center px-4 py-2 bg-gray-200 border border-transparent rounded-md font-medium text-gray-700 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors"
        >
          <X className="mr-2 h-4 w-4" />
          Cancel
        </button>
      </div>
    </div>
  );
};

// Componente UserTable estilizado
const UserTable = ({ users, editRow, deleteUser }) => (
  <div className="overflow-x-auto shadow-md sm:rounded-lg">
    {users.length > 0 ? (
      <table className="w-full text-sm text-left text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3">Name</th>
            <th scope="col" className="px-6 py-3">Username</th>
            <th scope="col" className="px-6 py-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="bg-white border-b hover:bg-gray-50">
              <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{user.name}</td>
              <td className="px-6 py-4">{user.username}</td>
              <td className="px-6 py-4 space-x-2">
                <button
                  onClick={() => editRow(user)}
                  className="inline-flex items-center px-3 py-1 bg-blue-600 border border-transparent rounded-md text-xs font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                >
                  <Edit className="mr-1 h-3 w-3" />
                  Edit
                </button>
                <button
                  onClick={() => deleteUser(user.id)}
                  className="inline-flex items-center px-3 py-1 bg-red-600 border border-transparent rounded-md text-xs font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
                >
                  <Trash2 className="mr-1 h-3 w-3" />
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    ) : (
      <div className="text-center p-6 bg-white border rounded-lg">
        <p className="text-gray-500">No users found</p>
      </div>
    )}
  </div>
);

// Componente App principal
const App = () => {
  const usersData = [
    { id: 1, name: 'Tania', username: 'floppydiskette' },
    { id: 2, name: 'Craig', username: 'siliconeidolon' },
    { id: 3, name: 'Ben', username: 'benisphere' },
  ];

  const initialFormState = { id: null, name: '', username: '' };

  // Setting state
  const [users, setUsers] = useState(usersData);
  const [currentUser, setCurrentUser] = useState(initialFormState);
  const [editing, setEditing] = useState(false);

  // CRUD operations
  const addUser = (user) => {
    user.id = users.length + 1;
    setUsers([...users, user]);
  };

  const deleteUser = (id) => {
    setEditing(false);
    setUsers(users.filter((user) => user.id !== id));
  };

  const updateUser = (id, updatedUser) => {
    setEditing(false);
    setUsers(users.map((user) => (user.id === id ? updatedUser : user)));
  };

  const editRow = (user) => {
    setEditing(true);
    setCurrentUser({ id: user.id, name: user.name, username: user.username });
  };

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Crud de react com Hooks</h1>
          <p className="mt-2 text-gray-600">Manage your users with this simple interface</p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            {editing ? (
              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                  <Edit className="mr-2 h-5 w-5 text-indigo-600" />
                  Edit User
                </h2>
                <EditUserForm
                  currentUser={currentUser}
                  updateUser={updateUser}
                  setEditing={setEditing}
                />
              </div>
            ) : (
              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                  <PlusCircle className="mr-2 h-5 w-5 text-indigo-600" />
                  Add User
                </h2>
                <AddUserForm addUser={addUser} />
              </div>
            )}
          </div>
          
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <UserCircle className="mr-2 h-5 w-5 text-indigo-600" />
              User List
            </h2>
            <UserTable users={users} editRow={editRow} deleteUser={deleteUser} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;