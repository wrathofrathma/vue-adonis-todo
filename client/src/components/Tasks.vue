<template>
    <Panel>
        <template #header>
            <h3 class="p-m-0">
                Tasks
            </h3>
        </template>
        <EditableRecord 
        class="task"
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
        >
        <Checkbox
        @update:model-value="toggleTaskCompleted(task)"
        :model-value="task.completed"
        :binary="true"
        ></Checkbox>

        </EditableRecord>
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
import Checkbox from "primevue/checkbox"

import { mapState, mapMutations, mapActions, mapGetters } from 'vuex'
export default {
    components: {
        Panel,
        EditableRecord,
        CreateRecord,
        Checkbox
    },
    computed: {
        ...mapState('tasks', [
            'tasks',
            'newTaskDescription'
        ]),
        ...mapGetters('projects', [
            'isProjectSelected'
        ])
    },
    methods: {
        ...mapMutations('tasks', [
            'setNewTaskDescription',
            'updateTaskDescription'
        ]),
        ...mapActions('tasks', [
            'createTask',
            'deleteTask',
            'updateTask',
            'toggleTaskCompleted',
            'fetchTasks'
        ]),
    },
    mounted() {
        //Let's make sure to refresh the tasks if we are re-mounting. In-case of persisted state stuff or logging out and back into a new user, our task panel isn't hidden like the tutorial.
        this.fetchTasks()
    }
}
</script>

<style scoped>
.task {
    font-size: 18px;
}
</style>