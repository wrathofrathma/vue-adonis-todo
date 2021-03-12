<template>
    <Panel>
        <template #header>
            <h3 class="p-m-0">
                Tasks
            </h3>
        </template>
        <EditableRecord 
        v-for="task in tasks" 
        :key="task.id"
        :title="task.description"
        :isEditMode="task.isEditMode"
        :record="task"
        @delete="deleteTask(task)"
        @save="updateTask(task)"
        @input="updateTaskDescription({
            task: task,
            description: $event})"
        />
        <CreateRecord
        placeholder="New task description..."
        @create="createTask"
        :value="newTaskDescription"
        @input="setNewTaskDescription"
        :disabled="isProjectSelected"
        />
    </Panel>
</template>

<script>
import Panel from "primevue/panel";
import EditableRecord from "./EditableRecord"
import CreateRecord from './CreateRecord';

import { mapState, mapMutations, mapActions, mapGetters } from 'vuex'
export default {
    components: {
        Panel,
        EditableRecord,
        CreateRecord
    },
    computed: {
        ...mapState('projects', [
            'tasks',
            'newTaskDescription'
        ]),
        ...mapGetters('projects', [
            'isProjectSelected'
        ])
    },
    methods: {
        ...mapMutations('projects', [
            'setNewTaskDescription',
            'updateTaskDescription'
        ]),
        ...mapActions('projects', [
            'createTask',
            'deleteTask',
            'updateTask'
        ])
    }
}
</script>