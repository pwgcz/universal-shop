import React, { Component } from 'react';
import Title from './Title'
import {FaInfo} from 'react-icons/fa';

export default class Informations extends Component {
  state={
    informations:[
      {
        icon:<FaInfo />,
        title:'Information about',
        content:'You can pass some informations in this componenet'
      },
      {
        icon:<FaInfo />,
        title:'Information about',
        content:'You can pass some informations in this componenet'
      },
      {
        icon:<FaInfo />,
        title:'Information about',
        content:'You can pass some informations in this componenet'
      }
    ]
  }

  render() {
    return (
      <section className='services'>
        <Title title='Information' />
        <div className='services-center'>
          {this.state.informations.map((item, index)=>{
            return(
             <article key={index} className='service'>
              <span>{item.icon}</span>
              <h6>{item.title}</h6>
              <p>{item.content}</p>
             </article>
           )
          })}
        </div>
      </section>
    )
  }
}
