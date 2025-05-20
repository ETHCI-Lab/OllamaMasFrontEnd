// 單一 Model details 結構
export interface ollamaModelInfoDetails {
    parent_model: string;
    format: string;
    family: string;
    families: string[];
    parameter_size: string;
    quantization_level: string;
}

// 每個 Model 的結構
export interface ollamaModelInfo {
    name: string;
    model: string;
    modified_at: string; // 假設是 ISO 字串
    size: number;
    digest: string;
    details: ollamaModelInfoDetails;
}
