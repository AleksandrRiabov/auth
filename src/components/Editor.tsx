import { Link } from 'react-router-dom'

const Editor = () => {
    return (
        <section>
            <h1>Editor Page</h1>
            <p>You must have been assigned an Editor role</p>
            <div>
                <Link to='/'>Home</Link>
            </div>
        </section> 
  )
}

export default Editor