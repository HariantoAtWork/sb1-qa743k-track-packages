<template>
  <div class="container mx-auto p-4">
    <h1 class="text-3xl font-bold mb-4">Package Details</h1>
    <div v-if="trackingPackage" class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <div class="flex items-center mb-2">
        <h2 class="text-2xl font-semibold mr-2">{{ trackingPackage.customName || trackingPackage.trackingId }}</h2>
        <button @click="editName = true" v-if="!editName" class="text-blue-500 hover:underline">Edit</button>
        <div v-else class="flex items-center">
          <input v-model="newName" class="border rounded p-1 mr-2" />
          <button @click="updateName" class="bg-blue-500 text-white px-2 py-1 rounded mr-2">Save</button>
          <button @click="editName = false" class="bg-gray-300 px-2 py-1 rounded">Cancel</button>
        </div>
      </div>
      <p><strong>Tracking ID:</strong> {{ trackingPackage.trackingId }}</p>
      <div class="flex items-center mb-2">
        <p class="mr-2"><strong>Courier:</strong> {{ trackingPackage.courier }}</p>
        <button @click="showCourierSelect = true" class="text-blue-500 hover:underline">Change</button>
      </div>
      <div v-if="showCourierSelect" class="mb-4">
        <input v-model="courierSearch" @input="filterCouriers" placeholder="Search couriers" class="border rounded p-1 mb-2" />
        <ul class="bg-white border rounded max-h-40 overflow-y-auto">
          <li v-for="courier in filteredCouriers" :key="courier" @click="updateCourier(courier)" class="p-2 hover:bg-gray-100 cursor-pointer">
            {{ courier }}
          </li>
        </ul>
      </div>
      <p><strong>Status:</strong> {{ trackingPackage.status }}</p>
      <h3 class="text-xl font-semibold mt-4 mb-2">Updates</h3>
      <ul class="space-y-2">
        <li v-for="(update, index) in trackingPackage.updates" :key="index" class="border-l-2 border-blue-500 pl-4">
          <p class="font-semibold">{{ update.status }}</p>
          <p>{{ update.location }}</p>
          <p class="text-sm text-gray-600">{{ new Date(update.timestamp).toLocaleString() }}</p>
        </li>
      </ul>
    </div>
    <div v-else>Package not found</div>
    <NuxtLink to="/" class="text-blue-500 hover:underline">Back to Package List</NuxtLink>
  </div>
</template>

<script setup>
// ... (keep the existing script setup code)
</script>