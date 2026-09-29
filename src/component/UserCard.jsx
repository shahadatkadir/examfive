export default function UserCard({ user }) {
  return (
    <div className="bg-white p-5 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-all">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center font-bold text-lg">
            {user.name.charAt(0)}
          </div>
          <div>
            <h3 className="font-bold text-gray-800 text-base">{user.name}</h3>
            <p className="text-xs text-gray-500">@{user.username}</p>
          </div>
        </div>
        <span className="text-xs font-semibold bg-indigo-50 text-indigo-600 px-2.5 py-1 rounded-full">
          ID: {user.id}
        </span>
      </div>
      
      <div className="space-y-1.5 text-sm text-gray-600 border-t pt-3">
        <p className="flex items-center gap-2 truncate">
          <span className="text-indigo-500">✉️</span> {user.email}
        </p>
        <p className="flex items-center gap-2">
          <span className="text-indigo-500">📞</span> {user.phone}
        </p>
        <p className="flex items-center gap-2">
          <span className="text-indigo-500">📍</span> {user.address.city}
        </p>
      </div>
    </div>
  );
}