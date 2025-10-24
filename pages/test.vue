<template>
  <v-sheet 
    ใช้สี Custom ที่กำหนดไว้ใน Theme
    color="#AA7B5C"
    class="py-16 text-center"
    style="background-image: url('your-texture-image.png'); background-size: cover;" 
    dark
  >
    <v-container>
      <v-row>
        
        <v-col 
          cols="12" 
          sm="6" 
          md="3"
        >
          <v-icon size="60">mdi-leaf</v-icon>
          <div class="text-h6 font-weight-bold mt-4">Natural ingredients</div>
          <p class="text-body-2 mt-2">
            Premium natural ingredients that are more eco-friendly & better for health.
          </p>
        </v-col>

        <v-col 
          cols="12" 
          sm="6" 
          md="3"
        >
          <v-icon size="60">mdi-bottle-tonic-plus-outline</v-icon>
          <div class="text-h6 font-weight-bold mt-4">Aromatherapy</div>
          <p class="text-body-2 mt-2">
            Special blend of essential oils that truly helps improve your mood and your mind.
          </p>
        </v-col>

        <v-col 
          cols="12" 
          sm="6" 
          md="3"
        >
          <v-icon size="60">mdi-palette-swatch-outline</v-icon>
          <div class="text-h6 font-weight-bold mt-4">Unique Thai Design</div>
          <p class="text-body-2 mt-2">
            Original designs inspired by Thai arts and cultures
          </p>
        </v-col>

        <v-col 
          cols="12" 
          sm="6" 
          md="3"
        >
          <v-icon size="60">mdi-gift-outline</v-icon>
          <div class="text-h6 font-weight-bold mt-4">Customizable Gifts</div>
          <p class="text-body-2 mt-2">
            Made-to-order gift sets for special occasions and organizations.
          </p>
        </v-col>

      </v-row>
    </v-container>
  </v-sheet>
</template>

<script>
export default {
  // component logic
}
</script>