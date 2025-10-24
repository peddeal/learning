<template>
  <v-container fluid class="pa-0" style="background-color: antiquewhite; min-height: 100vh;">
    
    <!-- Hero Section -->
    <v-container class="text-center py-12">
      <h1 class="text-h2 font-bold mb-3">รีวิวจากลูกค้า YaDom</h1>
      <p class="text-subtitle-1 mb-6">ลูกค้าของเราพูดถึงความสดชื่นและคุณภาพของยาดม</p>
      <v-btn color="green-darken-2" dark class="mx-2" to="/">กลับหน้าหลัก</v-btn>
      <v-btn color="teal-lighten-2" dark class="mx-2" :to="{ path: '/product', hash: '#product' }">ไปหน้าสินค้า</v-btn>
    </v-container>

    <!-- Reviews Grid -->
    <v-container class="pb-12">
      <v-row dense>
        <v-col v-for="(review, index) in reviews" :key="index" cols="12" sm="6" md="4">
          <v-card class="pa-4 elevation-6" style="border-radius: 16px; background: rgba(255,255,255,0.9);">
            <v-row align="center" class="mb-3">
              <v-avatar size="56" class="mr-3">
                <v-img :src="review.avatar"></v-img>
              </v-avatar>
              <div>
                <div class="text-subtitle-1 font-medium">
                  {{ review.name }}
                  <span class="text-caption grey--text">({{ review.location }})</span>
                </div>
                <v-rating
                  v-model="review.rating"
                  dense
                  color="amber"
                  readonly
                  background-color="grey lighten-2"
                  size="18"
                ></v-rating>
                <div class="text-caption grey--text">{{ review.date }}</div>
              </div>
            </v-row>

            <p class="text-body-2 mb-2" style="font-style: italic;">"{{ review.comment }}"</p>
            <div class="text-caption mb-2 font-medium">สินค้าที่รีวิว: {{ review.product }}</div>

           
          </v-card>
        </v-col>
      </v-row>
    </v-container>

  </v-container>
</template>

<script setup lang="ts">
import { reactive } from 'vue'

interface Review {
  name: string
  avatar: string
  rating: number
  comment: string
  product: string
  date: string
  likes: number
  location: string
}

// รีวิว 9 คน
const reviews = reactive<Review[]>([
  { name: 'สมชาย', avatar: '/avatar1.png', rating: 5, comment: 'ยาดมหอมสดชื่นมาก พกง่ายสุด!', product: 'ยาดมสมุนไพรแท้', date: '12 ส.ค. 2025', likes: 12, location: 'กรุงเทพฯ' },
  { name: 'สมหญิง', avatar: '/avatar2.png', rating: 4, comment: 'ชอบกลิ่นมิ้นท์ สดชื่นดีค่ะ', product: 'ยาดมมิ้นท์', date: '10 ส.ค. 2025', likes: 8, location: 'ชลบุรี' },
  { name: 'มานพ', avatar: '/avatar3.png', rating: 5, comment: 'ตลับทองพรีเมียม คุณภาพดีมาก!', product: 'ยาดมตลับทอง', date: '8 ส.ค. 2025', likes: 15, location: 'เชียงใหม่' },
  { name: 'ธนกร', avatar: '/avatar4.png', rating: 4, comment: 'ราคาสมเหตุสมผล ใช้งานดี', product: 'ยาดมสมุนไพรแท้', date: '7 ส.ค. 2025', likes: 5, location: 'นครราชสีมา' },
  { name: 'ปวีณา', avatar: '/avatar5.png', rating: 5, comment: 'กลิ่นสดชื่นมาก ชอบสุดๆ', product: 'ยาดมมิ้นท์', date: '5 ส.ค. 2025', likes: 9, location: 'ภูเก็ต' },
  { name: 'เอกชัย', avatar: '/avatar6.png', rating: 3, comment: 'โอเค แต่หวังว่าจะมีกลิ่นใหม่ๆ', product: 'ยาดมตลับทอง', date: '3 ส.ค. 2025', likes: 3, location: 'สงขลา' },
  { name: 'จุฑามาศ', avatar: '/avatar7.png', rating: 4, comment: 'กลิ่นหอม แต่ขนาดพกพาเล็กไปนิด', product: 'ยาดมสมุนไพรแท้', date: '2 ส.ค. 2025', likes: 7, location: 'นนทบุรี' },
  { name: 'วรพล', avatar: '/avatar8.png', rating: 5, comment: 'คุณภาพดี ใช้งานง่าย', product: 'ยาดมมิ้นท์', date: '1 ส.ค. 2025', likes: 10, location: 'เชียงราย' },
  { name: 'สุมิตรา', avatar: '/avatar9.png', rating: 4, comment: 'ชอบมากค่ะ ซื้อซ้ำแน่นอน', product: 'ยาดมตลับทอง', date: '31 ก.ค. 2025', likes: 6, location: 'ขอนแก่น' },
])


</script>
