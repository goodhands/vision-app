<template>
    <div>
        <div class="flex h-64 items-center justify-center rounded-md w-full bg-gray-600" :style="image.length > 0 && { background: `url(${image})`, backgroundSize: 'cover', backgroundPosition: `center` }">
            <div class="bg-opacity-50 bg-white flex flex-col h-32 items-center justify-center w-56">
                <small class="text-gray-600" for="input">Insert an image URL</small>
                <input type="text" class="border-2 rounded-md" v-model="image" id="input">
            </div>
        </div>
        <button :disabled="busy" class="bg-gradient-to-b bg-gray-200 font-sans mb-5 mt-5 px-3 py-2 rounded shadow-2xl text-white hover:shadow-none" @click="fetchLabels">
            Fetch labels
            <span v-if="busy" title="Please wait" class="animate-ping bg-gray-200 h-3 inline-block inline-flex rounded-full w-3"></span>
        </button>

        <h2 class="text-3xl font-bold" v-if="!busy">
            <span v-for="(label, parentIndex) in labels.responses" :key="parentIndex">
                <h2>Labels found for image: </h2> <!-- Balance the index offset -->
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
                //destroy request
                this.imageService.destroyRequest();
            }).catch(errors => {
                console.log(errors);
            });
        }
    },
}
</script>