<template>
    <div>
        
    </div>
</template>

<script src="https://widget.cloudinary.com/v2.0/global/all.js" type="text/javascript">


    document.getElementById("upload_widget").addEventListener("click", function(){
        myWidget.open();
    }, false);
</script>

<script>
export default {
    data() {
        return {
            cloudinaryWidget: null,
        }
    },

    methods: {
        mountWidget(){
            this.cloudinaryWidget = cloudinary.createUploadWidget({
                cloudName: 'my_cloud_name', 
                uploadPreset: 'my_preset'
            }, (error, result) => { 
                    if (!error && result && result.event === "success") { 
                        console.log('Done! Here is the image info: ', result.info); 
                    }
                }
            )
        }
    },

    mounted() {
        //mount cloundinary
        this.mountWidget();

        //open the widget
        setTimeout(() => {
            this.cloudinaryWidget.open();
        }, 1500);
    },
}
</script>