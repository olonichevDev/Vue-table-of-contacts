<template>
  <div class="content">
    <div class="header">
      <h1 class="header__h">Мои контакты</h1>
      <button class="header__add-btn" @click="addContactHandler">ДОБАВИТЬ +</button>
    </div>
    <table class="contacts-table" v-if="!globalState.isLoading">
      <thead>
        <tr>
          <th class="contacts-table--sort-btn" @click="globalState.toggleSortOrder">
            Имя
            <span>{{ globalState.sortOrder === 'asc' ? '↑' : '↓' }}</span>
          </th>
          <th>Email</th>
          <th>Телефон</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="contact in globalState.sortedContacts"
          :key="contact.id"
          @click="editContactHandler(contact.id)"
        >
          <td class="td--unbounded-font">{{ contact.name }}</td>
          <td>{{ contact.email }}</td>
          <td>{{ contact.phone }}</td>
        </tr>
      </tbody>
    </table>
    <p class="loading-message" v-else>Загрузка...</p>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useGlobalState } from '@/stores/GlobalState.ts';
import { useRouter } from 'vue-router';


const globalState = useGlobalState();
const router = useRouter();


onMounted(async () => {
    globalState.getContactsData()
});

const addContactHandler = () => {
  router.push('/add')
}

const editContactHandler = (id: string) => {
  router.push(`/edit/${id}`);
};
</script>

<style scoped lang="scss">
@use '../assets/scss/config';
$text-gray: #7D7B8E;

.content {
  margin-left: 350px;
}

.header {
  display: flex;
  align-items: center;
  gap: 2em;
  margin-bottom: 20px;

  &__h {
    font-weight: 700;
    color: #2e2e41;
  }

  &__add-btn {
    font-size: 0.75em;
    letter-spacing: 1.5px;
    font-weight: 550;
    padding: 1em 1.5em;
    border-radius: 50px;
    background-color: #EDEBF8;

    &:hover {
      cursor: pointer;
    }
  }
}

.contacts-table {
  font-family: config.$secondary-font-family;

  width: 100%;
  margin-top: 20px;
  border-collapse: collapse;

  color: config.$primary-color;

  th {
    font-size: 1.25em;
    font-weight: 100;
    padding: 10px 5px;
    text-align: left;
    color: $text-gray;
  }

  td {
    padding: 15px 5px;
    font-size: 1rem;

    &:hover {
      cursor: pointer;
    }
  }

  &--sort-btn {
    cursor: pointer;
  }
}

.td--unbounded-font{
      font-family: "Unbounded";
      font-weight: 400;
    }

.loading-message {
  font-size: 1rem;
  text-align: center;
  color: $text-gray;
}
</style>
