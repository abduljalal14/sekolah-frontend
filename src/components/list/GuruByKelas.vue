<template>
  <div class="container-md">
    <h1>Daftar Guru Berdasarkan Kelas</h1>
    <table class="table table-striped">
      <thead>
        <tr>
          <th>Kelas</th>
          <th>Guru</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="kelasData in listData" :key="kelasData.kelas">
          <td>{{ kelasData.kelas }}</td>
          <td>
            <ul>
              <li v-for="guruNama in kelasData.guru" :key="guruNama">{{ guruNama }}</li>
            </ul>
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
      listData: []
    };
  },
  async created() {
    try {
      const response = await api.get('/list/guru-by-kelas');
      this.listData = response.data.data;
    } catch (err) {
      console.error("Gagal mengambil data guru per kelas.");
    }
  }
};
</script>