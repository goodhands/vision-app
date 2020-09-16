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

        <span v-if="busy">Please wait....</span>
        <div class="carousel mt-12">
        </div>

    </div>
</template>

<script>
import ImageLabel from '../services/imageLabel';
import flickity from 'flickity';

export default {
    name: "CloudinaryUpload",
    data() {
        return {
            images: [],
            label: new ImageLabel(),
            result: [],
            slider: null,
            busy: false,
            cellCount: 0,
            flickityOptions: {
                autoPlay: true,
                pageDots: true,
                accessibility: true,
                draggable: '>1',
                adaptiveHeight: false,
                setGallerySize: false
            }
        }
    },
    methods: {
        openMediaWidget(){
            window.cloudinary.openUploadWidget(
            { 
                cloud_name: process.env.VUE_APP_CDNRY_NAME,
                upload_preset: process.env.VUE_APP_CDNRY_PRESET
            },(error, result) => {
                //save image urls on success & build request body
                if (!error && result && result.event === "success") {
                    this.images.push(result.info.secure_url);
                    this.label.buildRequest(result.info.secure_url);
                }

                //process image labels when the modal closes
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
                //build images into a slider once we have the results
                this.buildSlides();
            })
            .catch(error => {
                this.busy = false;
                console.log(error);
            })
        },

        buildSlides(){
            var slides = this.createSlide();
            this.slider.append(slides, 1);
        },

        createSlide(){
            var elements = [];

            this.result.responses.forEach((item, index) => {

                //increase slider count
                this.cellCount++;

                var cell = document.createElement('div');
                cell.className = 'carousel-cell';
                cell.style.backgroundImage = `url(${this.images[index]})`;

                //parent for the laebls returned
                var labelParent = document.createElement('div');

                cell.appendChild(labelParent);

                item.labelAnnotations.map(annotation => {
                    //create element for each label returned
                    var labels = document.createElement('label');
                    //attach each one to the parent
                    labelParent.appendChild(labels)
                    //set the content to the response from the API
                    labels.innerText = annotation.description;
                })

                //push each cell element to the stack
                elements.push(cell);
            });

            return elements;
        }
    },

    mounted() {
        var carousel = document.querySelector('.carousel');
        this.slider = new flickity(carousel, this.flickityOptions);
        this.cellCount = this.slider.cells.length;
    },
}
</script>

<style>
* { box-sizing: border-box; }

.carousel-cell {
    width: 35%;
    min-height: 325px;
    margin-right: 10px;
    background: #8c8;
    background-size: cover;
    background-repeat: no-repeat;
    border-radius: 5px;
    background-position: center;
}

/* cell number */
.carousel-cell:before {
  display: block;
  text-align: center;
  line-height: 300px;
  font-size: 80px;
  color: white;
}

.carousel.is-fullscreen .carousel-cell {
  height: 100%;
}

.carousel{
    height: 350px;
}

.carousel-cell img {
  display: block;
  max-height: 100%;
}

.carousel-cell div {
    display: flex;
    justify-content: stretch;
    align-items: end;
    flex-direction: row;
    flex-wrap: wrap-reverse;
    position: absolute;
    bottom: -60px;
}

.carousel-cell div label {
    font-size: x-small;
    background-color: #efefef;
    padding: 2px 5px;
    border: 1px solid #a7a7a7;
    border-radius: 5px;
    margin-bottom: 3px;
}

</style>