<template>


  <div class="mx-auto p-2" style="width: 400px;">
        <form @submit.prevent="submitForm">
            <div class="mb-3">
                <input type="text" v-model="kelas.nama" placeholder="Nama Kelas" class="form-control" required>
            </div>
            <button type="submit" class="btn btn-success">{{ isEditMode ? 'Update' : 'Tambah' }} Kelas</button>
        </form>
    </div>
</template>

<script>
import api from '@/services/api';

export default {
  props: ['id'],
  data() {
    return {
      kelas: {
        nama: ''
      },
      isEditMode: false,
    };
  },
  async created() {
    if (this.id) {
      this.isEditMode = true;
      try {
        const response = await api.get(`/kelas/${this.id}`);
        this.kelas = response.data.data;
      } catch (err) {
        console.error("Gagal mengambil data kelas.");
      }
    }
  },
  methods: {
    async submitForm() {
      try {
        if (this.isEditMode) {
          await api.put(`/kelas/${this.id}`, this.kelas);
        } else {
          await api.post('/kelas', this.kelas);
        }
        this.$router.push('/kelas');
      } catch (err) {
        console.error("Gagal menyimpan data kelas.");
      }
    }
  }
};
</script>