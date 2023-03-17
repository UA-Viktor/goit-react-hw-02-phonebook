import React from 'react';

const Section = ({ text, childComponentFilter, childComponent }) => (
  <div>
    <h1>{text}</h1>
    {childComponentFilter}
    {childComponent}
  </div>
);

export default Section;
