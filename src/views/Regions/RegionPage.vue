<template >
    <div class="grid px-3">
        <div class="col-12">
            <div class="grid">
                <div class="col-12 pb-0">
                    <bread-crumb :breadCump="[{ name: 'Hududlar', path: '' }]"></bread-crumb>
                </div>
                <div class="col-12 y-0 py-0">
                    <span class="xl:text-base lg:text-base text-sm font-semibold">Hududlar
                        <span class="text-base text-primary pl-2">
                            ({{ totalRegions }})</span>
                    </span>
                </div>
            </div>
        </div>
        <div class="col-12">
            <div class="grid">
                <div class="col-12 xl:col-6 lg:col-6 md:col-6 sm:col-6 flex">
                    <InputText type="text" v-model="searchPartName" placeholder="Nomi orqali qidiruv" class="p-inputtext-sm"
                        @keyup.enter="searchByName()" />
                </div>
                <div class="col-12 xl:col-6 lg:col-6 md:col-6 sm:col-6 flex justify-content-end align-items-center">
                    <Button icon="pi pi-plus" label="Tuman"
                        class="p-button-warning p-button-sm mr-2 xl:block lg:block md:block hidden" @click="addStuff()"
                        v-tooltip.bottom="`Viloyatga tuman qo'shish`"></Button>
                    <Button icon="pi pi-plus" label="Viloyat"
                        class="p-button-info p-button-sm xl:block lg:block md:block hidden" @click="addItemPart()"
                        v-tooltip.bottom="`Yangi viloyat qo'shish`"></Button>

                    <Button icon="pi pi-sitemap" class="p-button-warning p-button-sm mr-2 xl:hidden lg:hidden md:hidden "
                        @click="addStuff()" v-tooltip.bottom="`Bo'limga shtat lavozim biriktirish`"></Button>
                    <Button icon="pi pi-plus" class="p-button-info p-button-sm xl:hidden lg:hidden md:hidden "
                        @click="addItemPart()" v-tooltip.bottom="`Yangi bo'lim qo'shish`"></Button>
                </div>
            </div>
        </div>
        <div class="col-12 py-0" v-show="!loader">
            <DataTable ref="dt" :value="departmentList" dataKey="id" responsiveLayout="scroll" showGridlines
                class="p-datatable-sm" stripedRows v-model:selection="selectitem" selectionMode="multiple"
                v-show="departmentList.length !== 0">
                <Column style="min-width:30px; width:36px">
                    <template #header>
                        <div class="text-800 text-sm lg:text-base xl:text-base font-medium">
                            No
                        </div>
                    </template>
                    <template #body="slotProps">
                        <div class="w-full text-center text-sm font-normal">
                            {{ slotProps.data.number }}
                        </div>
                    </template>
                </Column>
                <Column style="min-width: 16rem">
                    <template #header>
                        <div class="text-800 text-sm lg:text-base xl:text-base font-medium">Viloyat nomi</div>
                    </template>
                    <template #body="slotProps">
                        <div class="
                            text-sm
                              sm:text-sm
                              md:text-sm
                              lg:text-base
                              xl:text-base
                              font-medium
                            ">
                            {{ slotProps.data.name }}
                        </div>
                    </template>
                </Column>



                <Column style="min-width: 110px; width: 110px">
                    <template #header>
                        <div class="text-800 text-sm lg:text-base xl:text-base font-medium">Tumanlar soni</div>
                    </template>
                    <template #body="slotProps">
                        <div class="
                            text-sm
                              sm:text-sm
                              md:text-sm
                              lg:text-base
                              xl:text-base
                              font-medium
                              text-center
                            ">
                            {{ slotProps.data.cities }}
                        </div>
                    </template>
                </Column>

                <Column :exportable="false" style="min-width: 150px; width: 150px">
                    <template #header>
                        <div class="text-800 text-sm lg:text-base xl:text-base font-medium">Amallar</div>
                    </template>
                    <template #body="slotProps">
                        <div class="flex gap-2">
                            <view-button-v v-tooltip.bottom="`Tumanlarni ko'rish`" @click="goDistrict(slotProps.data.id, slotProps.data.name )"
                                :icon="'pi-eye'"></view-button-v>

                            <edit-button :editItem="slotProps.data" @editEvent="editItemPart($event)"></edit-button>
                            <delete-button :deleteItem="slotProps.data.id"
                                @deleteAcceptEvent="deleteItemRegions($event)"></delete-button>
                        </div>
                    </template>
                </Column>
                <template #footer>
                    <table-pagination v-show="totalRegions > 10" :total_page="totalRegions" :page="params.page"
                        :per_page="params.per_page" @pagination="changePagination($event)"></table-pagination>
                </template>
            </DataTable>
            <NoDataComponent v-show="departmentList.length == 0"></NoDataComponent>
        </div>
        <div class="col-12 py-0" v-show="loader">
            <department-loader></department-loader>
        </div>
        <div class="col-12">
            <Toast position="bottom-right" />
            <Dialog v-model:visible="partDialog" :breakpoints="{
                '1960px': '30vw',
                '1600px': '40vw',
                '1200px': '70vw',
                '960px': '80vw',
                '640px': '90vw',
            }" :style="{ width: '50vw' }" :modal="true">
                <template #header>
                    <h6 class="uppercase text-lg text-blue-500 font-medium">
                        {{ partDialogType ? "Viloyat qo'shish" : "Viloyatni tahrirlash" }}
                    </h6>
                </template>
                <div class="grid pt-2">
                    <div class="col-12">
                        <h6 class="mb-2 pl-2 text-500">Viloyat nomi</h6>
                        <InputText type="text" class="w-full font-semibold" placeholder="Kiriting"
                            v-model="RegionDetails.name" :class="{ 'p-invalid': errorInput && submitPart }" />
                    </div>
                </div>

                <template #footer>
                    <div class="col-12 pt-2">
                        <div class="flex justify-content-end">
                            <Button label="Saqlash" class="p-button-secondary p-button-sm" @click="addAndEdit()" />
                        </div>
                    </div>
                </template>
            </Dialog>

            <Dialog v-model:visible="stuffDialog" :breakpoints="{
                '1960px': '30vw',
                '1600px': '40vw',
                '1200px': '70vw',
                '960px': '80vw',
                '640px': '90vw',
            }" :style="{ width: '50vw' }" :modal="true">
                <template #header>
                    <h6 class="uppercase text-lg text-blue-500 font-medium">
                        Viloyatga tuman qo'shish
                    </h6>
                </template>
                <div class="grid pt-2">
                    <div class="col-12">
                        <h6 class="mb-2 pl-2 text-500">Viloyatni tanlang</h6>
                        <Dropdown v-model="department" :options="Dep_List" optionLabel="name" :filter="true"
                            placeholder="Tanlang" class="w-full" :class="{ 'p-invalid': errorDepartment && stuffsubmited }">
                            <template #value="slotProps">
                                <div class="country-item country-item-value" v-if="slotProps.value">
                                    <div>{{ slotProps.value.name }}</div>
                                </div>
                                <span v-else>
                                    {{ slotProps.placeholder }}
                                </span>
                            </template>
                            <template #option="slotProps">
                                <div class="country-item">
                                    <div>{{ slotProps.option.name }}</div>
                                </div>
                            </template>
                        </Dropdown>
                    </div>

                    <div class="col-12">
                        <h6 class="mb-2 pl-2 text-500">Tuman nomi</h6>
                        <InputText type="text" class="w-full" placeholder="Kiriting" id="district" v-model="stuf_plan"
                            :class="{ 'p-invalid': errorPlan && stuffsubmited }" />
                    </div>
                </div>

                <template #footer>
                    <div class="col-12 pt-2">
                        <div class="flex justify-content-end">
                            <Button label="Saqlash" class="p-button-secondary p-button-sm" @click="addStuffItem()" />
                        </div>
                    </div>
                </template>
            </Dialog>
        </div>
    </div>
</template>
<script>
import TablePagination from "@/components/Pagination/TablePagination.vue";
import DeleteButton from "@/components/buttons/DeleteButton.vue";
import EditButton from "@/components/buttons/EditButton.vue";
import ViewButtonV from "@/components/buttons/ViewButtonV.vue";
import CountryZone from "@/service/servises/Country-zone.js";
import DepartmentLoader from "@/components/loaders/DepartmentLoader.vue";
import BreadCrumb from "@/components/BreadCrumb/BreadCrumb.vue";
import NoDataComponent from "@/components/EmptyComponent/NoDataComponent.vue";
export default {
    components: {
        DeleteButton,
        EditButton,
        ViewButtonV,
        TablePagination,
        DepartmentLoader,
        BreadCrumb,
        NoDataComponent,
    },
    data() {
        return {
            selectitem: null,
            loader: false,
            searchPartName: null,
            totalRegions: 0,
            partDialog: false,
            partDialogType: true,
            part_id: null,
            RegionDetails: {
                name: "",
            },
            params: {
                page: localStorage.getItem("page_20") ? Number(localStorage.getItem("page_20")) : 1,
                per_page: localStorage.getItem("per_page_20") ? Number(localStorage.getItem("per_page_20")) : 10,
                search: null,
            },

            departmentList: [],
            submitPart: false,

            stuffDialog: false,
            stuff: "",
            department: "",
            full_stuff: "",
            stuf_plan: null,

            StuffList: [],
            stuff_params: {
                search: null,
                page: 1,
                per_page: 1000,
            },
            A_List: [],
            classic: "",
            Dep_List: [],
            department_params: {
                search: null,
                page: 1,
                per_page: 1000,
            },



            stuffsubmited: false,
        };
    },
    methods: {
        get_ResgionList(params, loader) {
            this.controlLoader(loader);
            CountryZone.get_Regions(params)
                .then((res) => {
                    this.totalRegions = res.data.regions.pagination.total;
                    let number = (this.params.page - 1) * this.params.per_page;
                    res.data.regions.data.forEach((item) => {
                        number++;
                        item.number = number;

                    });
                    this.departmentList = res.data.regions.data;
                    this.Dep_List = res.data.regions.data;
                    this.controlLoader(false);
                })
                .catch((error) => {
                    console.log(error);
                    this.controlLoader(false);
                });
        },
        addItemPart() {
            this.submitPart = false;
            this.partDialogType = true;
            this.RegionDetails.name = "";
            this.controlPartDialog(true);
        },
        editItemPart(event) {
            this.submitPart = false;
            this.partDialogType = false;
            this.part_id = event.id;
            (this.RegionDetails.name = event.name), this.controlPartDialog(true);
        },

        addAndEdit() {
            this.submitPart = true;
            if (this.RegionDetails.name.length) {
                let data = {
                    name: this.RegionDetails.name,
                };
                this.controlPartDialog(false);
                if (this.partDialogType) {
                    CountryZone.create_Regions({ data }).then((res) => {
                        this.get_ResgionList(this.params, false);
                        this.$toast.add({
                            severity: "success",
                            summary: "Muvofaqqiyatli bajarildi",
                            detail: "Yaratildi",
                            life: 2000,
                        });
                    })
                } else {
                    CountryZone.update_Regions({
                        region_id: this.part_id,
                        data,
                    })
                        .then((res) => {
                            this.get_ResgionList(this.params, false);
                            this.$toast.add({
                                severity: "success",
                                summary: "Muvofaqqiyatli bajarildi",
                                detail: "Tahrirlandi",
                                life: 2000,
                            });
                        })
                        .catch((error) => {
                            console.log(error);
                        });
                }
            }
        },

        deleteItemRegions(id) {
            CountryZone.delete_Regions({ region_id: id })
                .then((res) => {
                    this.get_ResgionList(this.params, false);
                    // this.get_DepartmentList(this.department_params);
                    this.$toast.add({
                        severity: "success",
                        summary: "Muvofaqqiyatli bajarildi",
                        detail: "O'chirildi",
                        life: 2000,
                    });
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        searchByName() {
            this.params.search = this.searchPartName;
            this.get_Department(this.params, true);
        },

        changePagination(event) {
            this.params.page = event.page;
            this.params.per_page = event.per_page;
            this.get_ResgionList(this.params, true);
            localStorage.setItem("page_20", event.page)
            localStorage.setItem("per_page_20", event.per_page)
        },
      
        addStuff() {
            this.stuffsubmited = false;
            this.department = null;
            this.stuf_plan = "";
            this.controlstuffDialog(true);
        },
        addStuffItem() {
            this.stuffsubmited = true;
            if (
                this.department &&
                this.stuf_plan
            ) {
                let id = this.department.id;
                let data = {
                    region_id: id,
                    name: this.stuf_plan,
                };
                CountryZone.create_District({ id, data })
                    .then((res) => {
                        this.get_ResgionList(this.params, false);
                        this.$toast.add({
                            severity: "success",
                            summary: "Muvofaqqiyatli bajarildi",
                            detail: "Biriktirildi",
                            life: 2000,
                        });
                    })
                    .catch((error) => {
                        console.log(error);
                    });

                this.controlstuffDialog(false);
            }
        },
        goDistrict(id, name){
            this.$router.push(`/admin/country-zone/districts/${id}/${name}`)
        },

        





        controlPartDialog(item) {
            this.partDialog = item;
        },
        controlstuffDialog(item) {
            this.stuffDialog = item;
        },
        controlLoader(item) {
            this.loader = item;
        },
    },
    computed: {
        errorInput() {
            if (this.RegionDetails.name.length == 0) {
                return true;
            } else {
                return false;
            }
        },
        errorStuff() {
            if (!this.stuff) {
                return true;
            } else {
                return false;
            }
        },
        errorDepartment() {
            if (!this.department) {
                return true;
            } else {
                return false;
            }
        },

        errorPlan() {
            if (!this.stuf_plan) {
                return true;
            } else {
                return false;
            }
        },
    },
    created() {
        this.get_ResgionList(this.params, true);
    },
};
</script>
<style lang="scss" scoped>
.p-chip.custom-chip {
    background: var(--green-500);
    color: var(--primary-color-text);
}

.p-chip.custom-chip-red {
    background: var(--red-500);
    color: var(--primary-color-text);
}
</style>