<template>
    <toolbar class="">
        <template #left>
            <div class="p-d-flex">
                <h3 class="p-mr-4">
                    PrimeVue TODO
                </h3>
                <Button>
                    <i class="material-icons">playlist_add_check</i>
                    Projects
                </Button>
            </div>
        </template>

        <template #right>
            <div class="p-d-flex">
                <Button>
                    <i class="material-icons">account_box</i>
                    Register
                </Button>
                <Button>
                    <i class="material-icons">fingerprint</i>
                    Login
                </Button>
                <Button>
                    <i class="material-icons">exit_to_app</i>
                    Logout
                </Button>
            </div>
        </template>
    </toolbar>
</template>

<script>
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
    methods: {

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