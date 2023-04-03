<template>
    <div>
        <Dialog v-model:visible="modal" :breakpoints="{
            '1960px': '20vw',
            '1600px': '30vw',
            '1200px': '60vw',
            '960px': '70vw',
            '640px': '90vw',
        }" :style="{ width: '50vw' }" :modal="true">
            <template #header>
                <h6 class="uppercase text-lg text-green-500 font-medium">
                    Yangi link generatsiya qilish
                </h6>
            </template>
            <div class="grid pt-2">
                <div class="col-12 flex gap-2">
                    <InputText type="text" v-model="link" class="w-full" :disabled="true" />
                    <Button label="" icon="pi pi-copy" class="p-button-primary p-button-sm" @click="copyFunction()" />
                    <Button label="" icon="pi pi-sync" class="p-button-danger p-button-sm" @click="generate_link()" :loading="loading" />
                </div>
            </div>

            <template #footer>

            </template>
        </Dialog>
        <Toast position="bottom-right" />
    </div>
</template>

<script>
import SlugService from '@/service/servises/SlugService';

export default {
    data() {
        return {
            modal: false,
            link: null,
            loading:false,
        }
    },
    methods: {
        control_modal() {
            let store_link = localStorage.getItem('reception-link')
            if(store_link){
                this.link = store_link;
               this.modal = true;
            }else{
                this.generate_link();
                this.modal = true;
            }
        },
        copyFunction(text) {
            navigator.clipboard.writeText(this.link);
            this.$toast.add({
                severity: "success",
                summary: "Muvofaqqiyatli bajarildi",
                detail: "Nusxalandi",
                life: 2000,
            });
        },
        generate_link(){
            this.loading =true;
            
            SlugService.generate_reception_link().then((res)=>{{
                this.link = ''+ window.location.origin+'/reception/'+res.data.url;
                localStorage.setItem('reception-link', this.link )
                this.loading =false;
            }})
        }
    }
}
</script>

<style lang="scss" scoped></style>