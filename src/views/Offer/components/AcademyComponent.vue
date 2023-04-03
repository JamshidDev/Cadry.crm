<template>
    <div class="grid">
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
                        {{ dialog_type ? "Bilim yurtini qo'shish" : "Bilim yurtini tahrirlash" }}
                    </h6>
                </template>
                <div class="grid pt-2">

                    <div class="col-6">
                        <h6 class="mb-1 pl-2 candidate-input-label">Qachondan</h6>
                        <InputText type="text" class="w-full font-normal" placeholder="Yilni kiritng"
                            id="candidate-academy-date1" v-model="academy_date1" v-maska="'####'"
                            :class="{ 'p-invalid': date1_error && academy_submitted }" />
                        <span v-if="academy_submitted && date1_error" class="error-input-message block">Maydon to'ldirilishi shart!</span>
                    </div>
                    <div class="col-6">
                        <h6 class="mb-1 pl-2 candidate-input-label">Qachongacha</h6>
                        <InputText type="text" class="w-full font-normal" placeholder="Yilni kiritng"
                            id="candidate-academy-date2" v-model="academy_date2" v-maska="'####'"
                            :class="{ 'p-invalid': date2_error && academy_submitted }" />
                            <span v-if="academy_submitted && date2_error" class="error-input-message block">Maydon to'ldirilishi shart!</span>
                    </div>

                    <div class="col-12">
                        <h6 class="mb-1 pl-2 candidate-input-label">Tamomlagan bilim yurti</h6>
                        <Textarea class="w-full font-normal" placeholder="Tamomlagan bilim yurti nomini kiriting"
                            id="candidate-position" :autoResize="true" rows="3" v-model="academy_name"
                            :class="{ 'p-invalid': name_error && academy_submitted }" />
                            <span v-if="academy_submitted && name_error" class="error-input-message block">Maydon to'ldirilishi shart!</span>
                    </div>
                    <div class="col-12">
                        <h6 class="mb-1 pl-2 candidate-input-label">Tamomlagan bilim yurti yo'nalishi</h6>
                        <Textarea class="w-full font-normal" placeholder="Tamomlagan bilim yurti yo'nalishini kiriting"
                            id="candidate-position" :autoResize="true" rows="3" v-model="academy_direction"
                            :class="{ 'p-invalid': direction_error && academy_submitted }" />
                            <span v-if="academy_submitted && direction_error" class="error-input-message block">Maydon to'ldirilishi shart!</span>
                    </div>

                </div>

                <template #footer>
                    <div class="col-12 pt-2">
                        <div class="flex justify-content-end">
                            <Button label="Saqlash" class="p-button-primary p-button-sm"
                                @click="addAndEdit()" />
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

export default {
    data() {
        return {
            academy_name: null,
            academy_direction: null,
            academy_date1: null,
            academy_date2: null,
            dialog: false,
            dialog_type: true,
            academy_submitted: false,
            active_index: null,

        }
    },
    computed: {
        ...mapGetters([
            "get_candidate_academy"
        ]),
        name_error() {
            if (!this.academy_name) {
                return true;
            } else {
                return false;
            }
        },
        direction_error() {
            if (!this.academy_direction) {
                return true;
            } else {
                return false;
            }
        },
        date1_error() {
            if (!this.academy_date1) {
                return true;
            } else {
                return false;
            }
        },
        date2_error() {
            if (!this.academy_date2) {
                return true;
            } else {
                return false;
            }
        },
    },
    methods: {
        ...mapActions([
            "set_candidate_academy", "set_candidate_academy_edit",
        ]),
        addItem() {
            this.academy_name = null;
            this.academy_direction = null;
            this.academy_date1 = null;
            this.academy_date2 = null;
            this.dialog = true;
            this.dialog_type = true;
            this.academy_submitted = false;
        },
        addAndEdit() {
            this.academy_submitted = true;
            if (!this.name_error && !this.direction_error && !this.date1_error && !this.date2_error) {
                let data = {
                    index: this.get_candidate_academy.length,
                    date1: this.academy_date1,
                    date2: this.academy_date2,
                    name: this.academy_name,
                    spec: this.academy_direction,
                }
                if (this.dialog_type) {
                    this.set_candidate_academy(data)
                    this.dialog = false;
                } else {
                    data.index = this.active_index;
                    this.set_candidate_academy_edit(data);
                    this.dialog = false;
                }
            }
        },
        editItem(item) {
            this.active_index = item.index;
            this.academy_name = item.name;
            this.academy_direction = item.spec;
            this.academy_date1 = item.date1;
            this.academy_date2 = item.date2;
            this.dialog = true;
            this.dialog_type = false;
            this.academy_submitted = false;

        }
    },
}
</script>

<style lang="scss" scoped></style>