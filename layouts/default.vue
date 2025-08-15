<template>
  <v-app>
    <!-- Header -->
    <v-app-bar color="green-darken-2" dark>
      <v-app-bar-title>YaDom Shop</v-app-bar-title>
      <v-spacer></v-spacer>

      <v-btn text to="../">
        <v-icon left>mdi-home</v-icon>
        หน้าแรก
      </v-btn>
      <v-btn text to="../review">
        <v-icon left>mdi-eye</v-icon>
        วิสัยทัศน์
      </v-btn>
      <v-btn text to="../review">
        <v-icon left>mdi-account-group</v-icon>
        บอร์ดบริหาร
      </v-btn>
      <v-btn text to="../review">
        <v-icon left>mdi-leaf</v-icon>
        สรรพคุณ
      </v-btn>
      <v-btn text to="../about">
        <v-icon left>mdi-cube</v-icon>
        สินค้า
      </v-btn>
      <v-btn text to="../review">
        <v-icon left>mdi-star</v-icon>
        รีวิว
      </v-btn>
      <v-btn text>
        <v-icon left>mdi-phone</v-icon>
        ติดต่อ
      </v-btn>

      <v-btn icon to="../cart">
        <v-badge :content="cartCount" color="red" overlap>
          <v-icon>mdi-cart</v-icon>
        </v-badge>
      </v-btn>
    </v-app-bar>

    <!-- Main content -->
    <v-main>
      <NuxtPage />
    </v-main>

    <!-- Footer -->
    <v-footer color="green-darken-2" app>
      <v-col class="text-center white--text">
        © 2025 YaDom Shop | ติดต่อ: 086-386-2827
      </v-col>
    </v-footer>
  </v-app>
</template>
<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const cartCount = ref(0)

const updateCartCount = () => {
  const cart = JSON.parse(localStorage.getItem('cart') || '[]')
  cartCount.value = cart.length
}

onMounted(() => {
  updateCartCount()

  // ฟัง event จาก addToCart เพื่ออัปเดตจำนวนสินค้า
  window.addEventListener('cart-updated', updateCartCount)
})

onBeforeUnmount(() => {
  window.removeEventListener('cart-updated', updateCartCount)
})
</script>
