<template>
  <div v-if="steps?.length > 0">
    <nav aria-label="Progress">
      <ol role="list" class="divide-y  bg-bremo-800 text-bremo-50  md:flex md:divide-y-0">
        <li @click="filterStep(stepIdx)" v-for="(step, stepIdx) in steps" :key="step.name" class="relative md:flex md:flex-1 cursor-pointer group pl-6 -ml-6 " :class="[isSelectedFilter(stepIdx) ?'bg-blue-500':'hover:bg-bremo-700 hover:border-l  hover:border-l-bremo-800']">
          <div class="group flex w-full items-center">
            <div class="flex items-center justify-between px-6 py-4 text-sm font-medium">
              
              <div class="flex justify-start items-center space-x-2" :class="[isSelectedFilter(stepIdx)?'text-blue-900':'']">
                <span class="font-brand text-xl">{{ step.count }}</span>
                <iconify-icon icon="mdi:user" class="text-3xl" />
              </div>

              <div class="ml-4">
                <div class="text-lg font-medium text-white">{{ step.name }}</div>
                <div class="text-sm text-bremo-400" v-if="getSubtitle(stepIdx)">
                  {{ getSubtitle(stepIdx) }}
                </div>
              </div>
            </div>
          </div>
          <template v-if="true">
            <!-- Arrow separator for lg screens and up -->

            <template v-if="isSelectedFilter(stepIdx)">

              <div class="absolute right-0 top-0 hidden h-full w-5 md:block duration-0" aria-hidden="true">
                <svg class="h-full w-full text-bremo-500 bg-bremo-800" viewBox="0 0 22 80" fill="#3b82f6" preserveAspectRatio="none">
                  <path d="M0 -2L20 40L0 82" vector-effect="non-scaling-stroke" stroke="currentcolor" stroke-linejoin="round" />
                </svg>
              </div>

            </template>

            <template v-else>

              <div class="group-hover:opacity-0 absolute right-0 top-0 hidden h-full w-5 md:block duration-0" aria-hidden="true">
                <svg class="h-full w-full text-bremo-500 bg-bremo-800" viewBox="0 0 22 80" fill="#303036" preserveAspectRatio="none">
                  <path d="M0 -2L20 40L0 82" vector-effect="non-scaling-stroke" stroke="currentcolor" stroke-linejoin="round" />
                </svg>
              </div>
  
              <div class="group-hover:opacity-100 opacity-0 absolute right-0 top-0 hidden h-full w-5 md:block duration-0" aria-hidden="true">
                <svg class="h-full w-full text-bremo-500 bg-bremo-800" viewBox="0 0 22 80" fill="#43444c" preserveAspectRatio="none">
                  <path d="M0 -2L20 40L0 82" vector-effect="non-scaling-stroke" stroke="currentcolor" stroke-linejoin="round" />
                </svg>
              </div>
            </template>



            
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
    <div class="">
      <Table>
        <TableHeader class="bg-bremo-700">
          <TableRow class="hover:bg-bremo-700" v-for="headerGroup in table.getHeaderGroups()" :key="headerGroup.id">
            <TableHead v-for="header in headerGroup.headers" :key="header.id">
              <FlexRender v-if="!header.isPlaceholder" :render="header.column.columnDef.header" :props="header.getContext()" />
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow class="hover:bg-bremo-800" v-for="row in table.getRowModel().rows" :key="row.id">
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
    header: () => h('div', {
      class: 'text-blue-200 font-brand'
    }, 'Address'),
    cell: ({ row }) => h('div', {
      class: 'text-white'
    }, `${String(row.getValue('address')).substring(0,10)}...`),
  },
  {
    accessorKey: 'id',
    header: () => h('div', {
      class: 'text-blue-200 font-brand'
    }, 'ID'),
    cell: ({ row }) => h('div', {
      class: 'text-white'
    }, row.getValue('id')),
  },
  {
    accessorKey: 'name',
    header: () => h('div', {
      class: 'text-blue-200 font-brand'
    }, 'Name'),
    cell: ({ row }) => h('div', {
      class: 'text-white'
    }, row.getValue('name')),
  },
  {
    accessorKey: 'progress',
    filterFn: customGreaterThanOrEqual,
    header: ({ column }) => {
      return h(Button, {
        variant: 'ghost',
        class: 'hover:bg-bremo-800 text-white hover:text-white',
        onClick: () => column.toggleSorting(column.getIsSorted() === 'asc'),
      }, () => [
        h('div', {
          class: 'text-blue-200 font-brand'
        }, 'Progress'),
        h(ArrowUpDown, { class: 'ml-2 h-4 w-4' })
      ])
    },
    cell: ({ row }) => {
      const progress = row.getValue('progress');
      return h('div', {
        class: 'pl-4 text-white'
      }, `${progress}%`);
    },
  },
  {
    accessorKey: 'chat',
    header: () => h('div', {
      class: 'text-blue-200 font-brand text-center'
    }, 'Chat'),
    cell: ({ row }) => h('div', {
      class: 'flex justify-center'
    }, [
      h('button', {
        onClick: () => openChat(row.original.id), // Assuming openChat is a method you'll define to handle chat opening
        class: 'border px-4 py-2 rounded-xl hover:bg-blue-500 hover:text-white hover:ring-2 hover:ring-blue-300 hover:ring-offset-2 duration-300 hover:scale-95 active:scale-75 flex justify-center items-center space-x-2 bg-gray-50'
      }, 'Chat')
    ])

  }
]


// columns.push({
//   id: 'chat',
//   header: () => h("div",{class:'text-blue-200 font-brand text-center'},"Chat"),
//   cell: ({ row }) => h('div', { class: 'flex justify-center' }, [
//     h('button', {
//       onClick: () => openChat(row.original.id), // Assuming openChat is a method you'll define to handle chat opening
//       class: 'border px-4 py-2 rounded-xl hover:bg-blue-500 hover:text-white hover:ring-2 hover:ring-blue-300 hover:ring-offset-2 duration-300 hover:scale-95 active:scale-75 flex justify-center items-center space-x-2 bg-gray-50'
//     }, 'Chat')
//   ])
// })

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

const openChat = (userId) => {
  console.log(`Opening chat for user ID: ${userId}`);
  // Implementation depends on how you handle chats in your app
  // For example, this could dispatch a Vuex action or emit an event
};



const getSubtitle = (idx) => {
  if (idx === 0) return false;

  let _countDiff = steps.value[idx].count - steps.value[idx - 1].count;

  let _percentDiff = ((_countDiff / steps.value[idx - 1].count) * 100).toFixed(2);

  if (_countDiff === 0) {
    _percentDiff = 0
  }

  return `${_countDiff} (${_percentDiff}%)`;
};

const conversionPercent = computed(() => {
  let _countDiff = steps.value[steps.value.length - 1].count;
  let _percentDiff = ((_countDiff / steps.value[0].count) * 100).toFixed(2);
  if (_countDiff === 0) {
    _percentDiff = 0
  }

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
  console.log(301, idx, columnFilters.value)
    return columnFilters.value.filter((filter) => filter.metadata?.idx === idx).length > 0
}

</script>
