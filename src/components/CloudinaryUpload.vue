<template>
    <div>
        <div class="flex h-64 items-center justify-center rounded-md w-full bg-gray-600">
            <div class="bg-opacity-50 bg-white flex flex-col h-32 items-center justify-center w-56">
                <small class="text-gray-600" for="input">Click to begin upload</small>
                <button type="button" @click="openMediaWidget" class="bg-gradient-to-b bg-gray-200 font-sans mb-5 mt-5 px-3 py-2 rounded shadow-2xl text-white hover:shadow-none">
                    Launch media upload
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import ImageLabel from '../services/imageLabel';
export default {
    name: "CloudinaryUpload",
    data() {
        return {
            images: [],
            label: new ImageLabel(),
            result: [],
            busy: false,
        }
    },
    methods: {
        openMediaWidget(){
            window.cloudinary.openUploadWidget(
            { 
                cloud_name: process.env.VUE_APP_CDNRY_NAME,
                upload_preset: process.env.VUE_APP_CDNRY_PRESET
            },(error, result) => {
                //save image urls on success
                if (!error && result && result.event === "success") {
                    this.images.push(result.info.url);
                }

                if (!error && result && result.event === "close") {
                    this.busy = true;
                    this.labelImages();
                }
            }).open();
        },

        labelImages(){
            this.label.buildRequest(this.images);

            this.label.annotate()
            .then(response => {
                this.busy = false;
                this.result = response.data;
            })
            .catch(error => {
                this.busy = false;
                console.log(error);
            })
        }
    },
}
</script>