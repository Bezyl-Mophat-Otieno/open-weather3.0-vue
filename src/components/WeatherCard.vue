<script setup lang="ts"></script>

<template>
  <div
    class="border border-gray-200 rounded-2xl shadow-lg hover:shadow-xl transition duration-300 max-w-lg w-full mx-auto"
  >
    <div class="p-6">
      <!-- Header -->
      <div class="flex items-start justify-between mb-4">
        <div class="flex items-center space-x-2">
          <MapPin class="h-5 w-5 text-blue-600" />
          <h2 class="text-xl font-semibold text-gray-900">City Name</h2>
        </div>

        <img alt="weather-icon" class="w-16 h-16 object-contain" />
      </div>

      <!-- Weather Content -->
      <div class="space-y-4">
        <!-- Main temperature -->
        <div class="flex items-end space-x-2">
          <span class="text-5xl font-bold text-gray-900">20 °C</span>
          <span class="text-2xl text-gray-500 mb-2">°C</span>
        </div>

        <!-- Weather description -->
        <p class="text-lg text-gray-500 capitalize">scattered clouds</p>

        <!-- Feels like -->
        <div class="flex items-center space-x-2 text-sm text-gray-500">
          <Thermometer class="h-4 w-4" />
          <span>Feels like 30°C</span>
        </div>
      </div>
    </div>
  </div>
</template>
