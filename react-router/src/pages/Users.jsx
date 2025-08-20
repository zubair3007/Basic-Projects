import {Link} from "react-router";

const users  =[
    {id:"1", name:"ALice"},
    {id:"2", name:"Bob"},
    {id:"3", name:"Charlie"}

];

export default function Users(){
    return (
      <div>
        <h1>👥 Users</h1>
        <ul>
            {users.map(user =>(
                <li key={user.id}>
                    <Link to={`/users/${user.id}`}>{user.name}</Link>
                </li>
            ))}
        </ul>
      </div>
    );
}