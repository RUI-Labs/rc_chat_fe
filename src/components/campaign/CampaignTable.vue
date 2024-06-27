<template>
  <div v-if="steps?.length > 0">
    <nav aria-label="Progress">
      <ol role="list" class="divide-y divide-gray-300 border-y border-gray-300 md:flex md:divide-y-0">
        <li @click="filterStep(stepIdx)" v-for="(step, stepIdx) in steps" :key="step.name" class="relative md:flex md:flex-1 duration-300 cursor-pointer" :class="[isSelectedFilter(stepIdx) ?'bg-blue-50 hover:bg-blue-100':'hover:bg-gray-100']">
          <div class="group flex w-full items-center">
            <div class="flex items-center justify-between px-6 py-4 text-sm font-medium">
              <p class="font-brand text-xl">{{ step.count }}</p>

              <div class="ml-4">
                <div class="text-sm font-medium text-gray-900">{{ step.name }}</div>
                <div class="text-sm text-yellow-600" v-if="getSubtitle(stepIdx)">
                  {{ getSubtitle(stepIdx) }}
                </div>
              </div>
            </div>
          </div>
          <template v-if="stepIdx !== steps.length - 1">
            <!-- Arrow separator for lg screens and up -->
            <div class="absolute right-0 top-0 hidden h-full w-5 md:block" aria-hidden="true">
              <svg class="h-full w-full text-gray-300 bg-white" viewBox="0 0 22 80" fill="none" preserveAspectRatio="none">
                <path d="M0 -2L20 40L0 82" vector-effect="non-scaling-stroke" stroke="currentcolor" stroke-linejoin="round" />
              </svg>
            </div>
          </template>
        </li>

        <li class="relative flex pr-1">
          <div class="w-full h-full flex justify-center items-center">
            <div class="p-2 bg-blue-500 rounded-xl text-right text-white">
              <p class="text-sm">Conversion Rate</p>
              <span class="font-brand font-semibold text-xl">{{ conversionPercent.percent }} %</span>
            </div>
          </div>
        </li>
      </ol>
    </nav>

    <div class="w-full">
    <div class="border border-t-0">
      <Table>
        <TableHeader>
          <TableRow v-for="headerGroup in table.getHeaderGroups()" :key="headerGroup.id">
            <TableHead v-for="header in headerGroup.headers" :key="header.id">
              <FlexRender v-if="!header.isPlaceholder" :render="header.column.columnDef.header" :props="header.getContext()" />
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow v-for="row in table.getRowModel().rows" :key="row.id">
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

<script setup>
//   import { CheckIcon } from '@heroicons/vue/24/solid'
import { defineProps, toRefs, computed, h, ref } from "vue";
const props = defineProps(["steps","data"]);
const { steps, data } = toRefs(props);
import { Button } from '@/components/ui/button'

import {
  useVueTable,
  getCoreRowModel,
  FlexRender,
  getSortedRowModel,
  getFilteredRowModel
} from '@tanstack/vue-table'

import { valueUpdater } from '@/lib/utils'

const sorting = ref([])
const columnFilters = ref([])

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import { ArrowUpDown, ChevronDown } from 'lucide-vue-next'

// export interface Wallet {
//   id: string
//   name: string
//   address: string
//   progress: number
// }

// const props = defineProps(['data'])
// const { data } = toRefs(props)

const customGreaterThanOrEqual = (rowValue, columnValue, filterValue) => {
    
    let value = rowValue.getValue(columnValue)
    
  return (value >= filterValue)
};

const columns = [
  
  {
    accessorKey: 'address',
    header: () => 'Address',
    cell: ({ row }) => h('div', {}, `${String(row.getValue('address')).substring(0,10)}...`),
  },
  {
    accessorKey: 'id',
    header: () => 'ID',
    cell: ({ row }) => h('div', {}, row.getValue('id')),
  },
  {
    accessorKey: 'name',
    header: () => 'Name',
    cell: ({ row }) => h('div', {}, row.getValue('name')),
  },
  {
    accessorKey: 'progress',
    // header: () => 'Progress',
    filterFn: customGreaterThanOrEqual,
    header: ({ column }) => {
            return h(Button, {
                variant: 'ghost',
                onClick: () => column.toggleSorting(column.getIsSorted() === 'asc'),
            }, () => ['Progress', h(ArrowUpDown, { class: 'ml-2 h-4 w-4' })])
        },
    cell: ({ row }) => {
      const progress = row.getValue('progress');
      return h('div', {
        class:'pl-4'
      }, `${progress}%`); // Assuming progress is a number
    },
  },
]

const table = useVueTable({
  data: data?.value,
  columns,
  getCoreRowModel: getCoreRowModel(),
  getSortedRowModel: getSortedRowModel(),
  onSortingChange: updaterOrValue => valueUpdater(updaterOrValue, sorting),
  onColumnFiltersChange: updaterOrValue => valueUpdater(updaterOrValue, columnFilters),
  getFilteredRowModel: getFilteredRowModel(),
  state: {
    get sorting() { return sorting.value },
    get columnFilters() { return columnFilters.value },
  },
})



const getSubtitle = (idx) => {
  if (idx === 0) return false;

  let _countDiff = steps.value[idx].count - steps.value[idx - 1].count;
  let _percentDiff = ((_countDiff / steps.value[idx - 1].count) * 100).toFixed(2);

  return `${_countDiff} (${_percentDiff}%)`;
};

const conversionPercent = computed(() => {
  let _countDiff = steps.value[steps.value.length - 1].count;
  let _percentDiff = ((_countDiff / steps.value[0].count) * 100).toFixed(2);

  return {
    count: _countDiff,
    percent: _percentDiff,
  };
});

// const filterStep = (idx) => {

//     // get progress using idx

    

// //   console.log('filterStep');
// const newFilters = [{ id: 'progress', value: [90] }];
//   columnFilters.value = newFilters;
// };




const filterStep = (idx) => {

  if(isSelectedFilter(idx)) {
    // clear
    columnFilters.value = []
  } else {

    let stepIdxProgress =( idx / (steps.value.length-1)) * 100
  
    console.log('stepIdxProgress', stepIdxProgress);
  // Apply a filter to the progress column where values are >= minCount
  columnFilters.value = [
    { id: 'progress', value: stepIdxProgress, operator: 'greaterThanOrEqual', metadata: { idx } },
  ];
  }
  


};

const isSelectedFilter = (idx) => {
    return columnFilters.value.filter((filter) => filter.metadata?.idx === idx).length > 0
}

</script>
