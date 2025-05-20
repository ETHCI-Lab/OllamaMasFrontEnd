// Tool Input/Output Schemas
export interface SqlGenToolInput {
    input: string;
}

export interface SqlGenToolOutput {
    sql: string;
}

export interface SqlExecToolInput {
    input: string;
}

export interface SqlExecToolOutput {
    sql: string;
}

// Tool Description
interface ToolDescription {
    name: string;
    description: string;
    inputSchema: Record<string, any>;
    outputSchema: Record<string, any>;
}

// Message Content
export interface MessageContent {
    text: string;
}

// Message Structure
export interface Message {
    role: 'system' | 'user' | 'model';
    content: MessageContent[];
}

// Usage Info
export interface UsageInfo {
    inputCharacters: number;
    inputImages: number;
    inputVideos: number;
    inputAudioFiles: number;
    outputCharacters: number;
    outputImages: number;
    outputVideos: number;
    outputAudioFiles: number;
}

// Request Section
export interface Request {
    messages: Message[];
    config: Record<string, any>;
    tools: ToolDescription[];
    output: Record<string, any>;
}

// Main Result Response
export interface QueryAgentResult {
    result: {
        message: {
            role: 'model';
            content: MessageContent[];
        };
        finishReason: string;
        usage: UsageInfo;
        custom: Record<string, any>;
        request: Request;
    };
}