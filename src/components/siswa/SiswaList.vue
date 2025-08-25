<template>
  <div class="container-md">
    <h1>Manajemen Siswa</h1>
    <router-link type="button" class="btn btn-primary" to="/siswa/create">Tambah Siswa</router-link>
    <table class="table table-striped">
      <thead>
        <tr>
          <th>Nama</th>
          <th>Kelas</th>
          <th>Orang Tua</th>
          <th>Aksi</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="siswa in siswas" :key="siswa.id">
          <td>{{ siswa.nama }}</td>
          <td>{{ siswa.kelas.nama }}</td>
          <td>{{ siswa.ortu_id }}</td>
          <td >
            <router-link  type="button" class="btn btn-warning me-3" :to="`/siswa/edit/${siswa.id}`">Edit</router-link>
            <button type="button" class="btn btn-danger" @click="deleteSiswa(siswa.id)">Hapus</button>
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
      siswas: []
    };
  },
  created() {
    this.fetchSiswa();
  },
  methods: {
    async fetchSiswa() {
      try {
        const response = await api.get('/siswa');
        this.siswas = response.data.data;
      } catch (err) {
        console.error("Gagal mengambil data siswa.");
      }
    },
    async deleteSiswa(id) {
      if (confirm('Apakah Anda yakin ingin menghapus siswa ini?')) {
        try {
          await api.delete(`/siswa/${id}`);
          this.fetchSiswa();
        } catch (err) {
          console.error("Gagal menghapus siswa.");
        }
      }
    }
  }
};
</script>