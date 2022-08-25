export interface GenerationInfo {
    startStep(step: string): void;
    runCommand(command: string): Promise<number>;
}
export declare function generate(info: GenerationInfo): Promise<void>;
