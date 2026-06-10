import type { ApiResponse } from "./types"

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export async function getUsers(): Promise<ApiResponse> {
  const start = performance.now()
  console.log("▶ Starting: getUsers()...")
  await delay(2000)
  const res = await fetch("https://jsonplaceholder.typicode.com/users")
  const data = await res.json()
  const duration = Math.round(performance.now() - start)
  console.log(`✓ Users loaded in ${duration}ms`)
  return { data, duration, count: data.length }
}

export async function getOrders(): Promise<ApiResponse> {
  const start = performance.now()
  console.log("▶ Starting: getOrders()...")
  await delay(2000)
  const res = await fetch("https://jsonplaceholder.typicode.com/posts")
  const data = await res.json()
  const duration = Math.round(performance.now() - start)
  console.log(`✓ Orders loaded in ${duration}ms`)
  return { data, duration, count: data.length }
}

export async function getAnalytics(): Promise<ApiResponse> {
  const start = performance.now()
  console.log("▶ Starting: getAnalytics()...")
  await delay(2000)
  const res = await fetch("https://jsonplaceholder.typicode.com/comments")
  const data = await res.json()
  const duration = Math.round(performance.now() - start)
  console.log(`✓ Analytics loaded in ${duration}ms`)
  return { data, duration, count: data.length }
}

export async function getNotifications(): Promise<ApiResponse> {
  const start = performance.now()
  console.log("▶ Starting: getNotifications()...")
  await delay(2000)
  const res = await fetch("https://jsonplaceholder.typicode.com/albums")
  const data = await res.json()
  const duration = Math.round(performance.now() - start)
  console.log(`✓ Notifications loaded in ${duration}ms`)
  return { data, duration, count: data.length }
}

export async function fetchSequential(): Promise<{
  users: ApiResponse
  orders: ApiResponse
  analytics: ApiResponse
  notifications: ApiResponse
  totalDuration: number
}> {
  const start = performance.now()
  console.log("━━━ SEQUENTIAL MODE ━━━")
  const users = await getUsers()
  const orders = await getOrders()
  const analytics = await getAnalytics()
  const notifications = await getNotifications()
  const totalDuration = Math.round(performance.now() - start)
  console.log(`━━━ Dashboard loaded in ${totalDuration}ms ━━━`)
  return { users, orders, analytics, notifications, totalDuration }
}

export async function fetchParallel(): Promise<{
  users: ApiResponse
  orders: ApiResponse
  analytics: ApiResponse
  notifications: ApiResponse
  totalDuration: number
}> {
  const start = performance.now()
  console.log("━━━ PARALLEL MODE ━━━")
  const [users, orders, analytics, notifications] = await Promise.all([
    getUsers(),
    getOrders(),
    getAnalytics(),
    getNotifications(),
  ])
  const totalDuration = Math.round(performance.now() - start)
  console.log(`━━━ Dashboard loaded in ${totalDuration}ms ━━━`)
  return { users, orders, analytics, notifications, totalDuration }
}
