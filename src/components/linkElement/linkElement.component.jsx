import React from 'react';
import './linkElement.styles.css';

const LinkElement = ({type, title,}) =>(
    <div className='LinkElement' className={type}>
        {title}
    </div>
)

export default LinkElement;