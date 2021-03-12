<template>
    <div class="p-grid p-ai-center record p-p-1 " :class="classObject">
        <!-- Slot stuff, in this case our checkbox -->
        <slot>
        </slot>
        <!-- Editable label section -->
        <div class="p-col">
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
        <!-- Edit button -->
        <Button 
        v-if="!isEditMode"
        @click="setEditable(record)"
        :class="buttonClasses"
        >
            <i class="material-icons">edit</i>
        </Button>

        <!-- Save button -->
        <Button 
        v-else
        :class="buttonClasses"
        @click="$emit('save')"
        >
            <i class="material-icons">check</i>
        </Button>

        <!-- Delete button -->
        <Button 
        :class="buttonClasses"
        @click="$emit('delete')"
        >
            <i class="material-icons">close</i>
        </Button>
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
        buttonClasses() {
            return {
                'p-button-rounded': !this.isEditMode,
                'p-button-text': !this.isEditMode,
                'p-col-fixed': true,
                'p-jc-center': true
            }
        }
    }
}
</script>

<style scoped>
.record:hover {
    background: var(--surface-c);
}

.active {
    background: var(--surface-d);
}

.p-button {
    width: 60px;
}

</style>
