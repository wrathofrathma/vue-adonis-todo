<template>
    <div class="p-d-flex">
        <InputText
            :placeholder="placeholder" 
            @update:model-value="$emit('input', $event)"
            :value="value"
            @keyup.enter="$emit('create')"
            class="p-col-10" 
            :disabled="disabled"
        />
        <Button 
        class="p-col p-ml-2" 
        @click="$emit('create')"
        :disabled="disabled"
        >
            <i class="material-icons" @click="iclicked">add_circle</i>
            Create
        </Button>
    </div>
</template>

<script>
import Button from "primevue/button"
import InputText from "primevue/inputtext"

export default {
    components: {
        Button,
        InputText
    },
    emits: ['input', 'create'],
    props: {
        placeholder: {
            type: String,
            required: false
        },
        value: {
            type: String,
            required: false
        },
        disabled: {
            type: Boolean,
            default: false
        }
    }
}
</script>