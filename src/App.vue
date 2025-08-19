<template>
  <div id="app">
    <nav id="navigasi" class="navbar navbar-expand-lg bg-body-tertiary">
      <div class="container-fluid">
        <router-link to="/siswa" class="navbar-brand">Home</router-link>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">

            <li class="nav-item">
              <router-link to="/kelas" class="nav-link">Kelas</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/siswa" class="nav-link">Siswa</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/guru" class="nav-link">Guru</router-link>
            </li>

            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
                aria-expanded="false">
                Laporan
              </a>
              <ul class="dropdown-menu">
                <li><router-link to="/list/siswa-by-kelas" class="dropdown-item">Siswa per Kelas</router-link></li>
                <li><router-link to="/list/guru-by-kelas" class="dropdown-item">Guru per Kelas</router-link></li>
                <li>
                  <hr class="dropdown-divider">
                </li>
                <li><router-link to="/list/all-combined" class="dropdown-item">Semua Laporan</router-link></li>
              </ul>
            </li>
          </ul>
          <button type="button" class="btn btn-danger" @click="logout">Logout</button>
        </div>
      </div>
    </nav>

    <router-view></router-view>
  </div>
</template>

<script>
import api from '@/services/api';

export default {
  name: 'App',
  methods: {
    async logout() {
      try {
        await api.post('/logout');
      } catch (err) {
        console.error('Logout failed.');
      }
      localStorage.removeItem('token');
      this.$router.push('/login');
    }
  }
};
</script>
