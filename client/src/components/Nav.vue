<template>
    <toolbar class="">
        <template #left>
            <div class="p-d-flex">
                <h3 class="p-mr-4">
                    PrimeVue TODO
                </h3>
                <Button @click="on_projects" v-if="isLoggedIn">
                    <i class="material-icons p-mr-1">playlist_add_check</i>
                    Projects
                </Button>
            </div>
        </template>

        <template #right>
            <div class="p-d-flex">
                <Button @click="on_register" v-if="!isLoggedIn">
                    <i class="material-icons p-mr-1">account_box</i>
                    Register
                </Button>
                <Button @click="on_login" v-if="!isLoggedIn">
                    <i class="material-icons p-mr-1">fingerprint</i>
                    Login
                </Button>
                <Button @click="logout" v-if="isLoggedIn">
                    <i class="material-icons p-mr-1">exit_to_app</i>
                    Logout
                </Button>
            </div>
        </template>
    </toolbar>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Toolbar from "primevue/toolbar"
import Button from "primevue/button"
export default {
    components: {
        Toolbar,
        Button

    },
    data() {
        return {
        }
    },
    computed: {
        ...mapGetters('authentication', [
            'isLoggedIn'
        ]),
    },
    methods: {
        ...mapActions('authentication', [
            'logout'
        ]),
        on_projects() {
            this.$router.push("/")
        },
        on_register() {
            this.$router.push("/register")
        },
        on_login() {
            this.$router.push("/login")
        },
    }
    
}
</script>

<style scoped>
.topbar {
    position: fixed;
    width: 99%;
    z-index: 0;
    /* top: 0;
    left: 0;
    right: 0; */
}
.p-button {
    background: none;
    color: var(--text-color);
    border: none;
    box-shadow: none;
}
</style>