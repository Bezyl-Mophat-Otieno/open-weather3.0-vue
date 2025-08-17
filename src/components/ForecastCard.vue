<script setup lang="ts"></script>

<template>
  <div class="space-y-4">
    <!-- Title -->
    <div class="flex items-center space-x-2">
      <Calendar class="h-5 w-5 text-blue-600" />
      <h3 class="text-lg font-semibold text-gray-900">7-Day Forecast</h3>
    </div>

    <!-- Forecast Cards -->
    <div
      class="flex space-x-4 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent"
    >
      <div
        class="flex-shrink-0 w-40 bg-white rounded-xl border border-gray-200 transition duration-200 hover:shadow-md hover:border-blue-400"
      >
        <div class="p-4">
          <div class="text-center space-y-3">
            <!-- Date -->
            <p class="text-sm font-medium text-gray-900">Sun, Aug 17</p>

            <!-- Icon -->
            <img alt="weather logo" class="w-12 h-12 object-contain mx-auto" />

            <!-- Temperatures -->
            <div class="space-y-1 text-sm">
              <div class="flex justify-between items-center">
                <span class="text-gray-500">High</span>
                <span class="font-semibold text-gray-900"> 20°C </span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-gray-500">Low</span>
                <span class="text-gray-500"> 23° </span>
              </div>
            </div>

            <!-- Description -->
            <p class="text-xs text-gray-500 capitalize leading-tight">moderate rain</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
