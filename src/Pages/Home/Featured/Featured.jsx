import React from 'react';
import SectionTitle from '../../../components/SectionTite/SectionTitle';

import featuredImg from '../../../assets/home/featured.jpg'
import './Featured.css'

const Featured = () => {
    return (
        <div className='featured-item text-white pt-8 my-20 bg-fixed'>
            <SectionTitle
            subHeading={'check it out'}
            heading={'Featured Item'}
            ></SectionTitle>
          <div className='md:flex gap-5 items-center justify-center pb-20 pt-12 px-4 md:px-36 bg-gray-500 bg-opacity-50'>
          <div>
                <img src={featuredImg} alt="" />
            </div>
            <div>
                <p>Aug 20, 2029</p>
                <p className=' uppercase'>Where can i get some?</p>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum, reprehenderit dolores cumque aliquid aliquam aspernatur recusandae, ad laboriosam saepe iste eos quisquam? Minima nobis obcaecati voluptas labore? Ab aliquam est nemo magnam assumenda dolor, repellendus obcaecati nihil vel eaque culpa omnis odio impedit, cupiditate at doloribus, illo dolore itaque debitis?</p>
                <button className='btn btn-outline border-0 border-b-2'>Order Now</button>
            </div>
          </div>
        </div>
    );
};

export default Featured;