<template>
    <div class="mx-auto p-2" style="width: 400px;">
        <form @submit.prevent="login">
          <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">Email address</label>
            <input type="email" v-model="email" placeholder="Email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" required>
            <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
          </div>
          <div class="mb-3">
            <label for="exampleInputPassword1" class="form-label">Password</label>
            <input type="password" v-model="password" placeholder="Password" class="form-control" id="exampleInputPassword1" required>
          </div>
          <button type="submit" class="btn btn-primary">Submit</button>
        </form>
    </div>
</template>

<script>
import api from '@/services/api';

export default {
  data() {
    return {
      email: '',
      password: '',
      error: null
    };
  },
  methods: {
    async login() {
      this.error = null;

      try {
        const response = await api.post('/login', {
          email: this.email,
          password: this.password
        });
        
        const token = response.data.access_token; 
        localStorage.setItem('token', token);
      
        this.$router.push('/siswa');
        
      } catch (err) {
        console.error('Login gagal:', err);

        if (err.response) {
          if (err.response.status === 401) {
            this.error = 'Kredensial invalid';
          } else {
            this.error = 'Error Server';
          }
        } else if (err.request) {
          this.error = 'Error Koneksi';
        } else {
          this.error = 'Error lainn';
        }
      }
    }
  }
};
</script>