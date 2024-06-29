<script setup lang="ts">
import { ref, defineProps, toRefs, h, computed, watch} from "vue";
import { useVueTable, getCoreRowModel,getFilteredRowModel, FlexRender, type ColumnDef } from "@tanstack/vue-table";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "../ui/button";
import BroadcastDialog from "./BroadcastDialog.vue";

interface User {
  id: string;
  name: string;
  address: string;
  subscribed: boolean;
  tags: string[];
}

const props = defineProps(["project_id"]);
const { project_id } = toRefs(props);

// Sample data
const users = ref<User[]>([
  { id: "1", name: "Alice", address: "123 Lane", subscribed: true, tags: ["premium", "new"] },
  { id: "2", name: "Bob", address: "456 Drive", subscribed: false, tags: ["standard"] },
  { id: "3", name: "Carol", address: "789 Way", subscribed: true, tags: ["premium", "frequent"] },
]);

const tagFilterFn = (row:any, columnId:any, filterValue:any) => {
  return filterValue.length === 0 || filterValue.some((tag:any) => row.getValue(columnId).includes(tag));
};

const columns: ColumnDef<User>[] = [
  { accessorKey: "name", header: () => h("div",{class:"text-blue-200 font-brand"},"Name"), cell: ({ row }) => h("div", {class:"text-white"}, row.getValue("name")) },
  { accessorKey: "id", header: () => h("div", {class:"text-blue-200 font-brand"},"ID"), cell: ({ row }) => h("div", {class:"text-white"}, row.getValue("id")) },
  { accessorKey: "address", header: () => h("div", {class:"text-blue-200 font-brand"},"Address"), cell: ({ row }) => h("div", {class:"text-white"}, row.getValue("address")) },
  { accessorKey: "subscribed", header: () => h("div", {class:"text-blue-200 font-brand"},"Subscribed"), cell: ({ row }) => h("div", {class:"text-white"}, row.getValue("subscribed") ? "Yes" : "No") },
  {
    accessorKey: "tags",
    header: () => h("div", {class:"text-blue-200 font-brand"},"Tags"),
    cell: ({ row }: { row: any }) => {
      return h(
        "div",
        {},
        row.getValue("tags").map((tag:any) => h("span", { class: "px-3 py-1.5 bg-stone-700 text-white mx-1 rounded-full" }, tag))
      );
    },
    filterFn: tagFilterFn
  },
];
const columnFilters = ref<any>([]);

columns.unshift({
  id: 'selection',
  header: () => h('input', {
    type: 'checkbox',
    checked: selectedRowIds.value.size === users.value.length,
    onChange: (e:any) => {
      if (e.target.checked) {
        const allIds = users.value.map(user => user.id);
        selectedRowIds.value = new Set(allIds);
      } else {
        selectedRowIds.value.clear();
      }
    },
  }),
  cell: ({ row }) => h('input', {
    type: 'checkbox',
    checked: selectedRowIds.value.has(row.original.id),
    onChange: () => {
      const rowId = row.original.id;
      if (selectedRowIds.value.has(rowId)) {
        selectedRowIds.value.delete(rowId);
      } else {
        selectedRowIds.value.add(rowId);
      }
    },
  }),
});

columns.push({
  id: 'chat',
  header: () => h("div",{class:'text-blue-200 font-brand text-center'},"Chat"),
  cell: ({ row }) => h('div', { class: 'flex justify-center' }, [
    h('button', {
      onClick: () => openChat(row.original.id), // Assuming openChat is a method you'll define to handle chat opening
      class: 'border px-4 py-2 rounded-xl hover:bg-blue-500 hover:text-white hover:ring-2 hover:ring-blue-300 hover:ring-offset-2 duration-300 hover:scale-95 active:scale-75 flex justify-center items-center space-x-2 bg-gray-50'
    }, 'Chat')
  ])
})

const table = useVueTable({
  data: users.value,
  columns,
  getCoreRowModel: getCoreRowModel(),
  getFilteredRowModel: getFilteredRowModel(),
  state: {
    get columnFilters() { return columnFilters.value },
  }
});

const selectedTags = ref<string[]>([]);
const selectedRowIds = ref(new Set<string>());



const toggleTag = (tag: string) => {
  const index = selectedTags.value.indexOf(tag);
  if (index >= 0) {
    selectedTags.value.splice(index, 1);
  } else {
    selectedTags.value.push(tag);
  }

  console.log(selectedTags.value)

  if(selectedTags.value.length > 0){
    columnFilters.value = [{ id: 'tags', value: selectedTags.value }];
  } else {
    columnFilters.value = [];
  }

};
const uniqueTags = computed(() => {
  const tagsMap = new Map<string, number>();
  users.value.forEach(user => {
    user.tags.forEach(tag => {
      if (tagsMap.has(tag)) {
        tagsMap.set(tag, tagsMap.get(tag)! + 1);
      } else {
        tagsMap.set(tag, 1);
      }
    });
  });
  const tagsArray = Array.from(tagsMap.entries()).map(([tag, count]) => ({ tag, count }));
  return tagsArray;
});

const broadcastRecipients = ref<any>([])

const bulkselect = () => {
  let _users = users.value.filter(user => selectedRowIds.value.has(user.id));
  // selectedRowIds.value.clear(); // Clear selection after action
  broadcastRecipients.value = _users;
  // console.log(_users)
};

const openChat = (userId: string) => {
  console.log(`Opening chat for user ID: ${userId}`);
  // Implementation depends on how you handle chats in your app
  // For example, this could dispatch a Vuex action or emit an event
};


</script>

<template>
  <div class="w-full h-full">

    <div class="w-full p-4 py-2  text-white border-y border-y-stone-700 flex justify-between items-center">
      <div v-if="selectedRowIds.size != 0">
        Selected: {{ selectedRowIds.size }} rows
      </div>
      <div v-else>
        Select Users to Broadcast
      </div>

      <BroadcastDialog :recipients="broadcastRecipients" >
        <Button @click="bulkselect()" :disabled="selectedRowIds.size == 0" class="bg-blue-500 disabled:bg-stone-700 text-white hover:bg-blue-700">Broadcast</Button>
      </BroadcastDialog>
    </div>

    <div class="w-full grid-cols-5 grid h-full">

      <div class="w-full border-r border-r-stone-700 py-4 px-2">
        <p class="mb-4 text-sm font-semibold text-white">Tags</p>

        <div v-for="tag_entry in uniqueTags" :key="tag_entry.tag" class="w-full">
          <Button class="w-full text-left bg-stone-800 text-white mb-1" variant="ghost" @click="toggleTag(tag_entry.tag)">
            <div class="w-full flex justify-between items-center"> 
              <span><strong>{{ tag_entry.tag }}</strong> ({{ tag_entry.count }})</span>
              <span v-if="selectedTags.includes(tag_entry.tag)">✓</span></div>
          </Button>
        </div>
      </div>

      <div class="w-full col-span-4">
        <Table>
          <TableHeader>
            <TableRow class="bg-stone-800 hover:bg-stone-700" v-for="headerGroup in table.getHeaderGroups()" :key="headerGroup.id">
              <TableHead v-for="header in headerGroup.headers" :key="header.id">
                <FlexRender :render="header.column.columnDef.header" :props="header.getContext()" />
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow class="border-b-stone-700 hover:bg-stone-700" v-for="row in table.getRowModel().rows" :key="row.id">
              <TableCell v-for="cell in row.getVisibleCells()" :key="cell.id">
                <FlexRender :render="cell.column.columnDef.cell" :props="cell.getContext()" />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
    
  </div>
</template>
