import { useEffect, useState } from "react";

export default function App() {
  const [user, setUser] = useState(null);
  const [theme, setTheme] = useState("light");

  function getNextUser() {
    (async () => {
      const response = await fetch("/api/users");
      const users = await response.json();
      const noAura = users.filter(
        (user) => user?.aura === undefined || user?.aura === null
      );

      if (noAura.length === 0) {
        alert("No more users to review!");
        return;
      }

      const random = noAura[Math.floor(Math.random() * noAura.length)];
      setUser(random);
    })();
  }

  useEffect(() => {
    const theme = localStorage.getItem("theme");
    if (theme) {
      setTheme(theme);
      document.documentElement.setAttribute("data-theme", theme);
    }
    getNextUser();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const body = Object.fromEntries(formData);

    const response = await fetch("/api/aura", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    getNextUser();
  }

  return (
    <main className="w-1/2 mx-auto pt-40">
      <div className="card shadow-lg bg-base-200">
        <figure className="h-50">
          <input
            type="checkbox"
            className="toggle toggle-primary absolute top-2 right-2"
            {...(theme === "dark" && { checked: true })}
            onChange={() => {
              const newTheme = theme === "light" ? "dark" : "light";
              setTheme(newTheme);
              document.documentElement.setAttribute("data-theme", newTheme);
              localStorage.setItem("theme", newTheme);
            }}
          />
          <img src="/image.png" alt="gitaura.me" />
        </figure>
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
          <form onSubmit={handleSubmit} className="join mt-4">
            <input type="hidden" name="user_id" value={user?._id} />
            <input
              type="number"
              name="aura"
              className="input input-bordered join-item"
              min="-69696969"
              max="69696969"
              required
            />
            <button
              type="submit"
              className="btn btn-outline btn-primary join-item"
            >
              git aura'd
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
