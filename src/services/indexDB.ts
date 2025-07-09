export async function setIndexDB<T extends object>(
  dbName: string,
  storeName: string,
  key: string,
  value: Partial<T>
): Promise<void> {
  const existing = await getIndexDB<T>(dbName, storeName, key)
  const merged = { ...(existing ?? {}), ...value }

  const db = await new Promise<IDBDatabase>((resolve, reject) => {
    const request = indexedDB.open(dbName, 1)

    request.onupgradeneeded = () => {
      const db = request.result
      if (!db.objectStoreNames.contains(storeName)) {
        db.createObjectStore(storeName)
      }
    }

    request.onsuccess = () => resolve(request.result)
    request.onerror = () => reject(request.error)
  })

  const transaction = db.transaction([storeName], 'readwrite')
  const store = transaction.objectStore(storeName)
  store.put(merged, key)
}

export async function getIndexDB<T>(dbName: string, storeName: string, key: string): Promise<T | null> {
  const db = await new Promise<IDBDatabase>((resolve, reject) => {
    const request = indexedDB.open(dbName, 1)

    request.onupgradeneeded = () => {
      const db = request.result
      if (!db.objectStoreNames.contains(storeName)) {
        db.createObjectStore(storeName)
      }
    }

    request.onsuccess = () => resolve(request.result)
    request.onerror = () => reject(request.error)
  })

  return new Promise<T | null>((resolve, reject) => {
    const transaction = db.transaction([storeName], 'readonly')
    const store = transaction.objectStore(storeName)
    const request = store.get(key)

    request.onsuccess = () => resolve(request.result || null)
    request.onerror = () => reject(request.error)
  })
}

export async function clearIndexDB(
  dbName: string,
  storeName: string,
  key: string,
): Promise<void> {
  const db = await new Promise<IDBDatabase>((resolve, reject) => {
    const request = indexedDB.open(dbName, 1)
    request.onsuccess = () => resolve(request.result)
    request.onerror = () => reject(request.error)
  })

  const transaction = db.transaction([storeName], 'readwrite')
  transaction.objectStore(storeName).delete(key)
}