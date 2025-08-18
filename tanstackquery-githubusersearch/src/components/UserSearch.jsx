import { useState } from "react";

import {
  useUserQuery,
  useReposInfiniteQuery,
  useFavouriteMutation,
} from "../hooks/useGithubQueries.jsx";


export default function UserSearch() {
  const [username, setUsername] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [favourites, setFavourites] = useState([]);

  //user query
  const {
    data: user,
    isLoading: userLoading,
    error: userError,
  } = useUserQuery(searchTerm);

  // Repos infinite query (pagination)

    const {
      data: reposData,
      isLoading: reposLoading,
      fetchNextPage,
      hasNextPage,
      isFetchingNextPage,
    } = useReposInfiniteQuery(searchTerm, user);

    // Favourite mutation
    const favouriteMutation = useFavouriteMutation(favourites, setFavourites);

    const handleSearch= () =>{
        setSearchTerm(username);
    };

    const handleFavourites = (username)=>{
        favouriteMutation.mutate(username);

    };

    return (
      <div style={{ padding: "16px", maxWidth: "500px", margin: "0 auto" }}>
        <h1
          style={{
            fontSize: "1.5rem",
            fontWeight: "bold",
            marginBottom: "16px",
          }}
        >
          GitHub User Search
        </h1>
        <input
          type="text"
          onClick={handleSearch}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter Github username"
          style={{
            border: "1px solid #ccc",
            padding: "8px",
            width: "100%",
            marginBottom: "8px",
          }}
        />

        <button
          style={{
            background: "#3b82f6",
            color: "white",
            padding: "8px",
            borderRadius: "4px",
          }}
          onClick={handleSearch}
        >
          Search
        </button>

        {userLoading && <p>Loading user...</p>}
        {userError && (
          <p style={{ color: "red" }}>Error: {userError.message}</p>
        )}
        {user && (
          <div style={{ marginTop: "16px" }}>
            <img
              src={user.avatar_url}
              alt={user.login}
              style={{ width: "96px", height: "96px", borderRadius: "50%" }}
            />
            <h2 style={{ fontSize: "1.25rem" }}>{user.login}</h2>
            <p>{user.bio || "No bio"}</p>
            <p>Followers: {user.followers}</p>
            <button
              onClick={() => handleFavourites(user.login)}
              style={{
                background: favourites.includes(user.login)
                  ? "#6b7280"
                  : "#22c55e",
                color: "white",
                padding: "4px 8px",
                marginTop: "8px",
                borderRadius: "4px",
              }}
              disabled={favourites.includes(user.login)}
            >
              {favourites.includes(user.login) ? "Favourited" : "Favourite"}
            </button>
          </div>
        )}

        {reposLoading && <p>Loading repos...</p>}
        {reposData && (
          <div style={{ marginTop: "16px" }}>
            <h3 style={{ fontSize: "1.125rem", fontWeight: "600" }}>
              Repositories:
            </h3>
            <ul>
              {reposData.pages.flat().map((repo) => (
                <li key={repo.id}>
                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: "#2563eb" }}
                  >
                    {repo.name}
                  </a>
                </li>
              ))}
            </ul>
            {hasNextPage && (
              <button
                onClick={() => fetchNextPage()}
                disabled={isFetchingNextPage}
                style={{
                  background: "#3b82f6",
                  color: "white",
                  padding: "8px",
                  marginTop: "8px",
                  borderRadius: "4px",
                }}
              >
                {isFetchingNextPage ? "Loading more..." : "Load More"}
              </button>
            )}
          </div>
        )}
      </div>
    );
}