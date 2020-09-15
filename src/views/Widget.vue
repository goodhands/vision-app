<template>
  <div class="about">
    <h1>This is an about page</h1>
    <cloudinary-upload></cloudinary-upload>
  </div>
</template>

<script>
import CloudinaryUpload from '@/components/CloudinaryUpload.vue'
export default {
  name: 'Widget',
  components: {
    CloudinaryUpload
  }
}
</script>