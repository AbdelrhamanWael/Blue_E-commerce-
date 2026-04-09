import React from 'react'
import Product from './Product'

import 'swiper/css';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import {Autoplay , Navigation } from 'swiper/modules';
import './slideProduct.css'

const SlideProducts = ({data ,title}) => {
  return (
    <div className='slide_products slide'>
      <div className="container">
        <div className="top_slide">
          <h2>{title}</h2>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque, soluta!</p>
        </div>
        <Swiper 
        autoplay = {{
          delay: 2500,
          disableOnInteraction: false,
        }}
        loop={true}
        breakpoints={{
          320: { slidesPerView: 1, spaceBetween: 10 },
          480: { slidesPerView: 2, spaceBetween: 20 },
          768: { slidesPerView: 3, spaceBetween: 30 },
          1024: { slidesPerView: 4, spaceBetween: 30 },
          1200: { slidesPerView: 5, spaceBetween: 30 },
        }}
         navigation={true} modules={[Navigation , Autoplay ]} className="mySwiper">
          
          {data.map((item) => (
            <SwiperSlide key={item.id}>
              <Product item={item} />
            </SwiperSlide>
          ))}
          
          
          
          
        </Swiper>
        
      </div>
    </div>
  )
}

export default SlideProducts