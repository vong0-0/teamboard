import { Tabs, TabsList, TabsTrigger } from "~/components/ui/tabs";

export type BoardView = "board" | "list" | "timeline";

export function parseBoardView(value: string | null): BoardView {
  return isBoardView(value) ? value : "board";
}

type BoardViewTabsProps = {
  value: BoardView;
  onValueChange: (value: BoardView) => void;
};

export function BoardViewTabs({ value, onValueChange }: BoardViewTabsProps) {
  return (
    <Tabs
      value={value}
      onValueChange={(nextValue) => {
        if (isBoardView(nextValue)) onValueChange(nextValue);
      }}
      className="gap-0"
    >
      <TabsList
        aria-label="Board view"
        className="border-ink divide-ink bg-paper shadow-hard-sm h-[39px] divide-x-2 rounded-sm border-2 p-0 text-gray-500 group-data-horizontal/tabs:h-[39px]"
      >
        <TabsTrigger
          value="board"
          className="data-active:bg-ink data-active:text-paper data-active:hover:text-paper h-full w-23 flex-none rounded-none px-4 text-base text-gray-500 first:rounded-l-sm data-active:shadow-none"
        >
          Board
        </TabsTrigger>
        <TabsTrigger
          value="list"
          className="data-active:bg-ink data-active:text-paper data-active:hover:text-paper h-full w-17 flex-none rounded-none px-4 text-base text-gray-500 data-active:shadow-none"
        >
          List
        </TabsTrigger>
        <TabsTrigger
          value="timeline"
          className="data-active:bg-ink data-active:text-paper data-active:hover:text-paper h-full w-27 flex-none rounded-none px-4 text-base text-gray-500 last:rounded-r-sm data-active:shadow-none"
        >
          Timeline
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}

function isBoardView(value: unknown): value is BoardView {
  return value === "board" || value === "list" || value === "timeline";
}
