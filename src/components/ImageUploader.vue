<template>
    <div>
        <div class="flex h-64 items-center justify-center rounded-md w-full bg-gray-600" :style="image.length > 0 && { background: `url(${image})`, backgroundSize: 'cover', backgroundPosition: `center` }">
            <div class="bg-opacity-50 bg-white flex flex-col h-32 items-center justify-center w-56">
                <input type="file" @change="handleImageUpload" accept="image/*" class="flex overflow-hidden pb-4 text-sm w-10/12" id="fileUpload">
                <input type="text" v-if="!fileUpload" class="border-2 rounded-md" v-model="image" id="">
            </div>
        </div>
        <button class="bg-gradient-to-b bg-gray-200 font-sans mb-5 mt-5 px-3 py-2 rounded shadow-2xl text-white" @click="fetchLabels">
            Fetch labels
        </button>

        <h2 class="text-3xl font-bold" v-if="!busy">
            <span v-for="label in labels.responses" :key="label">
                <span v-for="(annotations, index) in label.labelAnnotations" :key="index" class="bg-gray-100 bg-opacity-50 font-light mx-2 mb-2 inline-block p-3 rounded text-base text-pink-600">
                    {{ annotations.description}}
                </span>
            </span>
        </h2>
    </div>
</template>

<script>
import ImageLabel from '../services/imageLabel';

export default {
    data() {
        return {
            image: '',
            imageService: new ImageLabel(),
            labels: [],
            fileReader: new FileReader(),
            fileUpload: false,
            busy: false,
        }
    },

    methods: {
        fetchLabels(){
            this.busy = true;

            this.imageService.buildRequest(this.image);
            this.imageService.annotate()
            .then(results => {
                this.busy = false;
                this.labels = results.data;
            }).catch(errors => {
                console.log(errors);
            });
        },

        handleImageUpload(event){
            this.fileUpload = true;

            //set file preview
            this.fileReader.onload = () => {
                this.image = this.fileReader.result;
            }

            //set the raw file for upload
            this.uploadedRawFile = event.target.files[0];

            //stream the file preview 
            this.fileReader.readAsDataURL(event.target.files[0]);
        },
    },
}
</script>