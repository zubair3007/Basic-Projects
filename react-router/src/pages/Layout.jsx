import { Link, Outlet} from 'react-router';


export default function Layout() {

    return(
        <div>
        <h1>My site</h1>
        <nav style={{marginBottom:"20px"}}>
            <Link to="/">Home</Link> | {""}
            <Link to="/about">About</Link> | {""}
            <Link to="/users">Users</Link>


        </nav>
        <Outlet/>
        
        </div>
    )

};