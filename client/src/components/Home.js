import React from 'react';
import Slider from './Slider';
import Launches from './Launches';
import '../styles/Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <Slider 
        data={[
          'https://picsum.photos/200',
          'https://picsum.photos/300',
          'https://picsum.photos/400'
        ]} 
      />
      <Launches 
        data={{
          '/a': 'https://picsum.photos/200/100',
          '/b': 'https://picsum.photos/200/100',
          '/c': 'https://picsum.photos/100',
          '/d': 'https://picsum.photos/300',
          '/e': 'https://picsum.photos/1000',
          '/f': 'https://picsum.photos/100',
          '/g': 'https://picsum.photos/100',
          '/h': 'https://picsum.photos/300',
        }} 
      />
    </div>
  );
}

export default Home;
