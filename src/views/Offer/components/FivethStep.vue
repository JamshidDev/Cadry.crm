<template>
    <div class="grid">
        <div class="col-12 px-0 pt-0 pb-4" v-show="!is_submitted">
            <div class="alert-box">
                <span class="alert-text">
                    <i class='pi pi-check-circle pr-2'></i>Agar barcha ma'lumotlaringiz to'g'riligiga ishonchingiz komil
                    bo'lsa,
                    u holda arizani tasdiqlash tugmasi orqali yakunlashingiz mumkin.
                </span>
            </div>
            <div class="flex w-full justify-content-center gap-3 py-4 mt-6">
                <Button :disabled="loading" icon="pi pi-arrow-circle-left" class="p-button-warning p-button-outlined p-button-sm mr-2 uppercase"
                    label="Orqaga" @click="back()" />
                <Button icon="pi pi-upload" class="p-button-success p-button-sm mr-2 uppercase" label="Tasdiqlash"
                    :loading="loading" @click="confirm_info()" />
            </div>
        </div>
        <div class="col-12 px-0 pt-0 pb-4" v-show="is_submitted">
            <div v-if="status==3">
                <span class="message-icon"> <i class='bx bxs-message-check'></i></span>
            <span class="success-title">{{ message}}</span>
            </div>
            <div v-if="status==2">
                <span class="message-icon"><i class='bx bxs-archive-in'></i></span>
            <span class="success-title">{{ message}}</span>
            </div>
            <div v-if="status==1">
                <span class="message-icon"><i class='bx bxs-user-pin'></i></span>
            <span class="success-title">{{ message}}</span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            loading: false,
            is_submitted: false,
            status:3,
            message:''
        }
    },
    methods: {
        confirm_info() {
            this.loading = true;
            this.$emit("submit_event")
        },
        back() {
            this.$emit('back_step')
        },
        submitted_msg(item) {
            this.status =item.status
            this.message = item.message;
            this.loading = false;
            this.is_submitted = true;
        },
        stop_loading(){
            this.loading = false;
        }

    }

}
</script>

<style lang="scss" scoped>
.alert-box {
    width: 100%;
    padding: 10px 30px;
    background-color: #9ecffa4d;
    color: #2e5890;
    font-size: 14px;

    i {
        font-size: 18px;
        font-weight: 600;
        color: #0bd18a;
        padding: 0px 10px;

    }

}

.success-title {
    font-size: 20px;
    font-weight: 500;
    color: #0bd18a;
    width: 100%;
    display: block;
    text-align: center;
}

.message-icon {
    display: block;
    display: flex;
    justify-content: center;

    &>i {
        font-size: 60px;
        font-weight: 600;
        color: #0bd18a;
    }
}</style>