import React, {Component} from 'react';
import '../../asset/css/login.css';
import PageContentWallpaper from '../../component/common/ef-pageContent';



import FilteringCompent from './filtering';
import Database from './database';

export default class HomeComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            province: "",
            municipality: "",
            company: "",
            contract: "",
            Filter: null,
        }

    }

    componentDidMount() {

    }

    clearNewFilter=()=>{
        this.setState({
            Filter:null
        })
    }

    handleInput = (e, key) => {
        this.setState({[key]: e.target.value})
    }

    handleInputData = (data, key) => {
        this.setState({[key]: data})
    }


    render() {
        return (


            <PageContentWallpaper {...this.props} >
                <div className="wrapper">
                    <div className="col-xs-12">
                        {this.state.Filter ===null&&(
                        <FilteringCompent
                            state={this.state}
                            handleInput={this.handleInput}
                            handleInputData={this.handleInputData}
                        />
                        )}

                        {this.state.Filter !==null&&(
                            <Database
                                state={this.state}
                                clearNewFilter={this.clearNewFilter}
                                handleInput={this.handleInput}
                            />
                        )}
                    </div>
                </div>
            </PageContentWallpaper>


        );
    }
}

