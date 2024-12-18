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
      console.log(randomUser);
      setUser(randomUser);
    })();
  }

  return (
    <main className="w-1/2 mx-auto">
      <button onClick={getNextUser}>Next</button>
      <div className="card bg-base-100 shadow-lg">
        <div className="card-body">
          <h2 className="card-title">{user.login}</h2>
          <p>
            <a
              href={user.link}
              className="text-blue-500 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              {user.link}
            </a>
          </p>
          <p>⭐ Stars: {user.stars}</p>
          <p>📂 Public Repos: {user.public_repos}</p>
          <p>👥 Followers: {user.followers}</p>
          <p>🔄 Contributions: {user.contributions}</p>
        </div>
      </div>
    </main>
  );
}
