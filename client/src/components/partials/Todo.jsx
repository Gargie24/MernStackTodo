import React from "react";
import moment from "moment/moment";
import { ToastContainer, toast } from "react-toastify";
import { deleteTodoApi,MarkTodoApi,updateTodoApi } from "../../services/api.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit, faCheckCircle } from "@fortawesome/free-solid-svg-icons";
function Todo(props) {

  const handleDelete = async (_id) => {
    console.log(_id);
    const result = await deleteTodoApi({
      todo_id: _id
    });
    
    if (result.data.status === 200) {
      props.setRefreshList(new Date())
      toast("Deleted");
    } else {
      toast("Failed to delete,please try again");
    }
  };
  //update Todo

  const handleUpdate = async (_id) => {
    console.log("update todo id");
    console.log(_id);
    const updatedContent = prompt("Update your todo:", props.desc); // Prompt the user for the updated content
    console.log("updated content")
    console.log(updatedContent);
    if (updatedContent !== null) {
      const result = await updateTodoApi({
        todo_id: _id,
        desc: updatedContent, // Send the updated content to the server
      });
       console.log(result);
      if (result.data.status === 200) {
        props.setRefreshList(new Date());
        toast("Updated");
      } 
       if (result.data.message) {
        toast(result.data.message);
      } else {
        toast("Failed to update, please try again");
      }
    }
  };
  
  //mark todo
  const handleMarkTodo = async(_id)=>{
    const result = await MarkTodoApi({
      todo_id: _id
    });

    if (result.data.status === 200){
      props.setRefreshList(new Date())
      toast(result.data.message);
    } else {
      toast("Failed to mark,please try again");
    }
  };
  
  return (
    <div className="col-sm-4 mx-4 my-3 alert bg-light">
      <div className="card-header">
        {/* {props?.isCompleted ? "Completed" : "Not Completed"} */}
      </div>
      <div className="card-body">
        <h4 className="card-title">{props?.desc}</h4>
        <p className="card-text">{moment(props?.date).fromNow()}</p>
       
      </div>
      
      <div
        className="actionButtons"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
      {/* delete button */}

      <div className="deleteButton">
          {/* Replace the delete button with the delete icon */}
          <button
            style={{ background: "transparent", border: "none" }}
            onClick={() => {
              handleDelete(props._id);
            }}
          >
            <FontAwesomeIcon icon={faTrash} className="text-danger" />
          </button>
        </div>
       {/* mark todo */}
       <div className="markTodo">
          {/* Always show the "Mark Completed" icon */}
          <button
            onClick={() => {
              handleMarkTodo(props._id);
            }}
            style={{ background: "transparent", border: "none" }}
          >
            <FontAwesomeIcon icon={faCheckCircle} className={`text-${props?.isCompleted ? "success" : "secondary"}`} />
          </button>
        </div>
     {/* update button */}
     <div className="updateButton">
          <button
            onClick={() => {
              handleUpdate(props._id);
            }}
            style={{ background: "transparent", border: "none" }}
          >
            <FontAwesomeIcon icon={faEdit} className="text-primary" />
          </button>
        </div>
       
      </div>
      
    </div>
  );
}

export default Todo;
