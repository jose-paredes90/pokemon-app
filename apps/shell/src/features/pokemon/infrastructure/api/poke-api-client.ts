const POKE_API_BASE_URL = 'https://pokeapi.co/api/v2';

export class PokeApiClient {
  async get<ResponseContract>(path: string, signal?: AbortSignal): Promise<ResponseContract> {
    const response = await this.request(path, signal);
    return this.parseResponse<ResponseContract>(response);
  }

  async getOptional<ResponseContract>(
    path: string,
    signal?: AbortSignal,
  ): Promise<ResponseContract | null> {
    const response = await this.request(path, signal);
    if (response.status === 404) return null;
    return this.parseResponse<ResponseContract>(response);
  }

  private async parseResponse<ResponseContract>(response: Response): Promise<ResponseContract> {
    if (!response.ok) {
      throw new Error(`PokeAPI request failed with status ${response.status}`);
    }

    return response.json() as Promise<ResponseContract>;
  }

  private request(path: string, signal?: AbortSignal): Promise<Response> {
    return fetch(`${POKE_API_BASE_URL}${path}`, { signal });
  }
}
