<template>
    <div class="p-grid p-ai-center record " :class="classObject">
        <!-- Slot stuff, in this case our checkbox -->
        <slot>
        </slot>
        <!-- Editable label section -->
        <div class="p-col-9">
            <div v-if="!isEditMode">
                <div class="p-text-left" @click="$emit('click')">
                    {{title}}
                </div>
            </div>
            <div v-else class="p-d-flex">
                <InputText 
                class="p-col p-inputtext-lg"
                :modelValue="title"
                @update:model-value="$emit('input',$event)"
                @keyup.enter="$emit('save')"
                />
            </div>
        </div>
        <!-- Buttons -->
        <div v-if="!isEditMode" class="p-col-1">
            <Button 
            @click="setEditable(record)"
            class="p-button-rounded p-button-text"
            >
                <i class="material-icons">edit</i>
            </Button>
        </div>
        <div v-else class="p-col-1">
            <Button 
            class=""
            @click="$emit('save')"
            >
                <i class="material-icons">check</i>
            </Button>
        </div>
        <div class="p-col-1">
            <Button 
            class=""
            @click="$emit('delete')"
            >
                <i class="material-icons">close</i>
            </Button>
        </div>
    </div>
</template>


<script>
import InputText from "primevue/inputtext"
import Button from "primevue/button"
import { mapMutations } from "vuex"

export default {
    components: {
        Button,
        InputText
    },
    emits: ['save', 'delete', 'input', 'click'],
    props: {
        title: String,
        isEditMode: Boolean,
        record: Object,
        active_id: Number
    },
    methods: {
        ...mapMutations('projects', [
            'setEditable'
        ])
    },
    computed: {
        classObject() {
            return { 
                active: !this.isEditMode && this.record.id===this.active_id
            }
        },
    }
}
</script>

<style>
.record:hover {
    background: var(--surface-c);
}

.active {
    background: var(--surface-d);
}
</style>
