<template>

    <div class="mx-auto p-2" style="width: 400px;">
        <form @submit.prevent="submitForm">
            <div class="mb-3">
                <input type="text" v-model="guru.nama" placeholder="Nama Guru" class="form-control" required>
            </div>
            <div class="mb-3">
                <select v-model="guru.kelas_id" class="form-control" required>
                    <option value="" disabled>Pilih Kelas</option>
                    <option v-for="kelas in kelass" :key="kelas.id" :value="kelas.id">
                        {{ kelas.nama }}
                    </option>
                </select>
            </div>
            <button type="submit" class="btn btn-success">{{ isEditMode ? 'Update' : 'Tambah' }} Guru</button>
        </form>
    </div>
</template>

<script>
import api from '@/services/api';

export default {
    props: ['id'],
    data() {
        return {
            guru: {
                nama: '',
                kelas_id: '', 
            },
            kelass: [], 
            isEditMode: false,
        };
    },
    async created() {
        await this.fetchKelass();

        if (this.id) {
            this.isEditMode = true;
            try {
                const response = await api.get(`/guru/${this.id}`);
                this.guru = response.data.data;
            } catch (err) {
                console.error("Gagal mengambil data guru.");
            }
        }
    },
    methods: {
        async fetchKelass() {
            try {
                const response = await api.get('/kelas');
                this.kelass = response.data.data;
            } catch (err) {
                console.error("Gagal mengambil daftar kelas");
            }
        },
        async submitForm() {
            try {
                if (this.isEditMode) {
                    await api.put(`/guru/${this.id}`, this.guru);
                } else {
                    await api.post('/guru', this.guru);
                }
                this.$router.push('/guru');
            } catch (err) {
                console.error("Gagal menyimpan data guru");
            }
        }
    }
};
</script>