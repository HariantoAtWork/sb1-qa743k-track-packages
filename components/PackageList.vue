<template>
  <div>
    <h2 class="text-2xl font-semibold mb-2">Tracked Packages</h2>
    <ul v-if="packages.length > 0" class="space-y-2">
      <li v-for="pkg in packages" :key="pkg.id" class="bg-gray-100 p-2 rounded flex justify-between items-center">
        <span>{{ pkg.customName || pkg.trackingId }}</span>
        <NuxtLink :to="`/track/${pkg.id}`" class="text-blue-500 hover:underline">View Details</NuxtLink>
      </li>
    </ul>
    <p v-else>No packages added yet.</p>
  </div>
</template>

<script setup>
import { usePackageStore } from '~/store/package'

const packageStore = usePackageStore()
const packages = packageStore.packages
</script>