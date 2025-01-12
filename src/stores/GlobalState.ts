import { defineStore } from "pinia";
import axios from "axios";
import type { ContactInterface } from "@/types/ContactInterface";

export const useGlobalState = defineStore('globalState', {
  state: () => ({
    contacts: [] as ContactInterface[],
    isLoading: false as boolean,
    sortOrder: 'asc' as string,
  }),
  getters: {
    sortedContacts: (state) => {
      return [...state.contacts].sort((a, b) =>
        state.sortOrder === 'asc'
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name)
      );
    },
  },
  actions: {
    async getContactsData() {
      try {
        this.isLoading = true;

        const response = await axios.get<ContactInterface[]>('/api/contacts');

        this.contacts = response.data.map((contact) => ({
          id: contact.id,
          name: contact.name,
          phone: contact.phone,
          email: contact.email,
        }));
      } catch (error) {
        console.error('Error fetching contacts:', error);
        throw error;
      } finally {
        this.isLoading = false;
      }
    },
    async addContact(contact: ContactInterface) {
      const newContact: ContactInterface = { ...contact, id: String(Date.now()) };
      try {
        const response = await axios.post('/api/contacts', newContact);
        this.contacts.push(response.data);
      } catch (error) {
        console.error('Error adding contact:', error);
        throw error; 
      }
    },
    async updateContact(updatedContact: ContactInterface) {
      try {
        const response = await axios.put(`/api/contacts/${updatedContact.id}`, updatedContact);
        const index = this.contacts.findIndex((c) => c.id === updatedContact.id);
        if (index !== -1) {
          this.contacts[index] = response.data;
        }
      } catch (error) {
        console.error('Error updating contact:', error);
        throw error; 
      }
    },    
    toggleSortOrder() {
        this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
    },

  }
});
