import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { PokemonDetailPage } from '../pages/PokemonDetailPage';
import type { PokemonDetailPageProps } from '../pages/pokemon-detail-page.props';

const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 60_000, retry: 1, refetchOnWindowFocus: false } },
});

export default function PokemonDetailRemote(props: PokemonDetailPageProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <PokemonDetailPage {...props} />
    </QueryClientProvider>
  );
}
