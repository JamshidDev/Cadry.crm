<template>
    <div class="grid">
        <div class="col-12">
            <Dialog v-model:visible="cropperDialog" :style="{ width: '320px' }" :modal="true" class="bg-blue-700"
                :closable="false">
                <template #header>
                    <h6 class="font-semibold flex uppercase">Rasmni tekislash</h6>
                </template>
                <cropper ref="cropper" class="cropper" :stencil-props="{
                    aspectRatio: 3 / 4,
                }" :src="image.src" :autoZoom="true" />
                <template #footer>
                    <div class="flex justify-content-between">
                        <Button label="Bekor qilish" @click="controlCopper(false)" class="p-button-danger p-button-sm" />
                        <Button label="Tasdiqlash" @click="uploadAvatar()" class="p-button-secondary p-button-sm"
                            autofocus />
                    </div>
                </template>
            </Dialog>
        </div>
        <div class="col-12">
            <input type="file" accept="image/*"  ref="new_user_phote_ref" @change="uploadImageCropper($event)" v-show="false" />
        </div>
    </div>
</template>

<script>
import 'vue-advanced-cropper/dist/style.css';

import { Cropper } from 'vue-advanced-cropper';

export default {
    components: {
        Cropper,
    },
    data() {
        return {
            cropperDialog: false,
            image: {
                src: null,
                type: "image/jpg",
            },
        }
    },
    methods: {
        uploadImageCropper(event) {
            const { files } = event.target;
            if (files && files[0]) {
                if (this.image.src) {
                    URL.revokeObjectURL(this.image.src);
                }
                const blob = URL.createObjectURL(files[0]);
                this.image = {
                    src: blob,
                    type: files[0].type,
                };
                this.cropperDialog = true;
            }
        },
        uploadAvatar() {
            this.controlCopper(false);
            let imgUrl = this.$refs.cropper.getResult().canvas.toDataURL();
            this.$refs.cropper.getResult().canvas.toBlob((blob) => {
                this.$emit("cropper_blob_file", {blob, imgUrl})

            });
        },
        open_device_store(){
            console.log("Devoce store");
            this.$refs.new_user_phote_ref.click()
        },

        controlCopper(item) {
            this.cropperDialog = item;
        },

    }
}
</script>

<style lang="sass" scoped>

</style>