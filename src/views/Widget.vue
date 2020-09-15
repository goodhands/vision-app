<template>
  <div class="about">
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