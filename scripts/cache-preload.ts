import { usePredefinedRequest } from "../hooks/request";

/**
 * Preload predefined requests into the cache
 */
export function useCachePreload() {
    usePredefinedRequest("projects");
}