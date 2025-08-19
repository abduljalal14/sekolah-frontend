<template>
  <div class="container-md">
    <h1>Manajemen Guru</h1>
    <router-link  type="button" class="btn btn-primary" to="/guru/create">Tambah Guru</router-link>
    <table class="table table-striped">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nama</th>
          <th>Kelas ID</th>
          <th>Aksi</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="guru in gurus" :key="guru.id">
          <td>{{ guru.id }}</td>
          <td>{{ guru.nama }}</td>
          <td>{{ guru.kelas_id }}</td>
          <td>
            <router-link   type="button" class="btn btn-warning me-3" :to="`/guru/edit/${guru.id}`">Edit</router-link>
            <button  type="button" class="btn btn-danger" @click="deleteGuru(guru.id)">Hapus</button>
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
      gurus: []
    };
  },
  created() {
    this.fetchGuru();
  },
  methods: {
    async fetchGuru() {
      try {
        const response = await api.get('/guru');
        this.gurus = response.data.data;
      } catch (err) {
        console.error("Gagal mengambil data guru.");
      }
    },
    async deleteGuru(id) {
      if (confirm('Apakah Anda yakin ingin menghapus guru ini?')) {
        try {
          await api.delete(`/guru/${id}`);
          this.fetchGuru();
        } catch (err) {
          console.error("Gagal menghapus guru.");
        }
      }
    }
  }
};
</script>