import { get, post, remove } from './fetch'
import { Bucket, SearchOptions } from './types'

const DEFAULT_SEARCH_OPTIONS = {
  prefix: '',
  limit: 0,
  offset: 0,
  sortBy: {
    column: 'name',
    order: 'asc',
  },
}

export class StorageClient {
  url: string
  headers: { [key: string]: string }

  constructor(url: string, headers: { [key: string]: string } = {}) {
    this.url = url
    this.headers = headers
  }

  /**
   * Gets all buckets
   */
  async getAllBuckets(): Promise<{ data: Bucket[] | null; error: Error | null }> {
    try {
      const data = await get(`${this.url}/bucket`, { headers: this.headers })
      return { data, error: null }
    } catch (error) {
      return { data: null, error }
    }
  }

  /**
   * Get details of a bucket
   * @param id the bucket id to retrieve
   */
  async getBucket(id: string): Promise<{ data: Bucket | null; error: Error | null }> {
    try {
      const data = await get(`${this.url}/bucket/${id}`, { headers: this.headers })
      return { data, error: null }
    } catch (error) {
      return { data: null, error }
    }
  }

  /**
   * Create a bucket
   * @param name the new bucket name
   */
  async createBucket(name: string): Promise<{ data: Bucket | null; error: Error | null }> {
    try {
      const data = await post(`${this.url}/bucket`, { name }, { headers: this.headers })
      return { data, error: null }
    } catch (error) {
      return { data: null, error }
    }
  }

  /**
   * Empty a bucket
   * @param id the bucket id to empty
   */
  async emptyBucket(id: string): Promise<{ data: Bucket | null; error: Error | null }> {
    try {
      const data = await post(`${this.url}/bucket/${id}/empty`, {}, { headers: this.headers })
      return { data, error: null }
    } catch (error) {
      return { data: null, error }
    }
  }

  /**
   * Delete a bucket
   * @param id the bucket id to delete
   */
  async deleteBucket(id: string): Promise<{ data: Bucket | null; error: Error | null }> {
    try {
      const data = await remove(`${this.url}/bucket/${id}`, { headers: this.headers })
      return { data, error: null }
    } catch (error) {
      return { data: null, error }
    }
  }

  async search(
    folderName: string,
    options?: SearchOptions
  ): Promise<{ data: File[] | null; error: Error | null }> {
    try {
      const body = { ...DEFAULT_SEARCH_OPTIONS, ...options }
      const data = await post(`${this.url}/search/${folderName}`, body, { headers: this.headers })
      return { data, error: null }
    } catch (error) {
      return { data: null, error }
    }
  }
}
