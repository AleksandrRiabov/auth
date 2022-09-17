import { Link } from "react-router-dom"

const Missing = () => {
    return (
        <article>
            <p>Page Not Found</p>
            <div>
                <Link to='/'>Visit our home page</Link>
            </div>
        </article>
    )
}

export default Missing