import React from 'react';
import Slider from "react-slick";
import './styles.scss';

function SliderLogin() {

    var settings = {
        dots: false,
        arrows: false,
        infinite: true,
        speed: 300,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        fade: true,
    };

    var slideImages = [
        {
            url: 'images/lego.jpg',
            caption: 'Slide 1'
        },
        {
            url: 'images/gunpla.jpg',
            caption: 'Slide 2'
        },
        {
            url: 'images/figure.jpg',
            caption: 'Slide 3'
        },

    ];

    return (
        <Slider {...settings}>
            {slideImages.map((photo, index) => {
                return (
                    <div key={index} className='authenCarousel'>
                        <img className='SliderImg' src={photo.url} />
                    </div>
                )
            })}
        </Slider>
    )
}

SliderLogin.propTypes = {

}

export default SliderLogin

