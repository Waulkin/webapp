import { Link } from 'react-router-dom';
const Navigation = () => {
    return (  
        <nav className="navigation">
            <h1>Navigation Placeholder Name</h1>
            <div className="nav-links">
            
                <Link to="app/">Home</Link>
                &nbsp;&nbsp;&nbsp;
                <Link to="app/user">User</Link>
                &nbsp;&nbsp;&nbsp;
                <Link to="app/inventory">Inventory</Link>
            </div>
        </nav>
    );
}
 
export default Navigation;