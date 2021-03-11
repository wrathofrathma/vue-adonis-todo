<template>
    <div class="p-grid p-jc-center p-mt-4">
        <div class="p-col-6">
            <Message v-if="loginError" severity="error">{{loginError}}</Message>
            <h1>Login</h1>
            <div class="p-fluid p-text-left">
                <div class="p-field">
                    <label for="email">Email</label>
                    <InputText 
                    placeholder="Email" 
                    id="email" 
                    @update:model-value="setLoginEmail"
                    @keyup.enter="login"
                     />
                </div>
                <div class="p-field">
                    <label for="password">Password</label>
                    <InputText 
                    placeholder="Password" 
                    type="password" 
                    id="password" 
                    @update:model-value="setLoginPassword" 
                    @keyup.enter="login"
                    />
                </div>
            </div>
            <Button class="p-mr-2" @click="login">
                <i class="material-icons p-mr-1">login</i>
                Login 
            </Button>
            <Button @click="on_register">
                <i class="material-icons p-mr-1">account_circle</i>
                Register
            </Button>
        </div>
    </div>
</template>

<script>
import { mapMutations, mapActions, mapState } from 'vuex'
import InputText from "primevue/inputtext"
import Button from "primevue/button"
import Message from "primevue/message"
export default {
    components: {
        InputText,
        Button,
        Message
    },
    computed: {
        ...mapState('authentication', [
            'loginError'
        ])
    },
    methods: {
        ...mapMutations('authentication', [
            'setLoginEmail',
            'setLoginPassword'
        ]),
        ...mapActions('authentication', [
            'login'
        ]),
        on_register() {
            this.$router.push("/register")
        }
    }
}
</script>