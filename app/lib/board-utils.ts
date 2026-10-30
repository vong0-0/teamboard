import { mockBoardAssignees, mockBoardLabels } from "~/mock-data/board";
import type { ID } from "~/type";

export function getBoardAssignees(assigneeIds: readonly ID[]) {
  const selectedIds = new Set(assigneeIds);
  return mockBoardAssignees.filter((assignee) => selectedIds.has(assignee.id));
}

export function getBoardAssignee(assigneeId: ID | undefined) {
  return mockBoardAssignees.find((assignee) => assignee.id === assigneeId);
}

export function getBoardLabels(labelIds: readonly ID[]) {
  return labelIds.flatMap((id) => {
    const label = mockBoardLabels[id as keyof typeof mockBoardLabels];
    return label ? [{ id, ...label }] : [];
  });
}
