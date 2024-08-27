import { useEffect, useState } from "react";
import ToDo from "./component/ToDo";
import { getAllToDo ,addToDo ,updateToDo ,deleteToDo} from "./utils/handleApi";

function App() {

  const[todo,setToDo]=useState([]);
  const[text,settext]=useState("");
  const[isUpdating,setIsUpdating]=useState(false);
  const[toDoId,setToDoId]=useState("");

  useEffect(()=>{
    getAllToDo(setToDo)
  },[]);

  const updateMode=(_id,text)=>{
    setIsUpdating(true);
    settext(text);
    setToDoId(_id);

  }

  return (
    <div className="App">
      <div className="container">
        <h1>ToDo App</h1>
        <div className="top">
          <input type="text" 
          placeholder="Add ToDos...." 
          value={text} 
          onChange={(e)=>settext(e.target.value)} 
          />
          <div className="add" 
            onClick={isUpdating ? ()=>updateToDo(toDoId,text,setToDo,settext,setIsUpdating):
            ()=>addToDo(text,settext,setToDo)}>
            {isUpdating ? "Update" : "Add"}
          </div>
        </div>
        <div className="list">
          {todo.map((item)=> <ToDo key={item._id} text={item.text}
          updateMode={()=>updateMode(item._id,item.text)} 
          deleteToDo={()=>deleteToDo(item._id,setToDo)}
          />)}
        </div>
      </div>
    </div>
  );
}

export default App;
