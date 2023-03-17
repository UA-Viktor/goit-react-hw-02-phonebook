import React from 'react';

const Contacts = ({ contacts, onDeleteContact }) => (
  <ul className="Contacts">
    {contacts.map(({ id, name, number }) => (
      <li key={id} className="Contacts__item">
        {name}: {number}
        <button
          type="button"
          className="buttonDel"
          onClick={() => onDeleteContact(id)}
        >
          Delete
        </button>
      </li>
    ))}
  </ul>
);

export default Contacts;
