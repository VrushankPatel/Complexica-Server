import { Component } from "react";

class CFooter extends Component {
    render() {
        const style = {
            backgroundColor: "#f2f5f3",
            borderTop: "1px solid #E7E7E7",
            textAlign: "center",
            padding: "10px",
            position: "fixed",
            left: "0",
            bottom: "0",
            height: "50px",
            width: "100%",
        }

        const phantom = {
            display: 'block',
            padding: '40px',
            height: '60px',
            width: '100%',
        }
        return (
            <div>
                <div style={phantom} />
                <div style={style}>
                    © Copyright 2021, Complexica : Vrushank Patel , All Rights Resereved.
                </div>
            </div >
        );
    }
}
export default CFooter;