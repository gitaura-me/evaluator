import { useEffect, useState } from "react";

export default function App() {
  const [user, setUser] = useState(null);

  function getNextUser() {
    (async () => {
      const response = await fetch("/api/users");
      const users = await response.json();
      const noAura = users.filter((user) => !user?.aura);

      if (noAura.length === 0) {
        alert("No more users to review!");
        return;
      }

      const random =
        noAura[Math.floor(Math.random() * noAura.length)];
      setUser(random);
    })();
  }

  useEffect(() => {
    getNextUser();
  }, []);

  return (
    <main className="w-1/2 mx-auto">
      <div className="card bg-base-100 shadow-lg">
        <div className="card-body">
          <h2 className="card-title">{user?.login}</h2>
          <p>
            <a
              href={user?.link}
              className="text-blue-500 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              {user?.link}
            </a>
          </p>
          <p>⭐ Stars: {user?.stars}</p>
          <p>📂 Public Repos: {user?.public_repos}</p>
          <p>👥 Followers: {user?.followers}</p>
          <p>🔄 Contributions: {user?.contributions}</p>
        </div>
      </div>
      <form method="POST" action="/api/aura">
        <input type="hidden" name="user_id" value={user?._id} />
        <input
          type="number"
          name="aura"
          className="input input-bordered mt-2"
          min="-69696969"
          max="69696969"
          required
        />
        <button type="submit" className="btn btn-outline btn-primary mt-2">
          git aura'd
        </button>
      </form>
      <button onClick={getNextUser}>Next</button>
    </main>
  );
}
