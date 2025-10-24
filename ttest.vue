<script setup>
import { useLang } from '~/composables/useLang'
import th from '~/locales/th.json'
import en from '~/locales/en.json'

const { t, switchLang, locale } = useLang()
</script>

<template>
  <div class="p-4">
    <h1>{{ t('welcome') }}</h1>

    <button @click="switchLang('th')">TH</button>
    <button @click="switchLang('en')">EN</button>

    <p>Now: {{ locale }}</p>

    <nav>
      <a href="#">{{ t('home') }}</a> |
      <a href="#">{{ t('about') }}</a>
    </nav>
  </div>
</template>