import React, {Component} from 'react';
import '../asset/css/login.css';
import PageContentWallpaper from '../component/common/ef-pageContent';

import Slider from 'react-animated-slider';
import 'react-animated-slider/build/horizontal.css';
import 'normalize.css/normalize.css';
import '../asset/css/silder-animations.css';
import '../asset/css/home-comp-main.css'


const content = [
    {
        title: 'Labour report integration',
        description:
            'PMIS powerful tools',
        button: '',
        image: 'https://www.pccwebworld.com/blogs/wp-content/uploads/2018/01/HR-System.png',
        user: 'Luan Gjokaj',
        userProfile: 'https://i.imgur.com/JSW6mEk.png'
    },
    {
        title: 'Labour report integration',
        description:
            'PMIS powerful tools.',
        button: '',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWOqczmOg0F0_gdd-y-1r6NmiGEeqMbY6T8MEJ3Og1f0huZE1v',
        user: 'Erich Behrens',
        userProfile: 'https://i.imgur.com/0Clfnu7.png'
    },
    {
        title: 'Phasellus volutpat metus',
        description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Duis mollis, est non commodo luctus, nisi erat porttitor ligula.',
        button: 'Buy now',
        image: './img/animation/anime3.png',
        user: 'Bruno Vizovskyy',
        userProfile: 'https://i.imgur.com/4KeKvtH.png'
    }
];


export default class HomeComponent extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (


            <PageContentWallpaper {...this.props} >


                <div className="wrapper">

                    <div className="col-xs-12">
                        <Slider className="slider-wrapper">
                            {content.map((item, index) => (
                                <div
                                    key={index}
                                    className="slider-content"
                                    style={{background: `url('${item.image}') no-repeat center center`}}
                                >
                                    <div className="inner">
                                        <h1>{item.title}</h1>
                                        <p>{item.description}</p>
                                        <button>{item.button}</button>
                                    </div>

                                </div>
                            ))}
                        </Slider>

                    </div>
                </div>


            </PageContentWallpaper>


        );
    }
}

