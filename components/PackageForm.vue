<template>
  <div class="mb-4">
    <form @submit.prevent="addPackage" class="space-y-2">
      <div class="flex">
        <input
          v-model="trackingId"
          type="text"
          placeholder="Enter tracking ID"
          class="flex-grow p-2 border rounded-l"
          required
        />
        <input
          v-model="customName"
          type="text"
          placeholder="Custom name (optional)"
          class="flex-grow p-2 border-t border-b border-r"
        />
        <button type="submit" class="bg-blue-500 text-white p-2 rounded-r">
          Add Package
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { usePackageStore } from '~/store/package'

const trackingId = ref('')
const customName = ref('')
const packageStore = usePackageStore()

const addPackage = () => {
  if (trackingId.value.trim()) {
    packageStore.addPackage(trackingId.value.trim(), customName.value.trim())
    trackingId.value = ''
    customName.value = ''
  }
}
</script>