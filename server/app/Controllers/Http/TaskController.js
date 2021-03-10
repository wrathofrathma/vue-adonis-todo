'use strict'

const AuthService = use("App/Services/AuthorizationService")
const Project = use("App/Models/Project")
const Task = use("App/Models/Task")

class TaskController {
    async create({request, params, auth}) {
        const user = await auth.getUser();
        const { id } = params;
        const project = await Project.find(id);
        AuthService.verifyPermission(project, user);

        const { description } = request.all();
        const task = new Task();
        task.fill({
            description,
            completed: false
        });
        await project.tasks().save(task);
        return task;
    }

    async index({auth, params}) {
        const user = await auth.getUser();
        const { id } = params;
        const project = await Project.find(id);
        AuthService.verifyPermission(project, user);
        return await project.tasks().fetch();
    }

    async destroy({auth, params}) {
        const user = await auth.getUser();
        //ID here refers to ask ID, in index & create it refers to
        const { id } = params;
        const task = await Task.find(id);
        // I initially did it this way, which is fine, but tutorialman did it the other way.
        // const project = await Project.find(task.project_id);
        const project = await task.project().fetch();
        AuthService.verifyPermission(project, user);

        await task.delete();
        return task;
    }

    async update({ auth, params, request }) {
        const user = await auth.getUser();
        const { id } = params;
        const task = await Task.find(id);
        // I initially did it this way, which is fine, but tutorialman did it the other way.
        // const project = await Project.find(task.project_id);
        const project = await task.project().fetch();
        AuthService.verifyPermission(project, user);

        task.merge(request.only([
            'description',
            'completed'
        ]));
        await task.save();
        return task;
    }
}

module.exports = TaskController
