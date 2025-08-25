import { createRouter, createWebHistory } from 'vue-router';
import Login from '../components/auth/Login.vue';
import SiswaList from '../components/siswa/SiswaList.vue';
import KelasList from '../components/kelas/KelasList.vue';
import GuruList from '../components/guru/GuruList.vue';
import SiswaForm from '../components/siswa/SiswaForm.vue';
import GuruForm from '../components/guru/GuruForm.vue';
import KelasForm from '../components/kelas/KelasForm.vue';
import SiswaByKelas from '../components/list/SiswaByKelas.vue';
import GuruByKelas from '../components/list/GuruByKelas.vue';
import AllCombined from '../components/list/AllCombined.vue';
import OrtuForm from '@/components/ortu/OrtuForm.vue';
import OrtuList from '@/components/ortu/OrtuList.vue';

const routes = [
    { path: '/', redirect: '/login' },
    { path: '/login', component: Login },
    { path: '/siswa', component: SiswaList, meta: { requiresAuth: true } },
    { path: '/siswa/create', component: SiswaForm, meta: { requiresAuth: true } },
    { path: '/siswa/edit/:id', component: SiswaForm, props: true, meta: { requiresAuth: true } },
    { path: '/ortu', component: OrtuList, meta: { requiresAuth: true } },
    { path: '/ortu/create', component: OrtuForm, meta: { requiresAuth: true } },
    { path: '/ortu/edit/:id', component: OrtuForm, props: true, meta: { requiresAuth: true } },
    { path: '/kelas', component: KelasList, meta: { requiresAuth: true } },
    { path: '/kelas/create', component: KelasForm, meta: { requiresAuth: true } },
    { path: '/kelas/edit/:id', component: KelasForm, props: true, meta: { requiresAuth: true } },
    { path: '/guru', component: GuruList, meta: { requiresAuth: true } },
    { path: '/guru/create', component: GuruForm, meta: { requiresAuth: true } },
    { path: '/guru/edit/:id', component: GuruForm, props: true, meta: { requiresAuth: true } },
    { path: '/list/siswa-by-kelas', component: SiswaByKelas, meta: { requiresAuth: true } },
    { path: '/list/guru-by-kelas', component: GuruByKelas, meta: { requiresAuth: true } },
    { path: '/list/all-combined', component: AllCombined, meta: { requiresAuth: true } },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    const token = localStorage.getItem('token');
    if (to.meta.requiresAuth && !token) {
        next('/login');
    } else {
        next();
    }
});

export default router;