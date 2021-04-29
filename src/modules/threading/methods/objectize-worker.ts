import { BuildWorker } from './build-worker';

export class ObjectizeWorker {
    threadUsableCode: (() => void) | string;
    threadBlobFilepath: string;
    updateThreadCode: (_newWorkerCode: (() => void) | string) => void;
    threadObject: Worker;
    threadSendRequest: (message: any) => void

    constructor(_workerCode: (() => void) | string) {
        this.threadUsableCode = _workerCode;
        this.threadBlobFilepath = BuildWorker(_workerCode);
        this.threadObject = new Worker(this.threadBlobFilepath);
        this.threadSendRequest = (message: any) => {
            if(typeof message === 'object') this.threadObject.postMessage(JSON.stringify(message))
            else this.threadObject.postMessage(message);
        }
    
        this.updateThreadCode = (_newWorkerCode: (() => void) | string) => {
            this.threadUsableCode = _newWorkerCode;
            this.threadBlobFilepath = BuildWorker(_newWorkerCode);
        }
    }
}