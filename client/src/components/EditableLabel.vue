<template>
    <!-- Editing label -->
    <div v-if="project.editMode">
        <div class="p-grid">
                <InputText 
                class="p-col-9" 
                :modelValue="project.title"
                @update:model-value="updateLabel({
                    title: $event, 
                    project})"
                @keyup.enter="saveProjectName(project)"
                />
                <Button 
                class="p-col-1 p-m-1"
                @click="saveProjectName(project)"
                >
                    <i class="material-icons">check</i>
                </Button>
                <Button 
                class="p-col-1 p-m-1"
                @click="deleteProject(project)"
                >
                    <i class="material-icons">close</i>
                </Button>
        </div>
    </div>
    <!-- Not Editing label -->
    <div v-else>
        <div class="p-grid">
            <div class="p-col-10 p-text-left">
                {{project.title}}
            </div>
            <div class="p-col">
            <Button 
            @click="setEditable(project)"
            class="p-button-rounded p-button-text"
            >
                <i class="material-icons">edit</i>
            </Button>
            </div>
        </div>
    </div>
</template>


<script>
import InputText from "primevue/inputtext"
import Button from "primevue/button"
import { mapMutations, mapActions } from "vuex"

export default {
    components: {
        Button,
        InputText
    },
    props: {
        project: Object
    },
    data() {
        return {

        }
    },
    methods: {
        ...mapMutations('projects', [
            'setEditable',
            'updateLabel'
        ]),
        ...mapActions('projects', [
            'saveProjectName',
            'deleteProject'
        ])
    }
}
</script>
