<template>
  <div class="content">
    <h1 class="header">{{ isEdit ? 'Изменить контакт' : 'Новый контакт' }}</h1>
    <form class="form" @submit.prevent="handleSubmit">
      <label class="form__label">Имя <span class="form--asterisk-blue">*</span></label>
      <input 
      type="text"
      ref="nameInput"
      class="form__input" 
      v-model="editContact.name" 
      placeholder="Иванов Иван Иванович"
      required 
      @click="updateMaskHandler"
      />
      <label class="form__label">Email <span class="form--asterisk-blue">*</span></label>
      <input class="form__input"
      type="text"
      ref="emailInput" 
      v-model="editContact.email" 
      placeholder="example@mail.com"
      required
      @click="updateMaskHandler"
      />
      <label class="form__label">Телефон <span class="form--asterisk-blue">*</span></label>
      <input class="form__input" 
      type="text"
      ref="phoneInput"
      v-model="editContact.phone" 
      required
      @click="updateMaskHandler"
      />
      <button class="form__btn" type="submit">{{ isEdit ? 'ИЗМЕНИТЬ КОНТАКТ' : 'ДОБАВИТЬ КОНТАКТ' }}</button>
    </form>
  </div>
</template>
  
<script setup lang="ts">

import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useGlobalState } from '../stores/GlobalState';
import IMask from 'imask';

import type { ContactInterface } from '@/types/ContactInterface.ts'

const route = useRoute();
const router = useRouter();
const globalState = useGlobalState();

const isEdit = route.params.id !== undefined || route.path === '/edit/';
const editContact = ref({ name: '', phone: '', email: '', id: ''});
const nameInput = ref<HTMLInputElement | null>(null);
const emailInput = ref<HTMLInputElement | null>(null);
const phoneInput = ref<HTMLInputElement | null>(null);


const nameMaskOptions = {
  mask: /^[a-zA-Zа-яА-ЯёЁ\s'-]*$/, 
  lazy: false,
};

const emailMaskOptions = {
  mask: /^[a-zA-Zа-яА-ЯёЁ0-9@.\s'-]*$/,
  lazy: false,
};


const phoneMaskOptions = {
  mask: '+{7} (000) 000-00-00',
  lazy: false,
  placeholderChar: '9'
};

onMounted(() => {
  if (nameInput.value) {
    IMask(nameInput.value, nameMaskOptions);
  }
  if (emailInput.value) {
    IMask(emailInput.value, emailMaskOptions);
  }
  if (phoneInput.value) {
    IMask(phoneInput.value, phoneMaskOptions);
  }
  if (isEdit) {
    const existingContact = globalState.contacts.find((contact: ContactInterface) => contact.id === String(route.params.id));
    if (existingContact) {
      editContact.value = { ...existingContact };
    }
  }
});

const updateMaskHandler = () => {
  if (nameInput.value){
    const maskName = IMask(nameInput.value, nameMaskOptions)
    maskName.updateValue()
  }
  if (emailInput.value){
    const maskEmail = IMask(emailInput.value, emailMaskOptions)
    maskEmail.updateValue()
  }
  if (phoneInput.value){
    const maskPhone = IMask(phoneInput.value, phoneMaskOptions)
    maskPhone.updateValue()
  }
}

const handleSubmit = async () => {
  if (isEdit) {
    await globalState.updateContact(editContact.value);
  } else {
    await globalState.addContact(editContact.value);
  }
  router.push('/');
};
</script>

<style scoped lang="scss">
@use '../assets/scss/config';

@mixin alignColumn(){
  display: flex;
  flex-direction: column;
}

.content {
  @include alignColumn();

  width: 40%;
  margin: 10% 30%;

  color: #2D2A42;

  .header {
    font-size: 2.25em;
    font-weight: 700;
  }

  .form {
    @include alignColumn();

    &__label {
      font-family: config.$secondary-font-family;
      font-weight: 700;
      margin: 15px 0 5px 0;
    }

    &--asterisk-blue {
      color: config.$primary-color;
    }

    &__input {
      font-family: config.$secondary-font-family;

      color: #878499;
      border: 1px solid #EEECF4;
      border-radius: 10px;

      padding: 15px;
    }

    &__btn {
      align-self: start;

      width: 40%;

      font-size: 1em;
      font-weight: 550;

      margin-top: 20px;

      padding: 20px;

      border-radius: 50px;

      color: #FFFFFF;

      background-color: config.$primary-color;
    }

    &__btn:hover {
      cursor: pointer;
    }
  }
}
</style>


  