
import{BrowserRouter  ,Routes,Route }from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import AddStudent from "./Pages/AddStudent";
import ViewStudent from "./Pages/ViewStudent";
import EditStudent from "./Pages/EditStudent";
function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/add-student" element={<AddStudent />}/>
      <Route path="/edit-student/:id" element={<EditStudent/>}/>
      <Route path="/student/:id" element={<ViewStudent />}/>
    </Routes>
    </BrowserRouter>
  )
}
export default App ;