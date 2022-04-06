import React from 'react';
import Picture from '../img/1.jpg';

function About() {
  return(
    <section id="about" className='bg-dark d-flex'>
      <div>
        
      </div>
      <div>
        <img src={Picture} alt="사진"/>
      </div>
    </section>
  );
}

export default About;