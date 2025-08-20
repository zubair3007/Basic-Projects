import { useParams, useNavigate } from "react-router";

const userData ={
   "1": { name: "Alice", info: "Alice loves cats 🐱" },
  "2": { name: "Bob", info: "Bob enjoys hiking 🥾" },
  "3": { name: "Charlie", info: "Charlie plays guitar 🎸" }
};

export default function UserDetail(){
    const {id} = useParams();
    const navigate= useNavigate();

    const user= userData[id];

    if(!user){
        return <h1>User not found ❌</h1>;
    }


return (
  <div>
    <h2>{user.name}</h2>
    <p>{user.info}</p>
    <button onClick={() => navigate("/users")}>⬅ Back to Users</button>
  </div>
);
}