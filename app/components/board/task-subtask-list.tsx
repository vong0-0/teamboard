import { Check, GripVertical } from "lucide-react";
import { move } from "@dnd-kit/helpers";
import { DragDropProvider, useDroppable } from "@dnd-kit/react";
import { useSortable } from "@dnd-kit/react/sortable";
import type { Subtask, Task } from "~/type";

type TaskSubtaskListProps = {
  task: Task;
  onSubtasksChange: (
    taskId: number,
    update: (subtasks: Subtask[]) => Subtask[],
  ) => void;
};

export function TaskSubtaskList({
  task,
  onSubtasksChange,
}: TaskSubtaskListProps) {
  return (
    <DragDropProvider
      onDragOver={(event) => {
        if (event.operation.source?.type !== "subtask") return;
        onSubtasksChange(task.id, (current) =>
          move(
            [...current].sort((left, right) => left.order - right.order),
            event,
          ).map((subtask, order) => ({ ...subtask, order })),
        );
      }}
    >
      <SubtaskItems task={task} onSubtasksChange={onSubtasksChange} />
    </DragDropProvider>
  );
}

function SubtaskItems({ task, onSubtasksChange }: TaskSubtaskListProps) {
  const groupId = `subtasks-${task.id}`;
  const { ref } = useDroppable({
    id: groupId,
    type: "subtask",
    accept: "subtask",
  });

  if (task.subtasks.length === 0) {
    return <p className="mt-3 text-sm text-gray-500">No subtasks yet.</p>;
  }

  return (
    <ul ref={ref} className="mt-2 space-y-2">
      {[...task.subtasks]
        .sort((left, right) => left.order - right.order)
        .map((subtask, index) => (
          <SubtaskRow
            key={subtask.id}
            taskId={task.id}
            subtask={subtask}
            index={index}
            groupId={groupId}
            onSubtasksChange={onSubtasksChange}
          />
        ))}
    </ul>
  );
}

function SubtaskRow({
  taskId,
  subtask,
  index,
  groupId,
  onSubtasksChange,
}: {
  taskId: number;
  subtask: Subtask;
  index: number;
  groupId: string;
  onSubtasksChange: TaskSubtaskListProps["onSubtasksChange"];
}) {
  const { ref, handleRef, isDragging } = useSortable({
    id: subtask.id,
    index,
    group: groupId,
    type: "subtask",
    accept: "subtask",
  });

  function updateSubtask(update: (item: Subtask) => Subtask) {
    onSubtasksChange(taskId, (subtasks) =>
      subtasks.map((item) => (item.id === subtask.id ? update(item) : item)),
    );
  }

  return (
    <li
      ref={ref}
      className={`border-ink bg-paper flex min-h-14 items-center gap-2 rounded-sm border-2 px-3 py-2 ${isDragging ? "opacity-50" : ""}`}
    >
      <GripVertical
        ref={handleRef}
        aria-hidden="true"
        className="size-4 shrink-0 cursor-grab text-gray-500 active:cursor-grabbing"
      />
      <button
        type="button"
        aria-label={
          subtask.done ? "Mark subtask incomplete" : "Mark subtask complete"
        }
        aria-pressed={subtask.done}
        onClick={() => updateSubtask((item) => ({ ...item, done: !item.done }))}
        className={`border-ink flex size-6 shrink-0 items-center justify-center rounded-sm border-2 ${subtask.done ? "bg-ink text-paper" : "bg-paper text-ink"}`}
      >
        {subtask.done ? (
          <Check aria-hidden="true" className="size-4" strokeWidth={3} />
        ) : null}
      </button>
      <span
        className={`min-w-0 flex-1 text-sm ${subtask.done ? "text-gray-500 line-through" : "text-ink"}`}
      >
        {subtask.title}
      </span>
      <button
        type="button"
        aria-label={`Remove subtask: ${subtask.title}`}
        onClick={() =>
          onSubtasksChange(taskId, (subtasks) =>
            subtasks
              .filter((item) => item.id !== subtask.id)
              .map((item, order) => ({ ...item, order })),
          )
        }
        className="hover:text-ink shrink-0 px-1 text-sm text-gray-500"
      >
        ×
      </button>
    </li>
  );
}
