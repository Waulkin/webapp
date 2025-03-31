import { Link } from 'react-router-dom';
const Navigation = () => {
    return (  
        <nav className="navigation">
            <h1>Navigation Placeholder Name</h1>
            <div className="nav-links">
            
                <Link to="/">Home</Link>
                &nbsp;&nbsp;&nbsp;
                <Link to="/user">User</Link>
                &nbsp;&nbsp;&nbsp;
                <Link to="/inventory">Inventory</Link>
            </div>
        </nav>
    );
}
 
export default Navigation;