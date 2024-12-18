import { useEffect, useState } from "react";

export default function App() {
  const [user, setUser] = useState(null);

  function getNextUser() {
    (async () => {
      const response = await fetch("/api/users");
      const users = await response.json();
      const filteredUsers = users.filter((user) => !user.feedback_given);

      if (filteredUsers.length === 0) {
        alert("No more users to review!");
        return;
      }

      const randomUser =
        filteredUsers[Math.floor(Math.random() * filteredUsers.length)];
      setUser(randomUser);
    })();
  }

  return (
    <main className="w-1/2 mx-auto">
      <button onClick={getNextUser}>Next</button>
      <div className="card bg-base-100 shadow-lg">
        <div className="card-body">
          <h2 className="card-title">{users[0]?.login}</h2>
          <p>
            <a
              href={users[0]?.link}
              className="text-blue-500 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              {users[0]?.link}
            </a>
          </p>
          <p>⭐ Stars: {users[0]?.stars}</p>
          <p>📂 Public Repos: {users[0]?.public_repos}</p>
          <p>👥 Followers: {users[0]?.followers}</p>
          <p>🔄 Contributions: {users[0]?.contributions}</p>
        </div>
      </div>
    </main>
  );
}
