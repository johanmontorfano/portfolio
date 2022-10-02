/**
 * Type interface of a project, contains all the data
 * that should be stored on the server.
 */
export interface ProjectData {
    name: string;
    state: "work-on" | "finished" | "mastered" | "master-on";
    type: "project" | "skill" | "repository";
    id: string;
    description: string;
}