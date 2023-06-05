import { Person } from '../models'

class Swapi {
  private rootUrl: string = `https://swapi.dev/api`

  async fetchPeople(page: number, query: string) {
    return this.request(`${this.rootUrl}/people/?page=${page}&search=${query}`)
  }

  async fetchPerson(id: string) {
    const person: Person = await this.request(`${this.rootUrl}/people/${id}`)

    const {
      films: filmsUrls,
      species: speciesUrls,
      vehicles: vehiclesUrls,
      starships: starshipsUrls,
      homeworld: homeworldUrl,
    } = person

    const [films, species, vehicles, starships, homeworld] = await Promise.all([
      ...[filmsUrls, speciesUrls, vehiclesUrls, starshipsUrls].map((urls) => {
        return this.requestNames(urls)
      }),
      this.requestName(homeworldUrl),
    ])

    return {
      ...person,
      films,
      species,
      vehicles,
      starships,
      homeworld,
    }
  }

  requestNames(urls: string[]) {
    return Promise.all(urls.map((url) => this.requestName(url)))
  }

  async requestName(url: string): Promise<string> {
    try {
      const data = await this.request(url)

      return data.name || data.title
    } catch {
      return url
    }
  }

  async request(url: string) {
    const response = await fetch(url)

    if (!response.ok) {
      throw new Error('Request failed')
    }

    const data = await response.json()

    return data
  }

  getIdByUrl(url: string): string | null {
    const match = url.match(/people\/(\d*)/)

    return match && match[1]
  }
}

const swapi = new Swapi()

export default swapi
