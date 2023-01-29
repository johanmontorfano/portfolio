import { ProjectData } from '../types/projects';
import { createStore } from "solid-js/store";

/**
 * This `store` contains all the data loaded from the database.
 */
export const [cached, updateCache] = createStore<{ projects: ProjectData[] }>({ projects: [] });