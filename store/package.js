import { defineStore } from 'pinia'

const couriers = ['FedEx', 'UPS', 'USPS', 'DHL', 'Amazon Logistics', 'OnTrac', 'LaserShip']
const locations = ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'Philadelphia', 'San Antonio', 'San Diego', 'Dallas', 'San Jose']
const statusUpdates = [
  'Order received',
  'Package processed',
  'In transit',
  'Out for delivery',
  'Delivered'
]

export const usePackageStore = defineStore('package', {
  state: () => ({
    packages: []
  }),
  actions: {
    addPackage(trackingId, customName) {
      const newPackage = {
        id: Date.now(),
        trackingId,
        customName,
        courier: couriers[Math.floor(Math.random() * couriers.length)],
        status: 'In Transit',
        updates: [
          {
            status: 'Order received',
            location: locations[Math.floor(Math.random() * locations.length)],
            timestamp: new Date().toISOString()
          }
        ]
      }
      this.packages.push(newPackage)
      this.simulateUpdates(newPackage.id)
    },
    simulateUpdates(id) {
      const pkg = this.packages.find(p => p.id === id)
      if (!pkg) return

      let updateIndex = 1
      const updateInterval = setInterval(() => {
        if (updateIndex < statusUpdates.length) {
          pkg.updates.push({
            status: statusUpdates[updateIndex],
            location: locations[Math.floor(Math.random() * locations.length)],
            timestamp: new Date().toISOString()
          })
          pkg.status = statusUpdates[updateIndex]
          updateIndex++
        } else {
          clearInterval(updateInterval)
        }
      }, 10000) // Update every 10 seconds for demonstration purposes
    },
    updatePackageName(id, newName) {
      const pkg = this.packages.find(p => p.id === id)
      if (pkg) {
        pkg.customName = newName
      }
    },
    updatePackageCourier(id, newCourier) {
      const pkg = this.packages.find(p => p.id === id)
      if (pkg) {
        pkg.courier = newCourier
        // Reset updates when courier changes
        pkg.updates = [{
          status: 'Order received',
          location: locations[Math.floor(Math.random() * locations.length)],
          timestamp: new Date().toISOString()
        }]
        pkg.status = 'In Transit'
        this.simulateUpdates(id)
      }
    },
    getCouriers() {
      return couriers
    }
  }
})