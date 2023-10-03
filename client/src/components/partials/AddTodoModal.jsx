import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import {createTodoApi} from '../../services/api';
function AddTodoModal({setRefreshList}) {
   const[todoDesc,setTodoDesc] = useState('');
   const handleTodoSubmit =  async ()=>{
      console.log(todoDesc,'todoDesc');
      if(todoDesc === ''){
         toast('todo is required')
         return;
      }
      const result = await createTodoApi({desc:todoDesc});
      if(result.status === 200 && result.data.status === 200){
        toast('todo added to your list');
        setRefreshList(new Date())
        setTodoDesc('')

      }
      else{
        toast(result.data.message);
      }
   }


  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <button onClick={handleShowModal} className="btn btn-success" color= "green">
        Add
      </button>
      <ToastContainer/>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Your new Todo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="form-group">
            <textarea
              name=""
              className="form-control"
              rows={3}
              onChange={(e)=>{setTodoDesc(e.target.value)}}
              placeholder="Enter todos..."
            ></textarea>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={()=>{setTodoDesc('')}} data-bs-dismiss="model">
            Close
          </Button>
          <Button variant="primary" onClick={handleTodoSubmit}  >
            Add new Todo
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddTodoModal;
