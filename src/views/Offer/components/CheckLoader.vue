<template>
    <div class="checking-loader" v-if="loading">
        <div class="loading-box" v-if="!is_deprecated">
            <span>Ma'lumotlar tekshirilmoqda...</span>
            <ProgressBar mode="indeterminate" style="height: 6px"></ProgressBar>
        </div>
        <div class="deprecated_link" v-if="is_deprecated">
            <i class='bx bxs-shield-x'></i>
            <span class="">Siz foydalanayotgan silka eskirgan. Qayta yangi silka olishingizni tavsiya etamiz.</span>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            loading: true,
            is_deprecated: false,
        }
    },
    methods: {
        loading_control() {
            this.loading = !this.loading;
        },
        deprecated() {
            this.is_deprecated = true;
        }
    }
}
</script>

<style lang="scss" scoped>
.checking-loader {
    position: fixed;
    top: 0px;
    left: 0px;
    bottom: 0px;
    right: 0px;
    width: 100%;
    height: 100%;
    background-color: rgb(255, 255, 255);
    display: flex;
    justify-content: center;
    align-items: center;

    .loading-box {
        width: 300px;

        &>span {
            font-size: 15px;
            color: #2e5890;
            font-weight: 600;
            width: 100%;
            display: block;
            text-align: center;
            text-transform: uppercase;
        }
    }

    .deprecated_link {
        width: 300px;
        display: flex;
        flex-direction: column;

        &>i {
            font-size: 200px;
            color: #b91c1c;
            margin: 0px auto;
        }

        &>span {
            font-size: 14px;
            color: #b91c1c;
            font-weight: 500;
            width: 100%;
            display: block;
            text-align: center;
        }
    }


}</style>