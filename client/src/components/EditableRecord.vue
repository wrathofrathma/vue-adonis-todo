<template>
    <!-- Editing label -->
    <div v-if="isEditMode">
        <div class="p-grid p-ai-center">
                <InputText 
                class="p-col-9" 
                :modelValue="title"
                @update:model-value="$emit('input',$event)"
                @keyup.enter="$emit('save')"
                />
                <div class="p-col-1">
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
    </div>
    <!-- Not Editing label -->
    <div v-else class="record">
        <div class="p-grid p-ai-center" :class="{active: record.id === active_id}">
            <div class="p-col-9 p-text-left" @click="$emit('click')">
                {{title}}
            </div>
            <div class="p-col-1">
                <Button 
                @click="setEditable(record)"
                class="p-button-rounded p-button-text"
                >
                    <i class="material-icons">edit</i>
                </Button>
            </div>
            <div class="p-col-1">
                <Button 
                class="p-button-rounded p-button-text"
                @click="$emit('delete')"
                >
                    <i class="material-icons">close</i>
                </Button>
            </div>
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
