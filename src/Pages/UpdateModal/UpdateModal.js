import { Button } from 'flowbite-react';
import React from 'react';
import { toast } from 'react-hot-toast';
import Modal from "react-modal";
import { ToastContainer } from 'react-toastify';


const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };

  Modal.setAppElement("#root");

const UpdateModal = ({ singleTask, isReload, setIsReload }) => {

    const { _id, insertDate, email, task:myTask } = singleTask;

  let subtitle;
  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    // subtitle.style.color = "#f00";
  }

  function closeModal() {
    setIsOpen(false);
  }

  const handleUpdate = (event) => {
    event.preventDefault();
    const form = event.target;
    const newTask = form.newTask.value;
    // const email = form.email.value;
    // const review = form.review.value;

    fetch(`https://task-manager-server-weld.vercel.app/tasks/${_id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ newTask }),
    })
      .then((res) => res.json())
      .then((data) => {

        if (data.modifiedCount > 0) {
          toast.success("Updated Successfully", {
            position: "top-center",
            autoClose: 2000,
          });
          setIsReload(!isReload)
        }
        form.reset();

      })

  }
    return (
        <div>
      <ToastContainer />
      <Button onClick={openModal} size="xs">
        {" "}
        Update
      </Button>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <Button onClick={closeModal} className="btn btn-primary btn-sm ml-3">
          close
        </Button>
        <div className='p-3 '>Update Your Task</div>
        <div className=" p-3 color-4D4C7D">
          <form onSubmit={handleUpdate} className="container " >
            <div className="input-group mb-3 mt-5">
              <input
                type="text"
                className="form-control border rounded p-3 "
                placeholder="Update Your Task"
                aria-label="New Task"
                name='newTask'
              />
            </div>
            {/* <div className="input-group  mb-3 mt-5">
              <input
                type="text"
                className="form-control border rounded p-3"
                placeholder="Your Email"
                aria-label="Email"
                name='email'
                defaultValue={email}
                readOnly
              />
            </div> */}

            {/* <div className="input-group ">
              <textarea
                className="form-control border rounded p-6"
                placeholder="Update Review"
                aria-label="With textarea"
                name='review'
              ></textarea>
            </div> */}
            <div className="mt-4">
              <Button type="submit">
                Update
            </Button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
    );
};

export default UpdateModal;