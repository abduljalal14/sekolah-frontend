<template>
    <div class="mx-auto p-2" style="width: 400px;">
        <form @submit.prevent="submitForm">
            <div class="mb-3">
                <input type="text" v-model="siswa.nama" placeholder="Nama Siswa" class="form-control" required>
            </div>
          
            <div class="mb-3">
                <select v-model="siswa.kelas_id" class="form-control" required>
                  <option value="" disabled>Pilih Kelas</option>
                  <option v-for="kelas in kelass" :key="kelas.id" :value="kelas.id">
                    {{ kelas.nama }}
                  </option>
                </select>
            </div>
          <button type="submit" class="btn btn-success">{{ isEditMode ? 'Update' : 'Tambah' }} Siswa</button>
        </form>
    </div>
</template>

<script>
import api from '@/services/api';

export default {
  props: ['id'],
  data() {
    return {
      siswa: {
        nama: '',
        kelas_id: '', // Diubah menjadi string kosong agar "Pilih Kelas" bisa terpilih
      },
      kelass: [], // State untuk menyimpan daftar kelas
      isEditMode: false,
    };
  },
  async created() {
    // Ambil daftar kelas saat komponen dibuat
    await this.fetchKelass();

    if (this.id) {
      this.isEditMode = true;
      try {
        const response = await api.get(`/siswa/${this.id}`);
        this.siswa = response.data.data;
      } catch (err) {
        console.error("Gagal mengambil data siswa.");
      }
    }
  },
  methods: {
    async fetchKelass() {
      try {
        const response = await api.get('/kelas');
        this.kelass = response.data.data;
      } catch (err) {
        console.error("Gagal mengambil daftar kelas.");
      }
    },
    async submitForm() {
      try {
        if (this.isEditMode) {
          await api.put(`/siswa/${this.id}`, this.siswa);
        } else {
          await api.post('/siswa', this.siswa);
        }
        this.$router.push('/siswa');
      } catch (err) {
        console.error("Gagal menyimpan data siswa.");
      }
    }
  }
};
</script>