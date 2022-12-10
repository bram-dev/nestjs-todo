
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export class CreateProjectInput {
    label?: Nullable<string>;
    saved?: Nullable<boolean>;
    user_id?: Nullable<string>;
}

export class UpdateProjectInput {
    id?: Nullable<string>;
    label?: Nullable<string>;
    saved?: Nullable<boolean>;
    user_id?: Nullable<string>;
    todos?: Nullable<Nullable<string>[]>;
}

export class CreateToDoInput {
    label?: Nullable<string>;
    date?: Nullable<string>;
    priority?: Nullable<string>;
    saved?: Nullable<boolean>;
    checked?: Nullable<boolean>;
    user_id?: Nullable<string>;
    project?: Nullable<string>;
}

export class UpdateToDoInput {
    id?: Nullable<string>;
    label?: Nullable<string>;
    date?: Nullable<string>;
    priority?: Nullable<string>;
    saved?: Nullable<boolean>;
    checked?: Nullable<boolean>;
    user_id?: Nullable<string>;
    project?: Nullable<string>;
}

export abstract class IQuery {
    abstract projects(): Nullable<Nullable<Project>[]> | Promise<Nullable<Nullable<Project>[]>>;

    abstract project(id: string): Nullable<Project> | Promise<Nullable<Project>>;

    abstract todos(): Nullable<Nullable<ToDo>[]> | Promise<Nullable<Nullable<ToDo>[]>>;

    abstract todo(id: string): Nullable<ToDo> | Promise<Nullable<ToDo>>;
}

export abstract class IMutation {
    abstract createProject(createProjectInput?: Nullable<CreateProjectInput>): Nullable<Project> | Promise<Nullable<Project>>;

    abstract updateProject(updateProjectInput: UpdateProjectInput): Project | Promise<Project>;

    abstract removeProject(id: string): Nullable<Project> | Promise<Nullable<Project>>;

    abstract createToDo(createToDoInput?: Nullable<CreateToDoInput>): Nullable<ToDo> | Promise<Nullable<ToDo>>;

    abstract updateToDo(updateToDoInput: UpdateToDoInput): ToDo | Promise<ToDo>;

    abstract removeToDo(id: string): Nullable<ToDo> | Promise<Nullable<ToDo>>;
}

export abstract class ISubscription {
    abstract projectCreated(): Nullable<Project> | Promise<Nullable<Project>>;

    abstract todoCreated(): Nullable<ToDo> | Promise<Nullable<ToDo>>;
}

export class Project {
    id?: Nullable<string>;
    label?: Nullable<string>;
    saved?: Nullable<boolean>;
    user_id?: Nullable<string>;
    todos?: Nullable<Nullable<ToDo>[]>;
}

export class ToDo {
    id?: Nullable<string>;
    label?: Nullable<string>;
    saved?: Nullable<boolean>;
    checked?: Nullable<boolean>;
    date?: Nullable<string>;
    priority?: Nullable<string>;
    user_id?: Nullable<string>;
    project?: Nullable<Project>;
}

type Nullable<T> = T | null;
