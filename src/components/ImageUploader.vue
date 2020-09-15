<template>
    <div>
        <div class="flex h-64 items-center justify-center rounded-md w-full bg-gray-600" :style="image.length > 0 && { background: `url(${image})` }">
            <div class="bg-opacity-50 bg-white flex flex-col h-32 items-center justify-center w-56">
                <input type="file" class="flex overflow-hidden pb-4 text-sm w-10/12" name="" id="">
                <input type="text" class="border-2 rounded-md" v-model="image" id="">
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
            labels: []
        }
    },
}
</script>