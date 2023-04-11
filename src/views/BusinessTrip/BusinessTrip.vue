<template>
    <div class="grid px-3">
        <div class="col-12">
            <div class="grid ">
                <div class="col-12 pb-0">
                    <bread-crumb :breadCump="[{ name: 'Xizmat safari', path: '' }]"></bread-crumb>
                </div>
                <div class="col-12 py-0 mt-2 flex justify-content-between w-full">
                    <div class="grid w-full px-0">
                        <div class="xl:col-8 lg:col-8 md:col-6 col-6 pl-3">
                            <span class="text-2xl font-semibold">Xizmat safaridagi xodimlar
                                <span class="text-base text-primary pl-2"> ({{ totalPage }})</span>
                            </span>
                        </div>
                        <div class="col-6 xl:col-4 lg:col-4 md:col-6 pr-0">

                        </div>
                    </div>
                </div>
            </div>
        </div>
       

        <div class="col-12 py-0" v-show="!loader">
            <DataTable ref="dt" :value="table_list" dataKey="id" responsiveLayout="scroll" showGridlines
                class="p-datatable-sm" stripedRows v-model:selection="selectitem" selectionMode="single"
                v-show="table_list.length !== 0">
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
                            <Image :src="slotProps.data.cadry.photo" :alt="slotProps.data.fullname" width="30" height="30"
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
                            {{ slotProps.data.cadry.fullname }}
                        </div>
                    </template>
                </Column>
                <Column style="min-width: 110px; width: 130px">
                    <template #header>
                        <div class="text-800 text-sm lg:text-base xl:text-sm uppercase font-medium">
                            Sana
                        </div>
                    </template>
                    <template #body="slotProps">
                        <div class="text-sm sm:text-sm md:text-sm lg:text-base xl:text-base flex w-full justify-content-center"
                            v-if="!slotProps.data.days">
                            <Chip :label="`Ma'lumot yo'q`"
                                class="mr-2 mb-2 text-sm text-yellow-700 bg-yellow-100 font-normal flex w-full justify-content-center" />
                        </div>
                        <div class="text-sm sm:text-sm md:text-sm lg:text-base xl:text-base flex w-full justify-content-center"
                            v-if="slotProps.data.days">
                            <Chip :label="formatter.arrowDateFormat(slotProps.data.date_command)"
                                class="mr-2 mb-2 text-sm text-blue-700 bg-blue-100 font-medium" />
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
                <Column style="min-width: 110px; width: 130px">
                    <template #header>
                        <div class="text-800 text-sm lg:text-base xl:text-sm uppercase font-medium">
                            Qachondan
                        </div>
                    </template>
                    <template #body="slotProps">
                        <div class="text-sm sm:text-sm md:text-sm lg:text-base xl:text-base flex w-full justify-content-center"
                            v-if="!slotProps.data.days">
                            <Chip :label="`Ma'lumot yo'q`"
                                class="mr-2 mb-2 text-sm text-yellow-700 bg-yellow-100 font-normal" />
                        </div>
                        <div class="text-sm sm:text-sm md:text-sm lg:text-base xl:text-base flex w-full justify-content-center"
                            v-if="slotProps.data.days">
                            <Chip :label="formatter.arrowDateFormat(slotProps.data.date1)"
                                class="mr-2 mb-2 text-sm text-blue-700 bg-blue-100 font-medium" />
                        </div>
                    </template>
                </Column>
                <Column style="min-width: 110px; width: 130px">
                    <template #header>
                        <div class="text-800 text-sm lg:text-base xl:text-sm uppercase font-medium">
                            Qachongacha
                        </div>
                    </template>
                    <template #body="slotProps">
                        <div class="text-sm sm:text-sm md:text-sm lg:text-base xl:text-base flex w-full justify-content-center"
                            v-if="!slotProps.data.days">
                            <Chip :label="`Ma'lumot yo'q`"
                                class="mr-2 mb-2 text-sm text-yellow-700 bg-yellow-100 font-normal" />
                        </div>
                        <div class="text-sm sm:text-sm md:text-sm lg:text-base xl:text-base flex w-full justify-content-center"
                            v-if="slotProps.data.days">
                            <Chip :label="formatter.arrowDateFormat(slotProps.data.date2)"
                                class="mr-2 mb-2 text-sm text-blue-700 bg-blue-100 font-medium" />
                        </div>
                    </template>
                </Column>
                <Column style="min-width: 60px; width: 60px" lignFrozen="right" frozen>
                    <template #header>
                        <div class="text-800 text-sm lg:text-base xl:text-base font-medium">

                        </div>
                    </template>
                    <template #body="slotProps">
                        <div class="flex w-full align-items-center gap-2">
                            <button v-ripple class="custom-icon-btn custom-btn-primary"
                                @click="toggle($event, slotProps.data)">
                                <i class="bx bx-dots-vertical-rounded"></i>
                            </button>
                            <Menu ref="menu" id="overlay_menu" :model="menu_items" :popup="true" />
                        </div>
                    </template>
                </Column>
                <template #footer>
                    <table-pagination v-show="totalPage > 10" :total_page="totalPage"
                        @pagination="changePagination($event)"></table-pagination>
                </template>
            </DataTable>
            <NoDataComponent v-show="table_list.length == 0"></NoDataComponent>

        </div>
        <div class="col-12 py-0" v-show="loader">
            <med-loader></med-loader>
        </div>
        <BusinnesTripModal ref="edit_business" @edit_commander_send="edit_commander($event)" />
        <DeleteModal ref="delete_modal" @delete_accept="delete_element" />
        <Toast position="bottom-right" />
    </div>
</template>

<script>
import BreadCrumb from '@/components/BreadCrumb/BreadCrumb.vue';
import NoDataComponent from '@/components/EmptyComponent/NoDataComponent.vue';
import MedLoader from '@/components/loaders/MedLoader.vue';
import TablePagination from '@/components/Pagination/TablePagination.vue';
import commanderService from '@/service/servises/commanderService';
import formatter from '@/util/formatter';
import DeleteModal from '@/views/BusinessTrip/DeleteModal.vue';

import BusinnesTripModal from './BusinnesTripModal.vue';

export default {
    components: {
        TablePagination,
        BreadCrumb,
        NoDataComponent,
        TablePagination,
        MedLoader,
        BusinnesTripModal,
        DeleteModal,
    },
    data() {
        return {
            loader: false,
            table_list: [],

            selectitem: null,
            formatter,
            totalPage: 0,
            params: {
                page: 1,
                per_page: 10,
            },
            active_cadry: null,
            menu_items: [
                {
                    label: 'Amallar',
                    items: [
                        {
                            label: "Tahrirlash",
                            icon: 'pi pi-pencil',
                            command: () => {
                                this.edit_modal();
                            }
                        },
                        {
                            label: "O'chirish",
                            icon: 'pi pi-trash',
                            command: () => {
                                this.delete_item();
                            }
                        },

                    ]
                },
            ],
        }
    },
    methods: {
        get_list(loader) {
            this.loader = loader;
            commanderService.commander_cadry().then((res) => {
                let number = (this.params.page - 1) * this.params.per_page;
                res.data.commanders.forEach((item) => {
                    number++;
                    item.number = number;
                });
                this.table_list = res.data.commanders;
            }).finally(() => {
                this.loader = false;
            })
        },
        toggle(event, data) {
            this.active_cadry = data;
            this.$refs.menu.toggle(event);
        },
        changePagination(event) {
            this.params.page = event.page;
            this.params.per_page = event.per_page;
            this.get_list(true);
        },
        edit_modal() {
            this.$refs.edit_business.edit_modal(this.active_cadry)
        },
        delete_item() {
            this.$refs.delete_modal.control_modal();
        },
        edit_commander(data){
            commanderService.edit_commander_cadry({
                commander_id:this.active_cadry.id,
                data,
            }).then((res)=>{
                this.$toast.add({
                    severity: "success",
                    summary: "Muvofaqqiyatli bajarildi",
                    detail: "Tahrirlandi",
                    life: 2000,
                });
                this.get_list(false);
            })
        },
        delete_element() {
            commanderService.delete_commander({ commander_id: this.active_cadry.id }).then((res) => {
                this.$toast.add({
                    severity: "success",
                    summary: "Muvofaqqiyatli bajarildi",
                    detail: "O'chirildi",
                    life: 2000,
                });
                this.get_list(false);
            })
        },

    },
    created() {
        this.get_list(true)
    }
}
</script>

<style lang="scss" scoped></style>