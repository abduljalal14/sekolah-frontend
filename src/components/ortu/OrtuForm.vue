<template>
    <div class="mx-auto p-2" style="width: 400px;">
        <form @submit.prevent="submitForm">
            <div class="mb-3">
                <input type="text" v-model="ortu.nama" placeholder="Nama ortu" class="form-control" required>
            </div>
          <button type="submit" class="btn btn-success">{{ isEditMode ? 'Update' : 'Tambah' }} ortu</button>
        </form>
    </div>
</template>

<script>
import api from '@/services/api';

export default {
  props: ['id'],
  data() {
    return {
      ortu: {
        nama: ''
      },
      kelass: [], // State untuk menyimpan daftar kelas
      isEditMode: false,
    };
  },
  async created() {


    if (this.id) {
      this.isEditMode = true;
      try {
        const response = await api.get(`/ortu/${this.id}`);
        this.ortu = response.data.data;
      } catch (err) {
        console.error("Gagal mengambil data ortu.");
      }
    }
  },
  methods: {
    async submitForm() {
      try {
        if (this.isEditMode) {
          await api.put(`/ortu/${this.id}`, this.ortu);
        } else {
          await api.post('/ortu', this.ortu);
        }
        this.$router.push('/ortu');
      } catch (err) {
        console.error("Gagal menyimpan data ortu.");
      }
    }
  }
};
</script>