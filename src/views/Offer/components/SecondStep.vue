<template>
    <div class="grid" v-if="get_select_infos">
        <div class="col-12 xl:col-4 lg:col-4 md:col-6 mb-2">
            <h6 class="mb-1 pl-2 candidate-input-label">Ma'lumotingiz</h6>
            <Dropdown name="candidate-academy" :options="get_select_infos.educations" optionLabel="name" placeholder="Tanlang"
                class="w-full font-normal" v-model="v$.academy.$model"
                :class="{ 'p-invalid': v$.academy.$invalid && submitted }" />
            <span class="error-input-message block">{{ v$.academy.$errors[0]?.$message }}</span>
        </div>
        <div class="col-12 xl:col-4 lg:col-4 md:col-6 mb-2">
            <h6 class="mb-1 pl-2 candidate-input-label">Ilmiy darajangiz</h6>
            <Dropdown name="candidate-academy_degree" :options="get_select_infos.academicdegree" optionLabel="name" placeholder="Tanlang"
                class="w-full font-normal" v-model="v$.academy_degree.$model"
                :class="{ 'p-invalid': v$.academy_degree.$invalid && submitted }" />
            <span class="error-input-message block">{{ v$.academy_degree.$errors[0]?.$message }}</span>
        </div>
        <div class="col-12 xl:col-4 lg:col-4 md:col-6 mb-2">
            <h6 class="mb-1 pl-2 candidate-input-label">Ilmiy unvoningiz</h6>
            <Dropdown name="candidate-academy_title" :options="get_select_infos.academictitlies" optionLabel="name" placeholder="Tanlang"
                class="w-full font-normal" v-model="v$.academy_title.$model"
                :class="{ 'p-invalid': v$.academy_title.$invalid && submitted }" />
            <span class="error-input-message block">{{ v$.academy_title.$errors[0]?.$message }}</span>
        </div>
        <div class="col-12 xl:col-4 lg:col-4 md:col-6 mb-2">
            <h6 class="mb-1 pl-2 candidate-input-label">Partiyaviyligingiz</h6>
            <Dropdown name="candidate-party" :options="get_select_infos.parties" optionLabel="name" placeholder="Tanlang"
                class="w-full font-normal" v-model="v$.party.$model"
                :class="{ 'p-invalid': v$.party.$invalid && submitted }" />
            <span class="error-input-message block">{{ v$.party.$errors[0]?.$message }}</span>
        </div>

        
        <div class="col-12 xl:col-4 lg:col-4 md:col-6 mb-2">
            <h6 class="mb-1 pl-2 candidate-input-label">Email pochta</h6>
            <InputText type="text" name="candidate-email" class="w-full font-normal" placeholder="Kiriting"
                v-model="v$.email.$model" :class="{ 'p-invalid': v$.email.$invalid && submitted }" />
            <span class="error-input-message block">{{ v$.email.$errors[0]?.$message }}</span>
        </div>

        <div class="col-12 xl:col-4 lg:col-4 md:col-6 mb-2">
            <h6 class="mb-1 pl-2 candidate-input-label">Chet tillari</h6>
                <MultiSelect class="w-full font-normal" 
                :options="get_select_infos.languages" optionLabel="name" placeholder="Tilni tanlang"
                  v-model="v$.languages.$model" :class="{ 'p-invalid': v$.languages.$invalid && submitted }" />

            <span class="error-input-message block">{{ v$.languages.$errors[0]?.$message }}</span>
        </div>

        

        <div class="col-12 xl:col-4 lg:col-4 md:col-6 mb-2">
            <h6 class="mb-1 pl-2 candidate-input-label">Xarbiy unvon</h6>
            <InputText type="text" name="candidate-military_rank" class="w-full font-normal" placeholder="Kiriting"
                v-model="v$.military_rank.$model" :class="{ 'p-invalid': v$.military_rank.$invalid && submitted }" />
            <span class="error-input-message block">{{ v$.military_rank.$errors[0]?.$message }}</span>
        </div>
        <div class="col-12 xl:col-4 lg:col-4 md:col-6 mb-2">
            <h6 class="mb-1 pl-2 candidate-input-label">Saylangan organlarga a'zoligi</h6>
            <InputText type="text" name="candidate-organ" class="w-full font-normal" placeholder="Kiriting"
                v-model="v$.organ.$model" :class="{ 'p-invalid': v$.organ.$invalid && submitted }" />
            <span class="error-input-message block">{{ v$.organ.$errors[0]?.$message }}</span>
        </div>

        <div class="col-12 mb-6" v-if="get_candidate_academy.length">
            <DataTable :value="get_candidate_academy" showGridlines tableStyle="min-width:50rem; width:100%"
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
                        <span class="w-full text-sm uppercase block custom-header-title">Nomi</span>
                    </template>
                    <template #body="slotProps">
                        <div class="custom-table-body-text"> {{ slotProps.data.name }}</div>
                    </template>
                </Column>
                <Column style="min-width:100px; width: 300px;">
                    <template #header>
                        <span class="w-full text-sm uppercase block custom-header-title">Yo'nalish</span>
                    </template>
                    <template #body="slotProps">
                        <div class="custom-table-body-text"> {{ slotProps.data.spec }}</div>
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
                                @click="set_candidate_academy_delete(slotProps.data.index)" v-tooltip.bottom="`O'chirish`"></i>
                        </div>
                    </template>
                </Column>
            </DataTable>
        </div>

        <div class="col-12 flex justify-content-center">
            <div class="add-relative-btn" @click="addItem()">
                <i class='bx bxs-message-square-add'></i> Bilim yurtini qo'shish
            </div>
        </div>
        <div class="col-12">
            <button class="hidden" id="check_form2" @click="check_form((!v$.$invalid))">Check</button>
            <AcademyComponent ref="academy_ref"/>
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

import AcademyComponent from './AcademyComponent.vue';

export default {
    setup() {
        const v$ = useVuelidate();
        return { v$ };
    },
    components:{
        AcademyComponent,
    },
    data() {
        return {
            academy: null,
            academy_degree: null,
            academy_title: null,
            languages: null,
            party: null,
            military_rank: "yo'q",
            organ: "yo'q",
            email: null,
            submitted: false,

           
        }
    },
    computed: {
        ...mapGetters([
            "get_candidate_form2","get_select_infos","get_candidate_academy"
        ]),
        
    },
    methods: {
        ...mapActions([
            "set_candidate_form2","set_candidate_academy_delete"
        ]),
        check_form(isValid) {
            this.submitted = true;
            this.save_store()
            if (isValid) {
                this.$emit('checked_form2')
            }
        },
        remote_check() {
            document.getElementById('check_form2').click()
        },
        check_store() {
            this.academy = this.get_candidate_form2.academy;
            this.academy_degree = this.get_candidate_form2.academy_degree;
            this.academy_title = this.get_candidate_form2.academy_title;
            this.languages = this.get_candidate_form2.languages;
            this.party = this.get_candidate_form2.party;
            this.military_rank = this.get_candidate_form2.military_rank;
            this.organ = this.get_candidate_form2.organ;
            this.email = this.get_candidate_form2.email;
        },
        save_store() {
            let data = {
                academy: this.academy,
                academy_degree: this.academy_degree,
                academy_title: this.academy_title,
                languages: this.languages,
                party: this.party,
                military_rank: this.military_rank,
                organ: this.organ,
                email: this.email,
            }
            this.set_candidate_form2(data)
        },
        addItem(){
            this.$refs.academy_ref.addItem()
        },
        editItem(item){
            this.$refs.academy_ref.editItem(item);
        }
        
    },
    validations() {
        return {
            academy: { required: helpers.withMessage("Maydon to'ldirilishi shart!", required) },
            academy_degree: { required: helpers.withMessage("Maydon to'ldirilishi shart!", required) },
            academy_title: { required: helpers.withMessage("Maydon to'ldirilishi shart!", required) },
            languages: { required: helpers.withMessage("Maydon to'ldirilishi shart!", required) },
            party: { required: helpers.withMessage("Maydon to'ldirilishi shart!", required) },
            military_rank: { required: helpers.withMessage("Maydon to'ldirilishi shart!", required) },
            organ: { required: helpers.withMessage("Maydon to'ldirilishi shart!", required) },
            email: { required: helpers.withMessage("Maydon to'ldirilishi shart!", required) },

            


        };
    },
    created() {
        this.check_store()
    }
}
</script>

<style lang="scss" scoped>
.candidate-input-label {
    font-size: 14px;
    color: #2e5890;
    font-family: 'Poppins', sans-serif !important;
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
}
</style>