/**
 * Created by dev1 on 2017/09/27.
 */
import React from 'react';
import { Button,Popover ,Modal,OverlayTrigger,Tooltip} from 'react-bootstrap';


class MyComponentModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
        };

        this.close = this.props.close.bind(this);
        this.open =this.props.open.bind(this);

    }
    componentWillMount() {
        let tmp=this.state;
        tmp.showModal=false;
        this.setState(tmp);
    }

    close() {
        this.setState({ showModal: false });
    }

    open() {
        this.setState({ showModal: true });
    }

    openclose(boo){
        alert("OpenClose "+boo);
        if(boo){
            this.open()
        }else{
            this.close()
        }
    }

    componentWillUpdate(nextProps){
        //console.log("===> nextProps >> ",nextProps);
    }

    render() {
        const popover = (
            <Popover id="modal-popover" title="popover">
                very popover. such engagement
            </Popover>
        );
        const tooltip = (
            <Tooltip id="modal-tooltip">
                wow.
            </Tooltip>
        );

        let data = [];
        for(var i in this.props.data){
            const key = i;
            const val = this.props.data[key];
            const row ={key:key,val:val};

            data.push(row);
        }

        return (
            <div>

                <Modal show={this.props.openclose} onHide={this.close}>
                    <Modal.Header closeButton>
                        <Modal.Title>{this.props.objectname}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body style={{height:"75%",overflow:"scroll"}}>

                        <div className="row">
                        <div className="col-lg-12">
                            <table className="table table-bordered">
                                <thead>
                                <tr><th colSpan="2"><span style={{color: "red"}}>DATA-INFO</span></th></tr>
                                </thead>
                                {data.map((obj)=>{
                                    return(
                                        <tr key={obj.key}>
                                            <th>{obj.key}</th>
                                            <td>{obj.val}</td>
                                        </tr>
                                    )
                                })}
                            </table>
                        </div>


                            </div>


                        </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.close}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

export default MyComponentModal;

