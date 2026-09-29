import { useState, useEffect } from 'react';
import UserCard from './component/UserCard'; 

export default function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [query, setQuery] = useState('');

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch');
        return res.json();
      })
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError(true);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (searchTerm) {
      document.title = `Search: ${searchTerm} - User Directory`;
    } else {
      document.title = `User Directory (${users.length} Users)`;
    }
  }, [searchTerm, users]);

  const handleSearch = (e) => {
    e.preventDefault();
    setQuery(searchTerm);
  };

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(query.toLowerCase().trim())
  );

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-indigo-600">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mb-4"></div>
        <p className="text-lg font-medium">Loading users...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <div className="bg-red-50 border border-red-200 p-6 rounded-xl text-center max-w-md shadow-sm text-red-500">
          <p className="text-xl font-bold mb-2">⚠️ Failed to load users.</p>
          <p className="text-sm text-gray-600">Please try again later.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        
        <div className="bg-gradient-to-r from-indigo-600 to-violet-600 rounded-2xl p-6 sm:p-8 text-white shadow-lg mb-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold">User Directory</h1>
            <p className="text-indigo-100 text-sm mt-1">Total Users: {users.length}</p>
          </div>

          <form onSubmit={handleSearch} className="flex items-center gap-2 w-full md:w-auto">
            <div className="relative w-full md:w-80">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                🔍
              </span>
              <input
                type="text"
                placeholder="Search by name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-300 text-sm bg-white/95 backdrop-blur-sm shadow-inner"
              />
            </div>
            <button type="submit" className="bg-white text-indigo-600 px-5 py-2.5 rounded-lg font-semibold text-sm hover:bg-indigo-50 transition-all shadow-md active:scale-95 cursor-pointer">
              Search
            </button>
          </form>
        </div>

       
        {filteredUsers.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredUsers.map((user) => (
              <UserCard key={user.id} user={user} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-gray-500 bg-white rounded-xl shadow-sm border border-gray-100">
            কোনো ইউজার পাওয়া যায়নি!
          </div>
        )}

      </div>
    </div>
  );
}