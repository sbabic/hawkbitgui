export interface ActionLog {
  id: number | string;
  type: string;
  messages: string[];
  reportedAt: number;
  timestamp?: number;
  code?: number;
}
