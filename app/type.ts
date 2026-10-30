export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  online: boolean;
  storageUsedGB: number;
  storageLimitGB: number;
}

export type ID = number;
export type ISODate = string;

export interface BoardColumn {
  id: ID;
  projectId: ID; // คอลัมน์เป็นของโปรเจกต์ไหน
  label: string; // "In progress" (แก้ชื่อได้)
  order: number; // ลำดับซ้าย → ขวา
  wipLimit: number | null; // null = ไม่จำกัด
  isDone: boolean; // คอลัมน์ที่นับว่างานเสร็จ
  collapsed: boolean;
}

export interface Subtask {
  id: ID;
  title: string;
  done: boolean;
  order: number;
}

export type Priority = "low" | "med" | "high";

export interface Task {
  id: ID;
  key: string;
  projectId: ID;
  sprintId: ID | null; // null = อยู่ใน backlog
  columnId: ID;
  order: number;
  title: string;
  description: string;
  priority: Priority;
  assigneeIds: ID[];
  labelIds: ID[];
  subtasks: Subtask[]; // ฝังในงานเลย (ไม่แยกตาราง)
  dueDate: ISODate | null;
  createdById: ID;
  createdAt: ISODate;
  updatedAt: ISODate;
  commentCount: number; // เก็บซ้ำไว้โชว์บนการ์ด
  attachmentCount: number;
}
