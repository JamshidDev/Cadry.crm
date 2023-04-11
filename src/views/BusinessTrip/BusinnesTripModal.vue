<template>
    <div>
        <Dialog v-model:visible="dialog" :breakpoints="{
            '640px': '90vw',
        }" :style="{ width: '50vw' }" :modal="true" position="bottom">
            <template #header>
                <h6 class="uppercase text-lg text-blue-500 font-medium">
                    Xizmat safari
                </h6>
            </template>
            <div class="grid">
                <div class="col-12 xl:col-4 lg:col-4">
                    <h6 class="mb-2 pl-2 text-500">Prikaz raqam</h6>
                    <InputText type="text" class="w-full font-normal" placeholder="Kiriting" name="command_number"
                        v-model="command_number" :class="{ 'p-invalid': command_number_error && submitted }" />
                </div>
                <div class="col-12 xl:col-4 lg:col-4">
                    <h6 class="mb-2 pl-2 text-500">Sanasi</h6>
                    <Calendar class="w-full font-normal" :manualInput="true" v-model="date_command" v-maska="'##/##/####'"
                        dateFormat="dd/mm/yy" :showButtonBar="true" placeholder="Sanani tanlang"
                        :class="{ 'p-invalid': date_command_error && submitted }" />
                </div>
                <div class="col-12 xl:col-6 lg:col-6">
                    <h6 class="mb-2 pl-2 text-500">
                        Davlat nomi
                    </h6>
                    <Dropdown v-model="country_id" 
                        :options="country_list" optionLabel="staff_fullname" :filter="true" placeholder="Tanlang"
                        class="w-full p-input-sm" :class="{ 'p-invalid': country_id_error && submitted }">
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
                        To'lov turi
                    </h6>
                    <Dropdown v-model="commander_payment_id" :options="payment_list" optionLabel="name" :filter="true"
                      placeholder="Tanlang" class="w-full p-input-sm"
                        :class="{ 'p-invalid': commander_payment_id_error && submitted }">
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
                        Pupose
                    </h6>
                    <Dropdown v-model="commander_pupose_id" :options="pupose_list" optionLabel="name" :filter="true"
                         placeholder="Tanlang" class="w-full p-input-sm"
                        :class="{ 'p-invalid': commander_pupose_id_error && submitted }">
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
                    <h6 class="mb-2 pl-2 text-500">Joyi</h6>
                    <InputText type="text" class="w-full font-normal" placeholder="Kiriting" name="command_number"
                        v-model="position" :class="{ 'p-invalid': position_error && submitted }" />
                </div>
                <div class="col-12 xl:col-4 lg:col-4">
                    <h6 class="mb-2 pl-2 text-500">Kun</h6>
                    <InputText type="number" class="w-full font-normal" placeholder="Kiriting" id="trip-days"
                        v-model="days" :class="{ 'p-invalid': days_error && submitted }" />
                </div>
                <div class="col-12 xl:col-4 lg:col-4">
                    <div >
                        <h6 class="mb-2 pl-2 text-500">Qachondan</h6>
                        <Calendar class="w-full font-normal" :manualInput="true" v-model="date1" v-maska="'##/##/####'"
                            dateFormat="dd/mm/yy" :showButtonBar="true" placeholder="Sanani tanlang" :class="{ 'p-invalid': date1_error && submitted }" />
                    </div>
                </div>
                <div class="col-12 xl:col-4 lg:col-4">
                    <div >
                        <h6 class="mb-2 pl-2 text-500">Qachongacha</h6>
                        <Calendar class="w-full font-normal" :manualInput="true" v-model="date2" v-maska="'##/##/####'"
                            dateFormat="dd/mm/yy" :showButtonBar="true" placeholder="Sanani tanlang" :class="{ 'p-invalid': date2_error && submitted }" />
                    </div>
                </div>
                <div class="col-12">
                    <h6 class="mb-2 pl-2 text-500">Sabab</h6>
                    <InputText type="text" class="w-full font-normal" placeholder="Kiriting" id="staff_rank"
                        v-model="reason"  />
                </div>
                
                <div class="col-12 flex justify-content-center">
                    <Button icon="pi pi-check-circle" label="Yuborish" class="p-button-success  mt-4 p-button-sm"
                        @click="pushCadry()"></Button>
                </div>
            </div>

            <template #footer> </template>
        </Dialog>
    </div>
</template>

<script>
import commanderService from '@/service/servises/commanderService';

import formatter from '../../util/formatter';

export default {
    data() {
        return {
            dialog: false,
            country_id:null,
            commander_payment_id:null,
            commander_pupose_id:null,
            position:null,
            command_number:null,
            date_command:null,
            date1:null,
            date2:null,
            days:null,
            reason:null,

            country_list:[],
            payment_list:[],
            pupose_list:[],

            submitted:false,
            formatter,
            
        }
    },
    computed:{
        country_id_error() {
            if (!this.country_id) {
                return true;
            } else {
                return false;
            }
        },
        commander_payment_id_error() {
            if (!this.commander_payment_id) {
                return true;
            } else {
                return false;
            }
        },
        commander_pupose_id_error() {
            if (!this.commander_pupose_id) {
                return true;
            } else {
                return false;
            }
        },
        position_error() {
            if (!this.position) {
                return true;
            } else {
                return false;
            }
        },
        command_number_error() {
            if (!this.command_number) {
                return true;
            } else {
                return false;
            }
        },
        date_command_error() {
            if (!this.date_command) {
                return true;
            } else {
                return false;
            }
        },
        days_error() {
            if (!this.days) {
                return true;
            } else {
                return false;
            }
        },
        date2_error() {
            if (!this.date2) {
                return true;
            } else {
                return false;
            }
        },
        date1_error() {
            if (!this.date1) {
                return true;
            } else {
                return false;
            }
        },
    },
    methods: {
        control_modal() {
            this.dialog = true;
        },
        
        pushCadry(){
            this.submitted=true;
            if(!this.country_id_error && !this.commander_payment_id_error && !this.commander_pupose_id_error && !this.position_error && !this.command_number_error &&  !this.date_command_error && !this.days_error && !this.date2_error && !this.date2_error ){
                let data = {
                country_id:this.country_id.id,
                commander_payment_id:this.commander_payment_id.id,
                commander_pupose_id:this.commander_pupose_id.id,
                position:this.position,
                command_number:this.command_number,
                date_command:this.formatter.outDateFormatter(this.date_command),
                date1:this.formatter.outDateFormatter(this.date1),
                date2:this.formatter.outDateFormatter(this.date2),
                days:this.days,
                reason:this.reason,
            }
            this.$emit('commander_send', data);
            this.dialog=false;

            }
          
           

        },
        get_commander_info(){
            commanderService.commander_info().then((res)=>{
                this.country_list = res.data.countries;
                this.payment_list = res.data.commander_payments;
                this.pupose_list = res.data.commander_puposes;
            })
        },
        edit_modal(data){
            this.position = data.position;
            this.date1 = this.formatter.interDateFormatter(data.date1);
            this.date2 = this.formatter.interDateFormatter(data.date2);
            this.days = data.days;
            this.reason = data.reason;
            this.command_number =data.command_number;
            this.date_command = this.formatter.interDateFormatter(data.date_command);
            // this.country_id = data.country_id.id;
            // this.commander_payment_id = data.country_id.commander_payment_id;
            // this.commander_pupose_id = data.country_id.commander_pupose_id;

            this.submitted = false;
            this.dialog=true;
        }
    },
    created(){
        this.get_commander_info()
    }
}
</script>

<style lang="scss" scoped></style>