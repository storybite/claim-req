import React, { Component } from "react";
import Modal from "../UI/Modal";


class ErrorBoundary extends Component {
    state = {
        hasError: false,
        error: null,
    };

    componentDidCatch(error, errorInfo) {
        this.setState({
            hasError: true,
            error: error,
        });
    }

    onClick = (evt) =>{
        this.setState({
            hasError: false,
            error: null,
        });
    }   
    

    render() {
        if (this.state.hasError) {
            // 에러가 발생한 경우에는 에러 메시지를 표시합니다.
            return (
                <Modal>
                    <div style={{textAlign:"center", padding:"2rem"}}>
                        {this.state.error.message}
                    </div>
                    <button style={{display:"block", margin:"1rem auto", padding:"0.5rem 1rem"}} onClick={this.onClick}>close</button>
                </Modal>
            )
        }

        // 에러가 발생하지 않은 경우에는 자식 컴포넌트를 렌더링합니다.
        return this.props.children;
    }
}

export default ErrorBoundary;
