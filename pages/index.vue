<template>
 <!-- Hero Section -->
<v-container class="text-center py-24 px-6 bg-gradient-to-b from-amber-50 via-amber-100 to-amber-50">
  <!-- โลโก้ชื่อแบรนด์ -->
  <h2
    class="text-6xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-700 to-amber-900 drop-shadow-xl tracking-widest animate-fadeIn"
    style="font-family: 'Sarabun', sans-serif;"
  >
    หอมไทย
  </h2>

  <!-- คำคม -->
  <h1
    class="mt-8 text-3xl md:text-4xl lg:text-5xl font-medium text-brown-800 leading-snug max-w-4xl mx-auto animate-slideUp"
    style="font-family: 'Kanit', sans-serif; text-shadow: 1px 1px 4px rgba(0,0,0,0.2); letter-spacing: 0.5px;"
  >
     A Thai brand that delivers the fragrance of happiness and inner balance<br>
    </br> to consumers around the world.

  </h1>

  <!-- เส้นตกแต่ง -->
  <div class="mx-auto mt-8 mb-12 w-28 h-1 rounded-full bg-gradient-to-r from-amber-700 to-amber-400 shadow-lg"></div>

  <!-- ปุ่ม -->
  <v-btn
    variant="outlined"
    color="brown"
    class="ma-2"
    :to="{ path: '/product', hash: '#product' }"
  >
    Buy Now
  </v-btn>

  <v-btn variant="outlined" color="brown" class="ma-2"    :to="{ path: '/Customize', hash: '#cust' }">
    Customize
  </v-btn>

  <v-btn variant="outlined" color="brown" class="ma-2" @click="openCarousel">
    View details

  </v-btn>
</v-container>


  <!-- GMP Strip -->
  <div class="gmp-strip mt-12 mb-16">
    <img
      v-for="(gmp, i) in gmpImages"
      :key="i"
      :src="gmp"
      alt="GMP Certification"
      class="gmp-img animate-fadeIn"
    />
  </div>

  <compo1 />

  <!-- Dialog Carousel -->
  <v-dialog v-model="carouselDialog" max-width="700" >
    <v-card class="bg-gradient-to-br from-amber-50 to-amber-100 rounded-2xl shadow-xl border border-amber-300" style="background-color: antiquewhite;">
      <v-card-title class="text-center text-brown-800 font-semibold text-xl md:text-2xl">
        The herbal inhaler contains a variety of herbs, including eucalyptus<br></br> cinnamon, cardamom, star anise, black pepper<br></br> betel charcoal, camphor, musk, and menthol.

      </v-card-title>

      <v-card-text>
        <v-carousel v-model="slide" cycle height="350" show-arrows show-arrows-on-hover hide-delimiter-background style="background-color: antiquewhite;">
          <v-carousel-item
            v-for="(item, i) in images"
            :key="i"
            :value="i"
            class="rounded-xl overflow-hidden shadow-lg"
          >
            <v-img :src="item" class="fill-height transition-transform hover:scale-105 duration-500"></v-img>
          </v-carousel-item>
        </v-carousel>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="brown" text class="font-semibold" @click="carouselDialog = false">
          ปิด
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
  
</template>

<script setup>
import { ref } from 'vue'
import { useSwitchLocalePath } from '#i18n'

const carouselDialog = ref(false)
const slide = ref(0)

const images = [
  '/b1.jpg', '/b2.jpg', '/b3.jpg', '/b4.jpg',
  '/b5.jpg', '/b6.jpg', '/b7.jpg', '/b8.jpg', '/b9.jpg'
]

const gmpImages = [
  '/gmp3.jpg',
  '/gmp1.jpg',
  '/gmp2.jpg',
]

const openCarousel = () => {
  slide.value = 0
  carouselDialog.value = true
}

const switchLocalePath = useSwitchLocalePath()
</script>

<style scoped>
/* GMP Strip */
.gmp-strip {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: stretch;
  width: 100%;
  gap: 12px;
  padding: 0 1rem;
}

.gmp-img {
  width: 33.333%;
  height: 400px;
  object-fit: cover;
  border-radius: 1rem;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.25);
  transition: transform 0.4s ease, box-shadow 0.4s ease;
}
.gmp-img:hover {
  transform: scale(1.05);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.35);
}

/* Responsive GMP Strip */
@media (max-width: 768px) {
  .gmp-strip {
    flex-direction: column;
    gap: 16px;
  }
  .gmp-img {
    width: 100%;
    height: auto;
  }
}

/* Animations */
@keyframes fadeIn {
  0% { opacity: 0; transform: translateY(20px); }
  100% { opacity: 1; transform: translateY(0); }
}
.animate-fadeIn {
  animation: fadeIn 1s ease forwards;
}

@keyframes slideUp {
  0% { opacity: 0; transform: translateY(50px); }
  100% { opacity: 1; transform: translateY(0); }
}
.animate-slideUp {
  animation: slideUp 1s ease forwards;
}
</style>
