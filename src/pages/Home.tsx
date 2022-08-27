import { Link } from "react-router-dom"



const Home = () => {
  return (
    <main>
      Home
      <Link to="/login" >Login </Link>
      <Link to="/register">Register</Link>
    </main>
  )
}

export default Home