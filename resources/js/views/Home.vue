<template>
  <div>
    <carousel :per-page="1" :autoplay="true" :mouse-drag="true" easing="linear" :speed="speed" :loop="true" id="home-banner">
      <slide v-for="(banner,key,index) in carouselImages" :key="banner">
        <img :src="banner" />
      </slide>
    </carousel>
    <product/>
  </div>
</template>
<script>
  import { Carousel, Slide } from 'vue-carousel';

  import Product from "../components/Product";

  import homeService from '../api/Home';
  
  const getPhotos = (callback) => {
    homeService.getPhotos()
        .then(response => {
            callback(null, response.data);
        }).catch(error => {
            callback(error, error.response.data);
        });
  };

  export default{
    props:{
      speed:300,
    },
    data() {
        return {
            carouselImages: [],
        };
    },
    beforeRouteEnter (to, from, next) {
        getPhotos((err, data) => {
            next(vm => vm.setData(err, data));
        });
    },
    components:{
      Carousel,
      Slide,
      Product
    },
    methods:{
      setData(err, data) {
            if (err) {
                this.error = err.toString();
            } else {
                this.carouselImages = data;
            }
        },
    }
  }
</script>