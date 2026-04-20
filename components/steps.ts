// a step defines anything that is a member of a larger group of sequential 
// data for animations
export interface Step {
    text?: string;
    event?: string;
    duration: number; // in ms
}

export type DigestedStep = Step & { id: number };
