<template>
  <div class="container-md">
    <h1>Manajemen Kelas</h1>
    <router-link type="button" class="btn btn-primary"  to="/kelas/create">Tambah Kelas</router-link>
    <table class="table table-striped">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nama</th>
          <th>Aksi</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="kelas in kelass" :key="kelas.id">
          <td>{{ kelas.id }}</td>
          <td>{{ kelas.nama }}</td>
          <td>
            <router-link  type="button" class="btn btn-warning me-3" :to="`/kelas/edit/${kelas.id}`">Edit</router-link>
            <button  type="button" class="btn btn-danger" @click="deleteKelas(kelas.id)">Hapus</button>
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
      kelass: []
    };
  },
  created() {
    this.fetchKelas();
  },
  methods: {
    async fetchKelas() {
      try {
        const response = await api.get('/kelas');
        this.kelass = response.data.data;
      } catch (err) {
        console.error("Gagal mengambil data kelas.");
      }
    },
    async deleteKelas(id) {
      if (confirm('Apakah Anda yakin ingin menghapus kelas ini?')) {
        try {
          await api.delete(`/kelas/${id}`);
          this.fetchKelas();
        } catch (err) {
          console.error("Gagal menghapus kelas.");
        }
      }
    }
  }
};
</script>