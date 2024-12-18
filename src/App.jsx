import { useEffect, useState } from "react";
import Papa from "papaparse";

export default function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    (async () => {
      const response = await fetch("/data/users.csv");
      const text = await response.text();
      Papa.parse(text, {
        header: true,
        skipEmptyLines: true,
        complete: (result) => {
          console.log(result.data);
          setUsers(result.data);
        },
      });
    })();
  }, []);

  function getNextUser() {
    (async () => {
      const response = await fetch("/api/users");
      const data = await response.json();

      const newUser = users.filter(
        (user) => !data.some((newUser) => newUser.login === user.login)
      );

      console.log(newUser);
    })();
  }

  return (
    <main className="w-1/2 mx-auto">
      <button>Next</button>
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
