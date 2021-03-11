<template>
    <div class="p-grid p-jc-center p-mt-4">
        <div class="p-col-6">
            <Message v-if="registerError" severity="error">{{registerError}}</Message>
            <h1>Register</h1>
            <div class="p-fluid p-text-left">
                <div class="p-field">
                    <label for="email">Username</label>
                    <input-text 
                    id="email" 
                    placeholder="Email" 
                    :value="registerEmail" 
                    @update:model-value="setRegisterEmail"
                    @keyup.enter="register"
                    />
                </div>
            </div>

            <div class="p-fluid p-text-left">
                <div class="p-field">
                    <label for="password">Password</label>
                    <input-text 
                    id="password" 
                    type="password" 
                    placeholder="Password" 
                    :value="registerPassword" 
                    @update:model-value="setRegisterPassword"
                    @keyup.enter="register"
                    />
                </div>
            </div>

            <Button @click="register">
                <i class="material-icons p-mr-1">account_circle</i>
                Register
            </Button>
        </div>
    </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import InputText from "primevue/inputtext"
import Button from "primevue/button"
import Message from "primevue/message"

export default {
    components: {
        InputText,
        Button,
        Message
    },
    data() {
        return {

        }
    },
    computed: {
        ...mapState('authentication', [
            'registerEmail', 
            'registerPassword',
            'registerError'
        ])
    },
    methods: {
        ...mapMutations('authentication', [
            'setRegisterEmail',
            'setRegisterPassword'
        ]),
        ...mapActions('authentication', [
            'register'
        ])
    }
}
</script>