<template>
    <div class="grid" v-if="get_select_infos">
        <div class="col-12 px-0 pt-0 pb-4">
            <div class="alert-box">
                <span class="alert-text">
                    <i class='bx bx-error'></i>Yaqin qarindoshlaringizning  ma'lumotlarini to'liq va aniq shaklda bo'lishi shart! 
                </span>
            </div>
        </div>
        <div class="col-12 mb-6" v-if="get_candidate_relatives.length">
            <DataTable :value="get_candidate_relatives" showGridlines tableStyle="min-width:50rem; width:100%" class="p-datatable-sm"
                responsiveLayout="scroll">
                <Column style="min-width:100px; width:100px;">
                    <template #header>
                        <div class="w-full text-sm uppercase block custom-header-title">Qarindoshligi</div>
                    </template>
                    <template #body="slotProps">
                        <div class="custom-table-body-text">{{ get_select_infos.relatives.filter(item=> item.id==slotProps.data.relative_id)[0].name}}</div>
                    </template>
                </Column>
                <Column style="width: 200px">
                    <template #header>
                        <span class="w-full text-sm uppercase block custom-header-title">F.I.SH</span>
                    </template>
                    <template #body="slotProps">
                        <div class="custom-table-body-text">{{ slotProps.data.fullname }}</div>
                    </template>
                </Column>
                <Column style="min-width:100px; width:300px;">
                    <template #header>
                        <span class="w-full text-sm uppercase block custom-header-title">Tug'ilgan yili va joyi</span>
                    </template>
                    <template #body="slotProps">
                        <div class="custom-table-body-text"> {{ slotProps.data.birth_place }}</div>
                    </template>
                </Column>
                <Column style="min-width:100px; width:300px;">
                    <template #header>
                        <span class="w-full text-sm uppercase block custom-header-title">Kasbi</span>
                    </template>
                    <template #body="slotProps">
                        <div class="custom-table-body-text">{{ slotProps.data.post }}</div>
                    </template>
                </Column>
                <Column style="min-width:100px; width:300px;">
                    <template #header>
                        <span class="w-full text-sm uppercase block custom-header-title">Yashash manzili</span>
                    </template>
                    <template #body="slotProps">
                        <div class="custom-table-body-text">{{ slotProps.data.address }}</div>
                    </template>
                </Column>
                <Column style="min-width:80px; width:80px;">
                    <template #header>

                    </template>
                    <template #body="slotProps">
                        <div class="custom-table-body-text w-full text-center flex gap-3 ">
                            <i
                                class="pi-pencil pi cursor-pointer text-blue-400 text-xl" @click="editItem(slotProps.data)"></i>
                                <i
                                class="pi-times-circle pi cursor-pointer text-red-400 text-2xl" @click="delete_item(slotProps.data.index)"></i></div>
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
            <Dialog v-model:visible="relative_dialog" :breakpoints="{
                '1960px': '30vw',
                '1600px': '40vw',
                '1200px': '70vw',
                '960px': '80vw',
                '640px': '90vw',
            }" :style="{ width: '50vw' }" :modal="true">
                <template #header>
                    <h6 class="uppercase text-lg text-blue-500 font-medium">
                        {{
                            relative_dialog_type
                            ? "Ma'lumot qo'shish"
                            : "Ma'lumotni tahrirlash"
                        }}
                    </h6>
                </template>
                <div class="grid pt-2">
                    <div class="col-12">
                        <h6 class="mb-1 pl-2 candidate-input-label">Qarindoshligi</h6>
                        <Dropdown v-model="v$.relative.$model" :class="{ 'p-invalid': v$.relative.$invalid && submitted }"
                            :options="get_select_infos.relatives" optionLabel="name" optionValue="id" placeholder="Tanlang"
                            class="w-full font-normal" />
                        <span class="error-input-message block" v-if="submitted">{{ v$.relative.$errors[0]?.$message }}</span>
                    </div>
                    <div class="col-12">
                        <h6 class="mb-1 pl-2 candidate-input-label">F.I.SH</h6>
                        <InputText type="text" class="w-full font-normal" placeholder="Kiriting" id="relative_fullname"
                            v-model="v$.relative_fullname.$model"
                            :class="{ 'p-invalid': v$.relative_fullname.$invalid && submitted }" />
                        <span class="error-input-message block" v-if="submitted">{{ v$.relative_fullname.$errors[0]?.$message }}</span>
                    </div>
                    <div class="col-12">
                        <h6 class="mb-1 pl-2 candidate-input-label">Tug'ilgan yili va joyi</h6>
                        <InputText type="text" class="w-full font-normal" placeholder="Kiritng" id="relative_birthday"
                            v-model="v$.relative_birthday.$model"
                            :class="{ 'p-invalid': v$.relative_birthday.$invalid && submitted }" />
                        <span class="error-input-message block" v-if="submitted">{{ v$.relative_birthday.$errors[0]?.$message }}</span>
                    </div>

                    <div class="col-12">
                        <h6 class="mb-1 pl-2 candidate-input-label">Kasbi</h6>
                        <Textarea class="w-full font-normal" placeholder="Kiriting" id="relative_job" :autoResize="true"
                            rows="1" v-model="v$.relative_job.$model"
                            :class="{ 'p-invalid': v$.relative_job.$invalid && submitted }" />
                        <span class="error-input-message block" v-if="submitted">{{ v$.relative_job.$errors[0]?.$message }}</span>
                    </div>
                    <div class="col-12">
                        <h6 class="mb-1 pl-2 candidate-input-label">Hozirda yashash manzili</h6>
                        <Textarea class="w-full font-normal" placeholder="Kiriting" id="relative_adress"
                            v-model="relative_adress" :autoResize="true" rows="1" />
                    </div>
                </div>

                <template #footer>
                    <div class="col-12 pt-2">
                        <div class="flex justify-content-end">
                            <Button label="Saqlash" class="p-button-secondary p-button-sm"
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

import { globalValidate } from '../../../validation/vuevalidate';

export default {
    setup() {
        const v$ = useVuelidate();
        return { v$ };
    },
    data() {
        return {
            relative_dialog: false,
            relative_dialog_type: true,
            relative: null,
            relative_fullname: null,
            relative_birthday: null,
            relative_job: null,
            relative_adress: null,
            edit_index:null,
            submitted: false,
        }
    },
    computed: {
        ...mapGetters([
            "get_candidate_relatives","get_select_infos"
        ]),
    },

    methods: {
        ...mapActions([
            "set_candidate_relatives",
            "set_candidate_relatives_delete",
            "set_candidate_relatives_edit"
        ]),
        addAndEdit(isFormValid) {
            this.submitted = true;
            if (isFormValid) {
                let data = {
                    index:this.get_candidate_relatives.length,
                    relative_id: this.relative,
                    fullname: this.relative_fullname,
                    birth_place: this.relative_birthday,
                    post: this.relative_job,
                    address: this.relative_adress
                }

                if(this.relative_dialog_type){
                    this.set_candidate_relatives(data);
                }else{
                    data.index = this.edit_index;
                    this.set_candidate_relatives_edit(data)
                }
                this.relative_dialog = false;
            }


        },
        addItem() {
            this.submitted = false,
            this.relative_dialog = true;
            this.relative_dialog_type = true;
            this.edit_index = null;
            this.relative_adress = null;
            this.relative_birthday = null;
            this.relative_fullname = null;
            this.relative_job = null;
            this.relative = null;
        },
        editItem(item){
            this.edit_index = item.index;
            this.relative_adress = item.address;
            this.relative_birthday = item.birth_place;
            this.relative_fullname = item.fullname;
            this.relative_job = item.post;
            this.relative = item.relative_id;
            this.submitted = false,
            this.relative_dialog_type = false;
            this.relative_dialog = true;
        },
        remote_check(){
            this.$emit('checked_form3')
        },
        delete_item(index){
            this.set_candidate_relatives_delete(index)
        }
    },
    validations() {
        return {
            relative_fullname: { required: helpers.withMessage("Maydon to'ldirilishi shart!", required) },
            relative_birthday: { required: helpers.withMessage("Maydon to'ldirilishi shart!", required) },
            relative_job: { required: helpers.withMessage("Maydon to'ldirilishi shart!", required) },
            relative: { required: helpers.withMessage("Maydon tanlanishi shart!", required) },
        };
    },
    created(){
        
    }
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
</style>