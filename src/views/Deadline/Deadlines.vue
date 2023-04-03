<template>
    <div class="grid px-3">
        <div class="col-12">
            <div class="grid ">
                <div class="col-12 pb-0">
                    <bread-crumb :breadCump="[{ name: 'Deadline', path: '' }]"></bread-crumb>
                </div>
                <div class="col-12 py-0 mt-2 flex justify-content-between w-full">
                    <div class="grid w-full px-0">
                        <div class="xl:col-8 lg:col-8 md:col-6 col-6 pl-3">
                            <span class="text-2xl font-semibold">Deadline
                                <span class="text-base text-primary pl-2"> ({{ totalPage }})</span>
                            </span>
                        </div>
                        <div class="col-6 xl:col-4 lg:col-4 md:col-6 pr-0">
                            <Dropdown v-model="category_val" :options="category_list" optionLabel="name"
                                class="p-inputtext-sm w-full" placeholder="Kategoriyani tanlang" @change="change_category" />
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="col-12 py-0" v-show="!loader">
            <DataTable ref="dt" :value="deadline_list" dataKey="id" responsiveLayout="scroll" showGridlines
                class="p-datatable-sm" stripedRows v-model:selection="selectitem" selectionMode="single"
                v-show="deadline_list.length !== 0">
                <Column header="" style="min-width: 30px; width: 36px">
                    <template #header>
                        <div class="text-800 text-sm font-medium">No</div>
                    </template>
                    <template #body="slotProps">
                        <div class="w-full text-center text-sm font-normal">
                            {{ slotProps.data.number }}
                        </div>
                    </template>
                </Column>
                <Column style="min-width: 50px; width: 50px">
                    <template #header>
                        <div class="text-800 text-sm lg:text-base xl:text-sm uppercase font-medium">Rasm</div>
                    </template>
                    <template #body="slotProps">
                        <div class="flex justify-content-center">
                            <Image :src="slotProps.data.photo" :alt="slotProps.data.fullname" width="30" height="30"
                                preview />
                        </div>
                    </template>
                </Column>
                <Column style="min-width:100px;">
                    <template #header>
                        <div class="text-800 text-sm lg:text-base xl:text-sm uppercase font-medium">
                            F.I.SH
                        </div>
                    </template>
                    <template #body="slotProps">
                        <div class="text-sm sm:text-sm md:text-sm lg:text-base xl:text-base font-normal">
                            {{ slotProps.data.fullname }}
                        </div>
                    </template>
                </Column>
                <Column style="min-width: 110px; width: 200px">
                    <template #header>
                        <div class="text-800 text-sm lg:text-base xl:text-sm uppercase font-medium">
                            KUN
                        </div>
                    </template>
                    <template #body="slotProps">
                        <div class="text-sm sm:text-sm md:text-sm lg:text-base xl:text-base flex w-full justify-content-center"
                            v-if="!slotProps.data.days">
                            <Chip :label="`Ma'lumot yo'q`"
                                class="mr-2 mb-2 text-sm text-yellow-700 bg-yellow-100 font-normal" />
                        </div>
                        <div class="text-sm sm:text-sm md:text-sm lg:text-base xl:text-base flex w-full justify-content-center"
                            v-else-if="slotProps.data.days < 0">
                            <Chip :label="`${-slotProps.data.days} kun oldin tugagan`"
                                class="mr-2 mb-2 text-sm text-red-700 bg-red-100 font-medium" />
                        </div>
                        <div class="text-sm sm:text-sm md:text-sm lg:text-base xl:text-base flex w-full justify-content-center"
                            v-else-if="slotProps.data.days >= 0">
                            <Chip :label="`${slotProps.data.days} kun qoldi`"
                                class="mr-2 mb-2 text-sm text-green-700 bg-green-100 font-medium" />
                        </div>
                    </template>
                </Column>
                <Column style="min-width: 110px; width: 140px">
                    <template #header>
                        <div class="text-800 text-sm lg:text-base xl:text-sm uppercase font-medium">
                            Muddat
                        </div>
                    </template>
                    <template #body="slotProps">
                        <div class="text-sm sm:text-sm md:text-sm lg:text-base xl:text-base flex w-full justify-content-center"
                            v-if="!slotProps.data.days">
                            <Chip :label="`Ma'lumot yo'q`"
                                class="mr-2 mb-2 text-sm text-yellow-700 bg-yellow-100 font-normal" />
                        </div>
                        <div class="text-sm sm:text-sm md:text-sm lg:text-base xl:text-base" v-if="slotProps.data.days">
                            <Chip :label="formatter.arrowDateFormat(slotProps.data.date)"
                                class="mr-2 mb-2 text-sm text-blue-700 bg-blue-100 font-medium" />
                        </div>
                    </template>
                </Column>
                <template #footer>
                    <table-pagination v-show="totalPage > 10" :total_page="totalPage"
                        @pagination="changePagination($event)"></table-pagination>
                </template>
            </DataTable>
            <NoDataComponent v-show="deadline_list.length == 0"></NoDataComponent>

        </div>
        <div class="col-12 py-0" v-show="loader">
            <med-loader></med-loader>
        </div>
    </div>
</template>

<script>
import BreadCrumb from '@/components/BreadCrumb/BreadCrumb.vue';
import NoDataComponent from '@/components/EmptyComponent/NoDataComponent.vue';
import MedLoader from '@/components/loaders/MedLoader.vue';
import TablePagination from '@/components/Pagination/TablePagination.vue';
import DeadlineService from '@/service/servises/DeadlineService';
import formatter from '@/util/formatter';

export default {
    components: {
        TablePagination,
        BreadCrumb,
        NoDataComponent,
        TablePagination,
        MedLoader,
    },
    data() {
        return {
            loader: false,
            deadline_list: [],
            category_list: [],
            category_val: {
                id: 2,
                name: "Passport muddatlari yaqinlashayotganlar "
            },
            selectitem: null,

            formatter,
            totalPage: 0,
            params: {
                page: 1,
                per_page: 10,
                category_id: 2,
            }
        }
    },
    methods: {
        get_deadlines(params) {
            this.loader = true;
            DeadlineService.get_Deadlines({ params }).then((res) => {
                this.totalPage = res.data.cadries.pagination.total;
                let number = (this.params.page - 1) * this.params.per_page;
                res.data.cadries.data.forEach((item) => {
                    number++;
                    item.number = number;
                });
                this.deadline_list = res.data.cadries.data;
                this.category_list = res.data.categories;
                this.loader = false;
            })
        },
        changePagination(event) {
            this.params.page = event.page;
            this.params.per_page = event.per_page;
            this.get_deadlines(this.params)
        },
        change_category(event){
            this.params.category_id = this.category_val.id;
            this.params.page=1;
            this.params.per_page = 10;
            this.get_deadlines(this.params)
        }
    },
    created() {
        this.get_deadlines(this.params)
    }
}
</script>

<style lang="scss" scoped></style>