<template>
  <!-- Hero Section -->
  <v-container class="text-center mt-10">
    <v-img src="" max-width="200" class="mx-auto" />
    <h2 class="mt-4">ยาดมหอมสดชื่น พกง่าย สดชื่นได้ทุกที่!</h2>
    <v-btn color="green-darken-2" dark class="ma-2">สั่งซื้อทันที</v-btn>
    <v-btn color="teal-lighten-2" dark class="ma-2">Customize</v-btn>
    <v-btn variant="outlined" color="green-darken-2" class="ma-2">ดูรายละเอียด</v-btn>
  </v-container>

  <!-- Slide Show -->
  <v-container class="pa-4 mb-8">
    <v-carousel v-model="slide" cycle height="300" show-arrows show-arrows-on-hover>
      <v-carousel-item v-for="(item, i) in images" :key="i" :value="i">
        <v-img :src="item" class="fill-height"></v-img>
      </v-carousel-item>
    </v-carousel>
  </v-container>

  <!-- Product List -->
  <v-container class="mt-8">
    <v-row>
      <v-col v-for="(p, index) in products" :key="index" cols="12" sm="4">
        <v-card>
          <v-img :src="p.image" height="200px" />
          <v-card-title>{{ p.name }}</v-card-title>
          <v-card-subtitle>฿{{ p.price }}</v-card-subtitle>
          <v-card-actions>
            <v-btn color="green-darken-2" dark @click="addToCart(p)">
              ใส่ตะกร้า
            </v-btn>

            <!-- ปุ่มรายละเอียด -->
            <v-btn color="orange darken-2" dark @click="openDetail(p)">
              รายละเอียด
            </v-btn>

            <v-btn color="blue darken-2" dark to="/cart">
              ไปที่ตะกร้า
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>

  <!-- Dialog แสดงรายละเอียดสินค้า -->
  <v-dialog v-model="detailDialog" max-width="500">
    <v-card>
      <v-card-title class="text-h6">{{ selectedProduct.name }}</v-card-title>
      <v-card-text>
        <v-img :src="selectedProduct.image" max-height="200" class="mb-3" />
        <div>{{ selectedProduct.description }}</div>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="green darken-2" text @click="detailDialog = false">ปิด</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

  <!-- Alert / Toast ด้านบน -->
  <v-snackbar
    v-model="snackbar"
    timeout="2500"
    color="green darken-2"
    top
    elevation="8"
    shaped
    multi-line
  >
    <span class="text-h6 white--text font-weight-bold">{{ snackbarMessage }}</span>
  </v-snackbar>
</template>

<script setup>
import { ref } from 'vue'

const snackbar = ref(false)
const snackbarMessage = ref('')

// Dialog สำหรับรายละเอียด
const detailDialog = ref(false)
const selectedProduct = ref({})

// ฟังก์ชันเปิดรายละเอียด
const openDetail = (product) => {
  selectedProduct.value = product
  detailDialog.value = true
}

// ข้อมูลสินค้า
const products = ref([
  { 
    priceId: "price_1Rw0ALDN579DoqMWalh5iYnZ",
    id: 1, 
    name: 'ยาดมสมุนไพรแท้', 
    price: 30, 
    image: '/yadom1.png',
    description: `เป็นยาดมสมุนไพรสกัดจากธรรมชาติ 100%
กลิ่นหอมสดชื่น ช่วยให้รู้สึกกระปรี้กระเปร่าเมื่อต้องการความสดชื่นทันที
พกพาง่าย ใช้ได้ทุกที่ ทุกเวลา
เหมาะสำหรับผู้ที่ต้องการผ่อนคลาย หรือต้องการลดความง่วงระหว่างวัน`
  },
  { 
    priceId:"price_1Rw0DQDN579DoqMWq04Y5niI",
    id: 2, 
    name: 'ยาดมมิ้นท์', 
    price: 25, 
    image: '/yadom2.png',
    description: 'กลิ่นมิ้นท์เย็นสดชื่น ใช้ง่าย พกพาสะดวก'
  },
  { 
    priceId:"price_1Rw0DkDN579DoqMWsRCa1Zwq",
    id: 3, 
    name: 'ยาดมตลับทอง', 
    price: 35, 
    image: '/yadom3.png',
    description: 'ยาดมตลับทอง กลิ่นหอมเข้มข้น ใช้ได้ทุกเวลา'
  },
  { priceId:"price_1RwNM3DN579DoqMWxzQ3eZAa",
    id: 4, 
    name: 'ยาดมสมุนไพรแท้2', 
    price: 30, 
    image: '/yadom1.png',
    description: 'ยาดมสมุนไพรสกัด 100% กลิ่นสดชื่น'
  },
  { 
    id: 5, 
    name: 'ยาดมมิ้นท์2', 
    price: 25, 
    image: '/yadom2.png',
    description: 'กลิ่นมิ้นท์เย็นสดชื่น'
  },
  { 
    id: 6, 
    name: 'ยาดมตลับทอง2', 
    price: 35, 
    image: '/yadom3.png',
    description: 'ยาดมตลับทอง กลิ่นหอมเข้มข้น'
  },
])

// Slide show
const slide = ref(0)
const images = [
  '/slideshow1.png',
  '/slideshow2.png',
  '/slideshow3.png'
]

// ฟังก์ชันเพิ่มสินค้า
const addToCart = (product) => {
  let cart = JSON.parse(localStorage.getItem('cart') || '[]')
  const index = cart.findIndex(item => item.id === product.id)
  if (index !== -1) {
    cart[index].qty += 1
  } else {
    cart.push({
      ...product,
      qty: 1,
      price: Number(product.price)
    })
  }
  localStorage.setItem('cart', JSON.stringify(cart))
  window.dispatchEvent(new Event('cart-updated'))

  snackbarMessage.value = `✅ เพิ่ม ${product.name} ลงตะกร้าเรียบร้อย!`
  snackbar.value = true
}
</script>
