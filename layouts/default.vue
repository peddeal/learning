<template >
  <v-app  style="background-color: antiquewhite;">
    <!-- Hero Banner -->
    <v-img src="/public/test2.png" cover>
      <!-- แถบเมนู -->
      <div
        class="d-flex justify-end align-start px-6 py-2"
        style="position: absolute; top: 0; left: 0; right: 0;"
      >
        <!-- เมนู -->
        <div>
          <v-btn
            v-for="(item, i) in menuItems"
            :key="i"
            variant="text"
            class="mx-3"
            :to="item.to"
            style="color: black; font-weight: 500;"
          >
            {{ item.label }}
          </v-btn>

          <!-- ไอคอนตะกร้า -->
          <v-btn icon to="/cart" style="color: black;">
            <v-icon>mdi-cart</v-icon>
          </v-btn>
        </div>
      </div>
    </v-img>

    <!-- Main Content -->
    <v-main>
      <v-container class="py-10">
        <NuxtPage />
      </v-container>
    </v-main>

    <!-- Footer -->
    <v-footer color="brown lighten-3" app>
      <v-container>
        <v-row justify="center">
          <v-col cols="12" class="text-center text-white">
            © 2025 HOM THAI| ติดต่อ:02-123-4567
          </v-col>
        </v-row>
      </v-container>
    </v-footer>
  </v-app>
</template>

<script setup>
import Cart from '~/pages/cart.vue';

const menuItems = [
  { label: "Home", to: "/" },
  { label: "About us", to: "/about" },
  { label: "Products", to: "/product" },
  { label: "Review", to: "/review" },
  { label: "Our stores", to: "/stores" },
  { label: "Contact us", to: "/contact" },
]
</script>
