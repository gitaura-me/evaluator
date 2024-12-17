import { useEffect, useState } from "react";
import Papa from "papaparse";

export default function Card() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    (async () => {
      const response = await fetch("/data/users.csv");
      const text = await response.text();
      Papa.parse(text, {
        header: true,
        skipEmptyLines: true,
        complete: (result) => {
          setUsers(result.data);
        },
      });
    })();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {users.map((user, index) => (
        <div key={index} className="card bg-base-100 shadow-lg">
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
      ))}
    </div>
  );
}
