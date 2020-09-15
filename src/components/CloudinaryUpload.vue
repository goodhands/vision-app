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

        <div class="h-64 grid grid-rows-3 grid-flow-col gap-4" v-if="!busy">
            <div v-for="(label, parentIndex) in result.responses" :key="parentIndex">
                <img :src="images[parentIndex]" class="h-32 object-cover rounded-full w-32 w-full">
                <span v-for="(annotations, index) in label.labelAnnotations" :key="index" class="bg-gray-100 bg-opacity-50 font-light mx-2 mb-2 inline-block p-3 rounded text-base text-pink-600">
                   {{ annotations.description}}
                </span>
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
                    this.label.buildRequest(result.info.url);
                }

                if (!error && result && result.event === "close") {
                    this.busy = true;
                    this.labelImages();
                }
            }).open();
        },

        labelImages(){
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