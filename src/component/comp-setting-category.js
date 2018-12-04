import React, {Component} from 'react';
import '../asset/css/login.css';
import PageContentWallpaper from '../component/common/ef-pageContent';
import AddingModel from './common/adding-model';

export default class SettingCategoryComponent extends Component {
    constructor(props){
        super(props);
        this.state={

        }
        this.MyModel=[
            {field:"name",desc:"Name",placeholder:"Category name",required:true,type:"text",readonly:false},
            {field:"description",desc:"Description",placeholder:"Category Description",required:true,type:"text",readonly:false},
            {field:"capacity",desc:"Capacity",placeholder:"Category Capacity",required:true,type:"text",readonly:false},
        ];
        this.ModelName = "VehicleCategory";
    }
    render() {
        return (


            <PageContentWallpaper {...this.props} >

                <div className="row">
                    <div className="col-xs-12">
                        <h2>Category Setting</h2>
                    </div>

                </div>

                <div className="row">
                    <div className="col-xs-12">
                        <AddingModel
                        MyModel={this.MyModel}
                        ModelName={this.ModelName}
                        ListDisplayKey={["Name","Description","Capacity"]}
                        ListDeleteKey={[{field:"orgcode",type:"string"},{field:"name",type:"string"}]}
                        />
                    </div>
                </div>





            </PageContentWallpaper>


        );
    }
}