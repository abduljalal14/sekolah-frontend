<template>
  <button @click="logout">Logout</button>
</template>

<script>
import api from '@/services/api';

export default {
  methods: {
    async logout() {
      try {
        await api.post('/logout');
      } catch (err) {
        console.error('Logout failed onserver, but hapus local storage.');
      }
      localStorage.removeItem('token');
      this.$router.push('/login');
    }
  }
};
</script>