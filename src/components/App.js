import React, { Component } from 'react';

import { nanoid } from 'nanoid';
import { Notify } from 'notiflix';

import Section from './Section/Section';
// import Form from './Form/Form';
import ContactForm from './Form/FormFormik';
import Contacts from './Contacts/Contacts';
import Filter from './Filter/Filter';

class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  formSubmitHandler = data => {
    const dataWithId = {
      ...data,
      id: nanoid(5),
    };

    if (this.state.contacts.some(contact => contact.name === dataWithId.name)) {
      Notify.failure(`${dataWithId.name} is already in contacts.`);
      // alert(`${dataWithId.name} is already in contacts.`);
      return;
    }

    this.setState(prevState => ({
      contacts: [...prevState.contacts, dataWithId],
    }));
  };

  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  changeFilter = e => {
    this.setState({ filter: e.currentTarget.value });
  };

  getVisibleContacts = () => {
    const { filter, contacts } = this.state;
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  render() {
    const { filter } = this.state;
    const visibleContacts = this.getVisibleContacts();

    return (
      <>
        <Section
          text="Phonebook"
          // childComponent={<Form onSubmit={this.formSubmitHandler} />}
          childComponent={<ContactForm onSubmit={this.formSubmitHandler} />}
        />

        <Section
          text="Contacts"
          childComponentFilter={
            <Filter value={filter} onChange={this.changeFilter} />
          }
          childComponent={
            <Contacts
              contacts={visibleContacts}
              onDeleteContact={this.deleteContact}
            />
          }
        />
      </>
    );
  }
}

export default App;

// disabled={!this.state.licence}
