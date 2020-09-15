<template>
    <div>
        <div class="flex h-64 items-center justify-center rounded-md w-full bg-gray-600" :style="image.length > 0 && { background: `url(${image})` }">
            <div class="bg-opacity-50 bg-white flex flex-col h-32 items-center justify-center w-56">
                <input type="file" @change="handleImageUpload" accept="image/*" class="flex overflow-hidden pb-4 text-sm w-10/12" id="fileUpload">
                <input type="text" v-if="!fileUpload" class="border-2 rounded-md" v-model="image" id="">
            </div>
        </div>
        <h2 class="text-3xl font-bold">
            Labels: <span v-for="label in labels" :key="label">{{label}}</span>
        </h2>
    </div>
</template>

<script>
export default {
    data() {
        return {
            image: '',
            labels: [],
            fileReader: new FileReader(),
            fileUpload: false,
        }
    },

    methods: {
        handleImageUpload(event){
            this.fileUpload = true;

            this.fileReader.onload = () => {
                this.image = this.fileReader.result;
            }

            //set the raw file to avatar for form upload
            // this.avatar = event.target.files[0];

            //stream the file preview 
            this.fileReader.readAsDataURL(event.target.files[0]);

        },
    },
}
</script>