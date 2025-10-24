<template>
  <v-container class="py-6">
    <h2 class="text-h5 mb-4" >🛒 Shopping Cart</h2>

    <!-- รายการสินค้า -->
    <v-row v-if="cart.length > 0">
      <v-col cols="12" v-for="(item, index) in cart" :key="index">
        <v-card class="pa-4 mb-3" outlined>
          <v-row align="center">
            <v-col cols="3">
              <v-img :src="item.image" height="80" contain />
            </v-col>
            <v-col cols="5">
              <div class="font-weight-medium">{{ item.name }}</div>
              <div class="text-grey">฿{{ item.price }} x {{ item.qty }}</div>
            </v-col>
            <v-col cols="4" class="text-right">
              <v-btn color="red" text @click="removeItem(index)">
               Delete
              </v-btn>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>

    <div v-else class="text-center grey--text">
      No Product
    </div>

    <!-- สรุปสินค้า -->
    <v-card class="pa-4 mt-4" outlined v-if="cart.length > 0">
      <v-row>
        <v-col cols="6">
          <strong>Total Product:</strong> {{ totalQty }}
        </v-col>
        <v-col cols="6" class="text-right">
          <strong>Total Prize:</strong> ฿{{ totalPrice }}
        </v-col>
      </v-row>
      <v-btn color="green" class="mt-2" @click="dialog = true">
        Buy
      </v-btn>
    </v-card>

    <!-- Dialog กรอกข้อมูลผู้ซื้อ -->
    <v-dialog v-model="dialog" max-width="500">
      <v-card>
        <v-card-title>
          <span class="text-h6">Fill In Buyer Information
</span>
        </v-card-title>
        <v-card-text>
          <v-text-field v-model="customer.name" label="Name" required></v-text-field>
          <v-text-field v-model="customer.phone" label="Phone" required></v-text-field>
          <v-textarea v-model="customer.address" label="Address" rows="3" required></v-textarea>
          <v-textarea v-model="customer.note" label="Remark" rows="2" required></v-textarea>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text color="red" @click="dialog = false">Cancel</v-btn>
          <v-btn color="green" @click="payWithStripe">Buy</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Snackbar แจ้งกรอกข้อมูลไม่ครบ -->
    <v-snackbar v-model="snackbar" :timeout="3000" top right color="red" elevation="2">
      Please fill out the information completely.
      <template #actions>
        <v-btn text @click="snackbar = false">ปิด</v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { loadStripe } from '@stripe/stripe-js'

const router = useRouter()
const cart = ref([])
const dialog = ref(false)
const snackbar = ref(false)
const customer = ref({
  name: '',
  phone: '',
  address: '',
  note: ''
})

// โหลด cart จาก localStorage
const loadCart = () => {
  const storedCart = localStorage.getItem('cart')
  cart.value = storedCart ? JSON.parse(storedCart) : []
}
onMounted(() => loadCart())

// ลบสินค้า
const removeItem = (index) => {
  cart.value.splice(index, 1)
  localStorage.setItem('cart', JSON.stringify(cart.value))
  window.dispatchEvent(new Event('cart-updated'))
}

// สรุปจำนวนและราคา
const totalQty = computed(() => cart.value.reduce((sum, item) => sum + (item.qty || 0), 0))
const totalPrice = computed(() => cart.value.reduce((sum, item) => sum + (item.qty || 0) * (item.price || 0), 0))

// ชำระเงินด้วย Stripe
const payWithStripe = async () => {
  if (!customer.value.name || !customer.value.phone || !customer.value.address ) {
    snackbar.value = true
    return
  }

  const stripe = await loadStripe('pk_test_51Rw04fDN579DoqMWhmPJf9W94mZZFa5VAM5rFssRLs7bpBKAAHwO2q7Vx0Jtos0dgwOlW7kK5JVoi0cKu9fuFJch00mBikVWG0') // เปลี่ยนเป็นของคุณ

  const lineItems = cart.value.map(item => ({
    price: item.priceId, // ใช้ Price ID ที่ได้จาก Dashboard
    quantity: item.qty
  }))

  // เก็บ customer และ cart ไว้ชั่วคราว
  localStorage.setItem('tempCustomer', JSON.stringify(customer.value))
  localStorage.setItem('tempCart', JSON.stringify(cart.value))

  const { error } = await stripe.redirectToCheckout({
    mode: 'payment',
    lineItems,
    successUrl: window.location.href + '?success=true',
    cancelUrl: window.location.href + '?canceled=true'
  })

  if (error) alert(error.message)

  dialog.value = false
}

// ตรวจสอบ success/canceled
onMounted(() => {
  const params = new URLSearchParams(window.location.search)
  if (params.get('success')) {
    (async () => {
      // โหลดค่าชั่วคราว
      const tempCustomer = JSON.parse(localStorage.getItem('tempCustomer') || '{}')
      const tempCart = JSON.parse(localStorage.getItem('tempCart') || '[]')

      await submitToGoogleForm(tempCustomer, tempCart)

      alert('✅ Buy Complete Thank You!')

      // ล้างค่าเก่า
      cart.value = []
      customer.value = { name: '', phone: '', address: '', note: '' }
      localStorage.removeItem('cart')
      localStorage.removeItem('tempCustomer')
      localStorage.removeItem('tempCart')
      window.dispatchEvent(new Event('cart-updated'))

      router.push('/')
    })()
  } else if (params.get('canceled')) {
    alert('❌ Transaction was canceled')
  }
})

// ส่ง Google Form โดยใช้ค่า temp
const submitToGoogleForm = async (cust, cartItems) => {
  const formUrl = "https://docs.google.com/forms/u/0/d/e/1FAIpQLScyWg66noZ7J2tBzUVL8Mbm4G1ivGJoTq-QP0dezHuRQ0UA9A/formResponse"

  const formData = new FormData()
  formData.append("entry.480087022", cust.name)
  formData.append("entry.1716946672", cust.phone)
  formData.append("entry.251996553", cust.address)
  formData.append("entry.1137939559", cust.note)

  const cartText = cartItems.map(item =>
    `สินค้า: ${item.name}, ราคา: ${item.price}, จำนวน: ${item.qty}, รายละเอียด: ${item.description || ''}`
  ).join("\n")

  formData.append("entry.764732426", cartText)

  await fetch(formUrl, {
    method: "POST",
    body: formData,
    mode: "no-cors"
  })
}
</script>
