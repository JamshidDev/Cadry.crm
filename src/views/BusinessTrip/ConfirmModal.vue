<template>
    <div class="gird">
        <Dialog v-model:visible="dialog" :breakpoints="{
            '1960px': '20vw',
            '1600px': '20vw',
            '1200px': '30vw',
            '960px': '30vw',
            '640px': '50vw',
        }" :style="{ width: '50vw' }" :modal="true" :position="'top'">
            <template #header>
                <h6 class="uppercase text-xl text-blue-500 font-semibold text-center w-full mb-0">
                    Tasdiqlash
                </h6>
            </template>
            <div class="grid">
                <div class="col-12">
                    <h4 class="text-base text-700 font-medium text-center">Siz haqqiqattan xodimning xizmat safarini to'liq tasdiqlaysizmi?</h4>
                </div>
                <div class="col-12 flex justify-content-between">
                    <Button label="Yo'q" class="p-button-danger p-button-sm text-sm uppercase" @click="cloese()" />
                    <Button label="Ha" class="p-button-primary p-button-sm text-sm uppercase" @click="continueAction()" />
                </div>
            </div>


            <template #footer>

            </template>
        </Dialog>
    </div>
</template>

<script>
export default {
    data() {
        return {
            dialog: false,
        }
    },
    methods: {
        control_modal(id) {
            this.dialog = true;
        },
        cloese() {
            this.dialog = false;
        },
        continueAction() {
            this.dialog = false;
            this.$emit('confirm_accept')
        }
    }

}
</script>

<style lang="scss" scoped></style>