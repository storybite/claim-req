// AlertComponent.js

import ReactDOM from "react-dom";
import Panel from "../components/UI/Panel";
import Button from "../components/UI/Button";



const AlertComponent = ({ message, onClose }) => {
  const alertStyle = {
    position: "fixed",
    top: "30%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    // width: "100%",
    backgroundColor: "#232323",
    padding : "3rem",
    color: "#fff",
    fontSize: "1rem",
    boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.2)",
    borderRadius: "10px",
    zIndex: 1000,
  };

  const buttonStyle = {
    display :"flex",
    marginTop : "1rem",
    marginBottom : "-2rem",
    justifyContent : "center"
  };


  return (
    <>
        <div style={alertStyle} >
            {message}
            <div style={buttonStyle}>
              <Button style={{backgroundColor:"#741188"}}onClick={onClose}>닫기</Button>
            </div>
        </div>
        
    </>
  );
};




const Alert = (message, timeout = 3000) => {
  const container = document.querySelector("#alert")
  //document.body.appendChild(container);

  const closeAlert = () => {
    ReactDOM.unmountComponentAtNode(container);
    //document.body.removeChild(container);
  };

  //setTimeout(closeAlert, timeout);

  ReactDOM.render(<AlertComponent message={message} onClose={closeAlert} />, container);
};

export default Alert;