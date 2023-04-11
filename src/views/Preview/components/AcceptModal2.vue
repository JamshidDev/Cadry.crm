<template>
    <div>
        <Dialog v-model:visible="dialog" :breakpoints="{
            '640px': '90vw',
        }" :style="{ width: '50vw' }" :modal="true" position="bottom">
            <template #header>
                <h6 class="uppercase text-lg text-blue-500 font-medium">
                    Qabul qilish
                </h6>
            </template>
            <div class="grid">
                <div class="col-12 xl:col-4 lg:col-4">
                    <h6 class="mb-2 pl-2 text-500">Prikaz raqam</h6>
                    <InputText type="text" class="w-full font-normal" placeholder="Kiriting" name="command_number"
                        v-model="command_number" :class="{ 'p-invalid': v$.command_number.$invalid && submitted }" />
                </div>
                <div class="col-12 xl:col-6 lg:col-6"></div>
                <div class="col-12 xl:col-6 lg:col-6">
                    <h6 class="mb-2 pl-2 text-500">
                        Bo'limni tanlang ({{ department_list.length }})
                    </h6>
                    <Dropdown v-model="department_id" :options="department_list" optionLabel="name" :filter="true"
                        :loading="loading" placeholder="Tanlang" class="w-full p-input-sm"
                        :class="{ 'p-invalid': v$.department_id.$invalid && submitted }" @change="change_department">
                        <template #value="slotProps">
                            <div class="font-normal" v-if="slotProps.value">
                                <div>{{ slotProps.value.name }}</div>
                            </div>
                            <span v-else class="font-normal">
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
                <div class="col-12 xl:col-6 lg:col-6">
                    <h6 class="mb-2 pl-2 text-500">
                        Lavozimni tanlang ({{ staff_list.length }})
                    </h6>
                    <Dropdown v-model="department_staff_id" :loading="staff_loading" :disabled="!department_id"
                        :options="staff_list" optionLabel="staff_fullname" :filter="true" placeholder="Tanlang"
                        class="w-full p-input-sm" :class="{ 'p-invalid': v$.department_staff_id.$invalid && submitted }">
                        <template #value="slotProps">
                            <div class="font-semibold" v-if="slotProps.value">
                                <div>{{ slotProps.value.staff_fullname }}</div>
                            </div>
                            <span v-else class="font-normal">
                                {{ slotProps.placeholder }}
                            </span>
                        </template>
                        <template #option="slotProps">
                            <div class="country-item">
                                <div>{{ slotProps.option.staff_fullname }}</div>
                            </div>
                        </template>
                    </Dropdown>
                </div>

                <div class="col-12 xl:col-4 lg:col-4">
                    <h6 class="mb-2 pl-2 text-500">Faoliyat turi</h6>
                    <Dropdown v-model="staff_status" :options="status_list" :loading="loading" optionLabel="name"
                        placeholder="Tanlang" class="w-full font-normal"
                        :class="{ 'p-invalid': v$.staff_status.$invalid && submitted }" />
                </div>
                <div class="col-12 xl:col-4 lg:col-4">
                    <h6 class="mb-2 pl-2 text-500">Lavozim sanasi</h6>
                    <Calendar class="w-full font-normal" :manualInput="true" v-model="staff_date" v-maska="'##/##/####'"
                        dateFormat="dd/mm/yy" :showButtonBar="true" placeholder="Sanani tanlang"
                        :class="{ 'p-invalid': v$.staff_date.$invalid && submitted }" />
                </div>
                <div class="col-12 xl:col-4 lg:col-4">
                    <h6 class="mb-2 pl-2 text-500">Plan</h6>
                    <InputText type="number" class="w-full font-normal" placeholder="Kiriting" id="adressStreet"
                        v-model="rate" :class="{ 'p-invalid': v$.rate.$invalid && submitted }" />
                </div>
                <div class="col-12 xl:col-4 lg:col-4">
                    <h6 class="mb-2 pl-2 text-500">Shartnoma turi</h6>
                    <Dropdown v-model="work_status_id" :options="work_status_list" :loading="loading" optionLabel="name"
                        placeholder="Tanlang" class="w-full font-normal"
                        :class="{ 'p-invalid': v$.work_status_id.$invalid && submitted }" />
                </div>
                <div class="col-12 xl:col-4 lg:col-4">
                    <div v-show="work_status_id?.id==2">
                        <h6 class="mb-2 pl-2 text-500">Qachondan(shartnoma)</h6>
                        <Calendar class="w-full font-normal" :manualInput="true" v-model="work_date1" v-maska="'##/##/####'"
                            dateFormat="dd/mm/yy" :showButtonBar="true" placeholder="Sanani tanlang"
                            />
                    </div>
                </div>
                <div class="col-12 xl:col-4 lg:col-4">
                    <div v-show="work_status_id?.id==2">
                        <h6 class="mb-2 pl-2 text-500">Qachongacha(shartnoma)</h6>
                        <Calendar class="w-full font-normal" :manualInput="true" v-model="work_date2" v-maska="'##/##/####'"
                            dateFormat="dd/mm/yy" :showButtonBar="true" placeholder="Sanani tanlang"
                             />
                    </div>
                </div>
                <div class="col-12 xl:col-4 lg:col-4">
                    <h6 class="mb-2 pl-2 text-500">Lavozim raziryadi</h6>
                    <InputText type="number" class="w-full font-normal" placeholder="Kiriting" id="staff_rank"
                        v-model="rank" :class="{ 'p-invalid': v$.rank.$invalid && submitted }" />
                </div>
                <div class="col-12 xl:col-4 lg:col-4">
                    <h6 class="mb-2 pl-2 text-500">Tarif koeffitsienti</h6>
                    <InputText type="number" class="w-full font-normal" placeholder="Kiriting" id="staff_coefficient"
                        v-model="coefficient" :class="{ 'p-invalid': v$.coefficient.$invalid && submitted }" />
                </div>
                <div class="col-12 xl:col-4 lg:col-4">
                    <h6 class="mb-2 pl-2 text-500">Eng kam oylik ish haqi</h6>
                    <InputText type="number" class="w-full font-normal" placeholder="Kiriting" id="min_salary"
                        v-model="min_sum" :class="{ 'p-invalid': v$.min_sum.$invalid && submitted }" />
                </div>
               



                <div class="col-12 flex justify-content-center">
                    <Button icon="pi pi-check-circle" label="Ishga qabul qilish" class="p-button-success  mt-4 p-button-sm"
                        @click="pushCadry(!v$.$invalid)"></Button>
                </div>
            </div>

            <template #footer> </template>
        </Dialog>
    </div>
</template>

<script>
import DepartmentStuffService from '@/service/servises/DepartmentStuffService';
import SlugService from '@/service/servises/SlugService';
import formatter from '@/util/formatter';
import { useVuelidate } from '@vuelidate/core';
import {
  helpers,
  maxLength,
  minLength,
  required,
} from '@vuelidate/validators';

export default {
    setup() {
        const v$ = useVuelidate();
        return { v$ };
    },
    data() {
        return {
            dialog: false,
            department_id: null,
            department_staff_id: null,
            rate: 1,
            staff_status: null,
            staff_date: null,
            command_number: null,
            comment: null,
            work_status_id: null,
            work_date1: null,
            work_date2: null,
            rank: 0,
            coefficient: 0,
            min_sum: 920000,

            department_list: [],
            staff_list: [],
            status_list: [],
            work_status_list: [],
            submitted: false,

            // loaders
            loading: false,
            staff_loading: false,
            formatter,
        }
    },
    methods: {
        control_modal() {
            this.dialog = true;
            this.submitted = false;
        },
        pushCadry(invalid) {
            this.submitted = true;
            if (invalid) {
                let data ={
                    department_id:this.department_id.id,
                    department_staff_id:this.department_staff_id.id,
                    rate:this.rate,
                    staff_status:this.staff_status.id,
                    staff_date :this.formatter.outDateFormatter(this.staff_date),
                    command_number: this.command_number,
                    comment:this.comment,
                    work_status_id:this.work_status_id.id,
                    work_date1:this.work_status_id.id==2? this.formatter.outDateFormatter(this.work_date1) : null,
                    work_date2:this.work_status_id.id==2? this.formatter.outDateFormatter(this.work_date2) : null,
                    rank :this.rank,
                    coefficient:this.coefficient,
                    min_sum: this.min_sum,
                }
                this.$emit("accept_candidate", data);
                this.dialog=false;
            }
        },
        get_lists() {
            this.loading = true;
            SlugService.accept_slug().then((res) => {
                this.department_list = res.data.departments;
                this.status_list = res.data.staff_statuts;
                this.work_status_list = res.data.work_statuses;
                this.loading = false;

            })
        },
        change_department(event) {
            let id = event.value.id;
            this.staff_status = null,
                this.staff_loading = true;
            DepartmentStuffService.get_DepartmentStuff({ id, params: { page: 1, per_page: 1000 } }).then((res) => {
                this.staff_list = res.data.department.data;
                this.staff_loading = false;
            });
        },
    },
    validations() {
        return {
            department_id: { required: helpers.withMessage("Maydon to'ldirilishi shart!", required) },
            department_staff_id: { required: helpers.withMessage("Maydon to'ldirilishi shart!", required) },
            rate: { required: helpers.withMessage("Maydon to'ldirilishi shart!", required) },
            staff_status: { required: helpers.withMessage("Maydon to'ldirilishi shart!", required) },
            staff_date: { required: helpers.withMessage("Maydon to'ldirilishi shart!", required) },
            command_number: { required: helpers.withMessage("Maydon to'ldirilishi shart!", required) },
            work_status_id:{ required: helpers.withMessage("Maydon to'ldirilishi shart!", required) },
            rank: { required: helpers.withMessage("Maydon to'ldirilishi shart!", required) },
            coefficient: { required: helpers.withMessage("Maydon to'ldirilishi shart!", required) },
            min_sum: { required: helpers.withMessage("Maydon to'ldirilishi shart!", required) },
        };
    },
    created() {
        this.get_lists()
    }
}
</script>

<style lang="scss" scoped></style>