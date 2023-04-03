<template>
    <div class="grid">
        <div class="col-12 px-0 pt-0 pb-4">
            <div class="alert-box">
                <span class="alert-text">
                    <i class='bx bx-error'></i>Hozirgi vaqtga qadar faoliyat olib borgan lavozimlaringizni to'liq shaklda
                    kiriting va aynan qaysi yillarda ekanligini ham keltirib o'ting.
                </span>
            </div>
        </div>
        <div class="col-12 mb-6" v-if="get_candidate_careers.length">
            <DataTable :value="get_candidate_careers" showGridlines tableStyle="min-width:50rem; width:100%"
                class="p-datatable-sm" responsiveLayout="scroll">
                <Column style="min-width:100px; width:100px;">
                    <template #header>
                        <div class="w-full text-sm uppercase block custom-header-title">Qachondan</div>
                    </template>
                    <template #body="slotProps">
                        <div class="custom-table-body-text">{{ slotProps.data.date1 }}</div>
                    </template>
                </Column>
                <Column style="width: 100px; width:100px;">
                    <template #header>
                        <span class="w-full text-sm uppercase block custom-header-title">Qachongacha</span>
                    </template>
                    <template #body="slotProps">
                        <div class="custom-table-body-text">{{ slotProps.data.date2 }}</div>
                    </template>
                </Column>
                <Column style="min-width:100px;">
                    <template #header>
                        <span class="w-full text-sm uppercase block custom-header-title">Lavozim</span>
                    </template>
                    <template #body="slotProps">
                        <div class="custom-table-body-text"> {{ slotProps.data.staff }}</div>
                    </template>
                </Column>
                <Column style="min-width:80px; width:80px;">
                    <template #header>

                    </template>
                    <template #body="slotProps">
                        <div class="custom-table-body-text w-full text-center flex gap-3 ">
                            <i class="pi-pencil pi cursor-pointer text-blue-400 text-xl" @click="editItem(slotProps.data)"
                                v-tooltip.bottom="`Tahrirlash`"></i>
                            <i class="pi-times-circle pi cursor-pointer text-red-400 text-2xl"
                                @click="delete_item(slotProps.data.index)" v-tooltip.bottom="`O'chirish`"></i>
                        </div>
                    </template>
                </Column>
            </DataTable>
        </div>
        <div class="col-12 flex justify-content-center pb-6">
            <div class="add-relative-btn" @click="addItem()">
                <i class='bx bxs-message-square-add'></i> Qo'shish
            </div>
        </div>
        <div class="col-12">
            <Dialog v-model:visible="dialog" :breakpoints="{
                '1960px': '30vw',
                '1600px': '40vw',
                '1200px': '70vw',
                '960px': '80vw',
                '640px': '90vw',
            }" :style="{ width: '50vw' }" :modal="true">
                <template #header>
                    <h6 class="uppercase text-lg text-blue-500 font-medium">
                        Mehnat faoliyatini qo'shish
                    </h6>
                </template>
                <div class="grid pt-2">

                    <div class="col-6">
                        <h6 class="mb-1 pl-2 candidate-input-label">Qachondan</h6>
                        <InputText type="text" class="w-full font-normal" placeholder="Yilni kiritng" id="candidate-date1"
                            v-model="v$.career_date1.$model" v-maska="'####'"
                            :class="{ 'p-invalid': v$.career_date1.$invalid && submitted }" />
                        <span class="error-input-message block">{{ v$.career_date1.$errors[0]?.$message }}</span>
                    </div>
                    <div class="col-6">
                        <h6 class="mb-1 pl-2 candidate-input-label">Qachongacha</h6>
                        <InputText type="text" class="w-full font-normal" placeholder="Yilni kiritng" id="candidate-date2"
                            v-model="career_date2" />


                    </div>

                    <div class="col-12">
                        <h6 class="mb-1 pl-2 candidate-input-label">Lavozim</h6>
                        <Textarea class="w-full font-normal" placeholder="Lavozimni to'liq kiriting" id="candidate-position"
                            :autoResize="true" rows="3" v-model="v$.career_name.$model"
                            :class="{ 'p-invalid': v$.career_name.$invalid && submitted }" />
                        <span class="error-input-message block">{{ v$.career_name.$errors[0]?.$message }}</span>
                    </div>

                </div>

                <template #footer>
                    <div class="col-12 pt-2">
                        <div class="flex justify-content-end">
                            <Button label="Saqlash" class="p-button-primary p-button-sm"
                                @click="addAndEdit(!v$.$invalid)" />
                        </div>
                    </div>
                </template>
            </Dialog>
        </div>

    </div>
</template>

<script>
import {
  mapActions,
  mapGetters,
} from 'vuex';

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
            dialog_type: true,
            career_date1: null,
            career_date2: null,
            career_name: null,
            submitted: false,
            active_index: null,



        }
    },
    computed: {
        ...mapGetters([
            "get_candidate_careers"
        ]),
    },

    methods: {
        ...mapActions([
            "set_candidate_careers",
            "set_candidate_careers_edit",
            "set_candidate_careers_delete"
        ]),
        remote_check() {
            this.$emit('checked_form4')
        },
        addAndEdit(isFormValid) {
            this.submitted = true;
            if (isFormValid) {
                let data = {
                    index: this.get_candidate_careers.length,
                    date1: this.career_date1,
                    date2: this.career_date2,
                    staff: this.career_name,
                }
                if (this.dialog_type) {
                    this.set_candidate_careers(data)
                } else {
                    data.index = this.active_index;
                    this.set_candidate_careers_edit(data)
                }
                this.dialog = false;
            }

        },
        addItem() {
            this.submitted = false;
            this.dialog = true;
            this.dialog_type = true;
            this.career_date1 = null;
            this.career_date2 = null;
            this.career_name = null;
        },
        editItem(item) {
            this.active_index = item.index;
            this.career_date1 = item.date1;
            this.career_date2 = item.date2;
            this.career_name = item.staff;

            this.submitted = false;
            this.dialog = true;
            this.dialog_type = false;
        },
        delete_item(index) {
            this.set_candidate_careers_delete(index)
        }
    },
    validations() {
        return {
            career_date1: {
                required: helpers.withMessage("Maydon to'ldirilishi shart!", required),
                minLength: helpers.withMessage("Yilni to'g'ri kiriting!", minLength(4)),

            },
            // career_date2: {
            //     required: helpers.withMessage("Maydon to'ldirilishi shart!", required),
            //     minLength: helpers.withMessage("Yilni to'g'ri kiriting!", minLength(4)),

            // },
            career_name: { required: helpers.withMessage("Maydon to'ldirilishi shart!", required) },
        };
    },
}
</script>

<style lang="scss" scoped>
.candidate-input-label {
    font-size: 14px;
    color: #2e5890;
    font-family: 'Poppins', sans-serif !important;
}

.error-input-message {
    color: #e24c4c !important;
    font-size: 12px;
    padding-left: 4px;
    font-weight: 500;
}

.add-relative-btn {
    padding: 10px 30px;
    border-radius: 10px;
    background-color: #2e5890;
    color: #fff;
    display: flex;
    gap: 10px;
    user-select: none;
    cursor: pointer;

    i {
        font-size: 20px;
    }

    &:hover {
        background-color: #4076bc;
    }
}

.alert-box {
    width: 100%;
    padding: 10px 30px;
    background-color: #9ecffa4d;
    color: #2e5890;
    font-size: 15px;

    i {
        font-size: 20px;
        font-weight: 600;
        color: #2e5890;
        padding: 0px 6px;

    }

}

.custom-header-title {
    font-size: 14px;
    color: #2e5890;
    font-family: 'Poppins', sans-serif !important;
    font-weight: 500;
}

.custom-table-body-text {
    font-family: 'Poppins', sans-serif !important;
    font-size: 14px;
    font-weight: 400;
}</style>