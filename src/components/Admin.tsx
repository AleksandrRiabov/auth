import { Link } from 'react-router-dom'

const Admin = () => {
    return (
        <section>
            <h1>Admin Page</h1>
            <p>You must have been assigned an Admin role</p>
            <div>
                <Link to='/'>Home</Link>
            </div>
        </section> 
  )
}

export default Admin