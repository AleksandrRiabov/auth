import { Link } from 'react-router-dom'
import Users from './Users'

const Admin = () => {
    return (
        <section>
            <h1>Admin Page</h1>
            <Users/>
            <br/>
            <div>
                <Link to='/'>Home</Link>
            </div>
        </section> 
  )
}

export default Admin