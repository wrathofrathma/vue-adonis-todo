<template>
    <Panel>
        <template #header>
            <h3 class="p-m-0">
                Projects
            </h3>
        </template>
        <div class="p-grid">
            <div class="project p-col-12" v-for="project in projects" :key="project.id">
                <EditableRecord
                :title="project.title" 
                :isEditMode="project.isEditMode"
                :record="project"
                @save="saveProjectName(project)"
                @delete="deleteProject(project)"
                @input="updateRecordTitle({
                    record: project,
                    title: $event})"
                @click="selectProject(project)"
                :active_id="activeProjectID"
                />
            </div>
        </div>
        <CreateRecord 
        placeholder="My project name..."
        @create="createProject"
        :value="newProjectName"
        @input="setNewProjectName"
        ></CreateRecord>
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
            'newProjectName',
            'projects',
            'activeProjectID'
        ]),
        ...mapGetters('authentication', [
            'isLoggedIn'
        ])
    },
    methods: {
        ...mapMutations('projects', [
            'setNewProjectName',
            'updateRecordTitle'
        ]),
        ...mapActions('projects', [
            'createProject',
            'getProjects',
            'deleteProject',
            'saveProjectName',
            'selectProject'
        ])
    },
    mounted() {
        if(this.isLoggedIn) {
            this.getProjects()
        }
    }
}
</script>

<style>
.project {
    font-size: 24px;
}
</style>