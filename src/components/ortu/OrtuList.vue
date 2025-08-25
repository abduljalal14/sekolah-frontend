<template>
  <div class="container-md">
    <h1>Manajemen Orang Tua</h1>
    <router-link type="button" class="btn btn-primary" to="/ortu/create">Tambah ortu</router-link>
    <table class="table table-striped">
      <thead>
        <tr>
          <th>Nama</th>
          <th>Aksi</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="ortu in ortus" :key="ortu.id">
          <td>{{ ortu.nama }}</td>
          <td >
            <router-link  type="button" class="btn btn-warning me-3" :to="`/ortu/edit/${ortu.id}`">Edit</router-link>
            <button type="button" class="btn btn-danger" @click="deleteortu(ortu.id)">Hapus</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import api from '@/services/api';

export default {
  data() {
    return {
      ortus: []
    };
  },
  created() {
    this.fetchortu();
  },
  methods: {
    async fetchortu() {
      try {
        const response = await api.get('/ortu');
        this.ortus = response.data.data;
      } catch (err) {
        console.error("Gagal mengambil data ortu.");
      }
    },
    async deleteortu(id) {
      if (confirm('Apakah Anda yakin ingin menghapus ortu ini?')) {
        try {
          await api.delete(`/ortu/${id}`);
          this.fetchortu();
        } catch (err) {
          console.error("Gagal menghapus ortu.");
        }
      }
    }
  }
};
</script>