const POKE_API_BASE_URL = 'https://pokeapi.co/api/v2';

export class PokeApiClient {
  async get<ResponseContract>(path: string, signal?: AbortSignal): Promise<ResponseContract> {
    const response = await this.request(path, signal);

    if (!response.ok) {
      throw new Error(`PokeAPI request failed with status ${response.status}`);
    }

    return response.json() as Promise<ResponseContract>;
  }

  private request(path: string, signal?: AbortSignal): Promise<Response> {
    return fetch(`${POKE_API_BASE_URL}${path}`, { signal });
  }
}
