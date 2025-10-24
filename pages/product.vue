<template>


  <v-container class="mt-8">
  <!-- หัวข้อ Product -->
  <v-row>
    <v-col cols="12">
      <h2 class="text-h4 font-weight-bold mb-5 ">Product </h2>
    </v-col>
  </v-row>

  <!-- Product List -->
  <v-row id="product">
    <v-col v-for="(p, index) in products" :key="index" cols="12" sm="4">
      <v-card>
        <v-img :src="p.image" height="200px" />
        <v-card-title>{{ p.name }}</v-card-title>
        <v-card-subtitle>฿{{ p.price }}</v-card-subtitle>
        <v-card-actions>
          <v-btn color="green-darken-2" dark @click="addToCart(p)">
            Add to Cart

          </v-btn>

          <!-- ปุ่มรายละเอียด -->
          <v-btn color="orange darken-2" dark @click="openDetail(p)">
            Details

          </v-btn>

          <v-btn color="blue darken-2" dark to="/cart">
            Go To Cart
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
    priceId: "price_1SLcq3DN579DoqMWslHrIBQj",
    id: 1, 
    name: 'Original Blend', 
    price: 50, 
    image: '/product1.jpg',
    
  },
  { 
    priceId: "price_1SLcqPDN579DoqMWQ9MAvQTV",
    id: 2, 
    name: 'Energy Refresh', 
    price: 50, 
    image: '/product2.jpg',
    
  },
  { 
    priceId: "price_1SLcqoDN579DoqMWhdlvAzP3",
    id: 3, 
    name: 'Focus Boost', 
    price: 50, 
    image: '/product3.jpg',
    
  },
  { 
    priceId: "price_1SLcr7DN579DoqMWe1jAFZot",
    id: 4, 
    name: 'Winter Calm', 
    price: 50, 
    image: '/product4.jpg',
    
  },
  { 
    priceId: "price_1Rw0ALDN579DoqMWalh5iYnZ",
    id: 5, 
    name: 'Authentic Herbal Inhaler', 
    price: 30, 
    image: '/yadom1.png',
    description: `เป็นยาดมสมุนไพรสกัดจากธรรมชาติ 100%
กลิ่นหอมสดชื่น ช่วยให้รู้สึกกระปรี้กระเปร่าเมื่อต้องการความสดชื่นทันที
พกพาง่าย ใช้ได้ทุกที่ ทุกเวลา
เหมาะสำหรับผู้ที่ต้องการผ่อนคลาย หรือต้องการลดความง่วงระหว่างวัน`
  },
  { 
    priceId:"price_1Rw0DQDN579DoqMWq04Y5niI",
    id: 6, 
    name: 'Mint Inhaler', 
    price: 25, 
    image: '/yadom2.png',
    description: 'กลิ่นมิ้นท์เย็นสดชื่น ใช้ง่าย พกพาสะดวก'
  },
  { 
    priceId:"price_1Rw0DkDN579DoqMWsRCa1Zwq",
    id: 7, 
    name: 'Golden Cap Inhaler', 
    price: 35, 
    image: '/yadom3.png',
    description: 'ยาดมตลับทอง กลิ่นหอมเข้มข้น ใช้ได้ทุกเวลา'
  },
  { priceId:"price_1RwNM3DN579DoqMWxzQ3eZAa",
    id: 8, 
    name: 'Authentic Herbal Inhaler2', 
    price: 9, 
    image: '/yadom1.png',
    description: 'ยาดมสมุนไพรสกัด 100% กลิ่นสดชื่น'
  },
  { priceId:"price_1RwNN5DN579DoqMWyrrdFbE6",
    id: 10, 
    name: 'Mint Inhaler2', 
    price: 25, 
    image: '/yadom2.png',
    description: 'กลิ่นมิ้นท์เย็นสดชื่น'
  },
  { priceId:"price_1RwNODDN579DoqMWyKM4RDJ5",
    id: 11, 
    name: 'Golden Cap Inhaler2', 
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

  snackbarMessage.value = `✅ Add ${product.name} To Cart Successfully!`
  snackbar.value = true
}
</script>
