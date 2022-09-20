import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import axios from "../api/axios";
import { IAuth } from "../context/AuthProvider";
const LOGOUT_URL = 'logout';

const Home = () => {
  const { setAuth } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(LOGOUT_URL);
        setAuth({} as IAuth['auth']);
      navigate('/linkpage');
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <section>
      <h1>Home</h1>
      <br />
      <p>You are logged in!</p>
      <Link to="/editor">Go to the editor page.</Link>
      <br />
      <Link to="/admin">Go to the Admin page.</Link>
      <br />
      <Link to="/lounge">Go to the Lounge.</Link>
      <br />
      <Link to="/linkpage">Go to the linkpage page.</Link>
      <br />
      <div>
        <button onClick={handleLogout}>Sign Out</button>
      </div>
    </section>
  )
}

export default Home