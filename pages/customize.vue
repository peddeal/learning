<template>
  <v-container>
    <h1 class="text-center" id="cust"> 🎋 Customize Yours</h1>

    <v-row>
      <v-col
        v-for="(herb, index) in herbs"
        :key="index"
        cols="12"
        md="6"
        lg="4"
      >
        <v-card>
          <v-img
            :src="herb.image"
            height="300px"
            cover
          ></v-img>
          <v-card-title>{{ herb.name }}</v-card-title>
          <v-card-text>
            <v-slider
              v-model="herb.percentage"
              :max="100"
              :step="1"
              color="green"
              thumb-label
              @change="validateTotal"
            ></v-slider>
            <div>proportion
: {{ herb.percentage }}%</div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
<v-alert
      v-if="totalPercentage > 100"
      type="error"
      class="my-4"
    >
      The total percentage exceeds 100% ({{ totalPercentage }}%) กรุณาปรับลด
    </v-alert>

    <v-alert
      v-else
      type="success"
      class="my-4"
    >
      Total percentage: {{ totalPercentage }}%
    </v-alert>

    <br>
</br>
    <v-btn color="primary" :disabled="totalPercentage !== 100" @click="submitFormula">
      Customize
    </v-btn>

    <div v-if="showResult" class="mt-6">
      <h2>🌿 Your Customize:</h2>
      <ul>
        <li v-for="herb in herbs" :key="herb.name" v-if="herb.percentage > 0">
          {{ herb.name }}: {{ herb.percentage }}%
        </li>
      </ul>
    </div>
  </v-container>
</template>

<script setup>
import { ref, computed } from 'vue'

const herbs = ref([
  { name: 'Eucalyptus', image: 'b1.jpg', percentage: 0 },
  { name: 'Cinnamon', image: 'b2.jpg', percentage: 0 },
  { name: 'Cardamom', image: 'b3.jpg', percentage: 0 },
  { name: 'Star anise', image: 'b4.jpg', percentage: 0 },
  { name: 'black pepper', image: 'b5.jpg', percentage: 0 },
  { name: 'Charcoal', image: 'b6.jpg', percentage: 0 },
  { name: 'Camphor', image: 'b7.jpg', percentage: 0 },
  { name: 'Borneo camphor', image: 'b8.jpg', percentage: 0 },
  { name: 'Menthol', image: 'b9.jpg', percentage: 0 },
])

const totalPercentage = computed(() =>
  herbs.value.reduce((sum, herb) => sum + herb.percentage, 0)
)

const showResult = ref(false)

const validateTotal = () => {
  if (totalPercentage.value > 100) {
    showResult.value = false
  }
}

const submitFormula = () => {
  if (totalPercentage.value === 100) {
    showResult.value = true
  }
}
</script>

<style scoped>
h1 {
  margin-bottom: 20px;
}
</style>