import { Route, Routes } from "react-router-dom";
import Admin from "./components/Admin";
import Editor from "./components/Editor";
import Layout from "./components/Layout";
import LinkPage from "./components/LinkPage";
import Login from "./components/Login";
import Lounge from "./components/Lounge";
import Missing from "./components/Missing";
import Register from "./components/Register";
import RequireAuth from "./components/RequireAuth";
import { Unauthorized } from "./components/Unauthorized";
import Home from "./components/Home";

const ROLES = {
  user: 2001,
  editor: 1984,
  admin: 5150
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />} >
        {/** public routes */}
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/linkpage' element={<LinkPage />} />
        <Route path='/unauthorized' element={<Unauthorized />} />

        {/** Protected routes */}
        <Route element={<RequireAuth allowedRoles={[ROLES.user]} />}>
          <Route path="/" element={<Home />} />
          <Route />
          <Route element={<RequireAuth allowedRoles={[ROLES.editor]} />}>
            <Route path='/editor' element={<Editor />} />
          </Route>
          <Route element={<RequireAuth allowedRoles={[ROLES.admin]} />}>
            <Route path='/admin' element={<Admin />} />
          </Route>
          <Route element={<RequireAuth allowedRoles={[ROLES.editor, ROLES.admin]} />}>
            <Route path='/lounge' element={<Lounge />} />
          </Route>
          {/** Catch calls */}
          <Route path='*' element={<Missing />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
