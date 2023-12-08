<template>
  <div>
    <MainPage/>
  </div>
</template>

<script setup>
  import MainPage from '@/components/MainPage.vue'
</script>

<style>
body{
    background-image: url("../assets/background_light.png");
    background-size: cover; /* Ensures the image covers the entire background */
    background-position: center center; /* Center the image */
    background-repeat: no-repeat; /* Do not repeat the image */
}
</style>