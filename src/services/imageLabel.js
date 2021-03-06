'use strict';
import axios from 'axios';
class ImageLabel{

    constructor(){
        this.apiKey = process.env.VUE_APP_VISION_KEY;
        this.requestBody = [];
    }

    buildRequest(...images){
        images.forEach(image => {
            this.requestBody.push(
                {
                    image: {
                        source: {
                            imageUri: image
                        }
                    },
                    features: [
                        {
                            type: "LABEL_DETECTION"
                        }
                    ]
                }
            );
        });
    }
    
    destroyRequest(){
        this.requestBody = [];
    }

    async annotate(){
        try {
            const res = await axios.post('/images:annotate', {
                requests: this.requestBody
            }, {
                params: {
                    key: this.apiKey
                }
            });
            return res;
        } catch (err) {
            return err;
        }
    }

    // You can send multiple images to be annotated, this sample demonstrates how to do this with
    // one image. If you want to use multiple images, you have to create a request object for each image that you want annotated.
    async asyncBatchAnnotateImages(inputImageUri) {
        // Set the type of annotation you want to perform on the image
        // https://cloud.google.com/vision/docs/reference/rpc/google.cloud.vision.v1#google.cloud.vision.v1.Feature.Type
        const features = [{type: 'LABEL_DETECTION'}];
    
        // Build the image request object for that one image. Note: for additional images you have to create
        // additional image request objects and store them in a list to be used below.
        const imageRequest = {
            image: {
                source: {
                    imageUri: inputImageUri,
                },
            },
            features: features,
        };
    
        // Set where to store the results for the images that will be annotated.
        const outputConfig = {
            gcsDestination: {
                uri: process.env.output, //set output uri from environment
            },
            batchSize: 2, // The max number of responses to output in each JSON file
        };
    
        // Add each image request object to the batch request and add the output config.
        const request = {
            requests: [
                imageRequest, // add additional request objects here
            ],
            outputConfig,
        };
    
        // Make the asynchronous batch request.
        const [operation] = await this.client.asyncBatchAnnotateImages(request);
    
        // Wait for the operation to complete
        const [filesResponse] = await operation.promise();
    
        // The output is written to GCS with the provided output_uri as prefix
        const destinationUri = filesResponse.outputConfig.gcsDestination.uri;
        console.log(`Output written to GCS with prefix: ${destinationUri}`);
    }
}

export default ImageLabel;