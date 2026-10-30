import {
  Tabs,
  TabsList,
  TabsTrigger,
} from "~/components/ui/tabs";

export function BoardViewTabs() {
  return (
    <Tabs defaultValue="board" className="gap-0">
      <TabsList
        aria-label="Board view"
        className="border-ink divide-ink h-[39px] divide-x-2 rounded-sm border-2 bg-paper p-0 text-gray-500 shadow-hard-sm group-data-horizontal/tabs:h-[39px]"
      >
        <TabsTrigger
          value="board"
          className="h-full w-23 flex-none rounded-none px-4 text-base text-gray-500 data-active:bg-ink data-active:text-paper data-active:shadow-none data-active:hover:text-paper first:rounded-l-sm"
        >
          Board
        </TabsTrigger>
        <TabsTrigger
          value="list"
          className="h-full w-17 flex-none rounded-none px-4 text-base text-gray-500 data-active:bg-ink data-active:text-paper data-active:shadow-none data-active:hover:text-paper"
        >
          List
        </TabsTrigger>
        <TabsTrigger
          value="timeline"
          className="h-full w-27 flex-none rounded-none px-4 text-base text-gray-500 data-active:bg-ink data-active:text-paper data-active:shadow-none data-active:hover:text-paper last:rounded-r-sm"
        >
          Timeline
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
