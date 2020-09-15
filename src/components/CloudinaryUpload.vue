<template>
    <div>
        <div id="main">

        </div>
    </div>
</template>

<script>
var cloudinary = require('cloudinary');
// var cloudinary;
// import {cloudinary} from 'cloudinary';

export default {
    name: "CloudinaryUpload",
    data() {
        return {
            cloudinaryWidget: null,
        }
    },

    methods: {
        mountWidget(){
            this.cloudinaryWidget = cloudinary.createUploadWidget({
                cloudName: 'tmp', 
                uploadPreset: 'vy3bve7h'
            }, (error, result) => { 
                    if (!error && result && result.event === "success") { 
                        console.log('Done! Here is the image info: ', result.info); 
                    }
                }
            )
        }
    },

    mounted() {
        cloudinary.config({
            cloud_name: 'tmp',
            api_key: '449256583625332',
            api_secret: 'haWbhsPKoHrnVpVDlNBSpEP6_8I'
        });
        //mount cloundinary
        this.mountWidget();

        //open the widget
        setTimeout(() => {
            this.cloudinaryWidget.open();
        }, 1500);
    },
}
</script>