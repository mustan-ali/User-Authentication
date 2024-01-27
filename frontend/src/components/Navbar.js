import { Link } from 'react-router-dom'

const Navbar = () => {

    return (
        <header>
            <div className="container">
                <nav>
                    <div>
                        <Link to="/">Home</Link>
                        <Link to="/login">Login</Link>
                        <Link to="/register">Signup</Link>
                    </div>
                </nav>
            </div>
        </header>
    )
}

export default Navbar