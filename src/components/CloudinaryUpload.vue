<template>
    <div>
        <div class="flex h-64 items-center justify-center rounded-md w-full bg-gray-600">
            <div class="bg-opacity-50 bg-white flex flex-col h-32 items-center justify-center w-56">
                <small class="text-gray-600" for="input">Insert an image URL</small>
                <button type="button" @click="openMediaWidget" class="bg-gradient-to-b bg-gray-200 font-sans mb-5 mt-5 px-3 py-2 rounded shadow-2xl text-white hover:shadow-none">
                    Launch media upload
                </button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "CloudinaryUpload",
    data() {
        return {
            url: '',
        }
    },
    methods: {
        openMediaWidget(){
            window.cloudinary.openUploadWidget({ cloud_name: 'tmp',
                upload_preset: 'vy3bve7h'
            },(error, result) => {
                if (!error && result && result.event === "success") {
                    console.log('Done uploading..: ', result.info);
                    this.url = result.info.url;
                }
            }).open();
        }
    },

    mounted() {
        //mount cloundinary
        // setTimeout(() => {
        //     this.mountWidget();
        // }, 1200);
    },
}
</script>