import React, {Component} from 'react';
import '../asset/css/login.css';
import PageContentWallpaper from '../component/common/ef-pageContent';
import AddingModel from './common/adding-model';

export default class VehicleComponent extends Component {
    constructor(props){
        super(props);
        this.state={

        }
        /*
        OrgCode  string
	Maker  string
	Model  string
	Year  string
	Color  string
	BodyType  string
	EngineNumber  string
	RegNumber  string
	InitialMileage  string
	PurchaseDate  string
	Category  string
         */
        this.MyModel=[
            {field:"regnumber",desc:"Reg. Number",placeholder:"Registration Number",required:true,type:"text",readonly:false},
            {field:"maker",desc:"Maker",placeholder:"Vehicle Maker",required:true,type:"text",readonly:false},
            {field:"model",desc:"Model",placeholder:"Vehicle Model",required:true,type:"text",readonly:false},
            {field:"year",desc:"year",placeholder:"Year of fabrication",required:true,type:"text",readonly:false},
            {field:"color",desc:"Color",placeholder:"Body Color",required:true,type:"text",readonly:false},
            {field:"bodytype",desc:"Body Type",placeholder:"Body Type",required:true,type:"text",readonly:false},
            {field:"enginenumber",desc:"Engine Number",placeholder:"Engine Number",required:true,type:"text",readonly:false},
            {field:"initialmileage",desc:"Initial Mileage",placeholder:"Initial Mileage",required:true,type:"text",readonly:false},
            {field:"purchasedate",desc:"Purchase Date",placeholder:"Purchase Date",required:true,type:"text",readonly:false},

            {field:"category",desc:"Category",placeholder:"Vehicle Category",required:true,type:"text",readonly:false,
            filter:true,filterTable:"VehicleCategory",filterKey:"name",filterValue:"description"},
        ];
        this.ModelName = "Vehicle";
    }
    render() {
        return (


            <PageContentWallpaper {...this.props} >

                <div className="row">
                    <div className="col-xs-12">
                        <h2>&nbsp;&nbsp;&nbsp;Vehicle Setting</h2>
                    </div>

                </div>

                <div className="row">
                    <div className="col-xs-12">
                        <AddingModel
                            MyModel={this.MyModel}
                            ModelName={this.ModelName}
                            EntryData={this.state.EntryData}
                            ListDisplayKey={["RegNumber","Maker","Model"]}
                            ListDeleteKey={[{field:"orgcode",type:"string"},{field:"regnumber",type:"string"}]}
                        />
                    </div>
                </div>





            </PageContentWallpaper>


        );
    }
}

/*
Body types:

1. Hatchback
2. Sedan
3. MUV/SUV
4. Coupe
5. Convertible
6. Wagon
7. Van
8. Jeep
 */