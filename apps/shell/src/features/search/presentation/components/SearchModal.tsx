import { type FormEvent, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import { PokemonCard } from '../../../pokemon/presentation/components/PokemonCard';
import { usePokemonSearch } from '../hooks/usePokemonSearch';
import styles from './SearchModal.module.css';

const SEARCH_SKELETON_COUNT = 12;
const FOCUSABLE_ELEMENT_SELECTOR =
  'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])';

interface SearchModalProps {
  onClose: () => void;
}

export function SearchModal({ onClose }: SearchModalProps) {
  const navigate = useNavigate();
  const searchInputRef = useRef<HTMLInputElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const loadMoreRef = useRef<HTMLDivElement>(null);
  const isRequestingNextPageRef = useRef(false);
  const [searchInput, setSearchInput] = useState('');
  const [submittedSearch, setSubmittedSearch] = useState<string | null>(null);

  const { listQuery, exactSearchQuery, listedPokemon } = usePokemonSearch(submittedSearch);
  const { fetchNextPage, hasNextPage, isFetchingNextPage } = listQuery;

  useEffect(() => {
    const previouslyFocusedElement =
      document.activeElement instanceof HTMLElement ? document.activeElement : null;
    searchInputRef.current?.focus();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleDialogKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
        return;
      }

      if (event.key !== 'Tab') return;

      const focusableElements = Array.from(
        scrollContainerRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE_ELEMENT_SELECTOR) ?? [],
      );
      const firstFocusableElement = focusableElements.at(0);
      const lastFocusableElement = focusableElements.at(-1);

      if (!firstFocusableElement || !lastFocusableElement) return;

      if (event.shiftKey && document.activeElement === firstFocusableElement) {
        event.preventDefault();
        lastFocusableElement.focus();
      } else if (!event.shiftKey && document.activeElement === lastFocusableElement) {
        event.preventDefault();
        firstFocusableElement.focus();
      }
    };
    document.addEventListener('keydown', handleDialogKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', handleDialogKeyDown);
      previouslyFocusedElement?.focus();
    };
  }, [onClose]);

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    const sentinel = loadMoreRef.current;
    if (!scrollContainer || !sentinel || submittedSearch !== null || !hasNextPage) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (
          entry.isIntersecting &&
          !isFetchingNextPage &&
          !isRequestingNextPageRef.current
        ) {
          isRequestingNextPageRef.current = true;
          void fetchNextPage().finally(() => {
            isRequestingNextPageRef.current = false;
          });
        }
      },
      { root: scrollContainer, rootMargin: '300px 0px' },
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage, submittedSearch]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (searchInput.trim() === '') {
      setSubmittedSearch(null);
      return;
    }

    setSubmittedSearch(searchInput);
  };

  const clearSearch = () => {
    setSearchInput('');
    setSubmittedSearch(null);
    searchInputRef.current?.focus();
  };

  const selectPokemon = (pokemonId: number) => {
    onClose();
    void navigate(`/pokemon/${pokemonId}`);
  };

  return createPortal(
    <div
      ref={scrollContainerRef}
      className={styles.backdrop}
      role="dialog"
      aria-modal="true"
      aria-labelledby="search-title"
    >
      <div className={styles.container}>
        <header className={styles.header}>
          <h1 id="search-title" className={styles.title}>Buscar Pokemon</h1>
          <button type="button" className={styles.closeButton} onClick={onClose} aria-label="Cerrar búsqueda">
            Cerrar
          </button>
        </header>

        <form className={styles.form} onSubmit={handleSubmit}>
          <input
            ref={searchInputRef}
            className={styles.input}
            value={searchInput}
            onChange={(event) => setSearchInput(event.target.value)}
            placeholder="Nombre exacto, por ejemplo pikachu"
            aria-label="Nombre exacto del Pokemon"
          />
          <button className={styles.submitButton} type="submit">Buscar</button>
          {(submittedSearch !== null || searchInput) && (
            <button className={styles.clearButton} type="button" onClick={clearSearch}>Limpiar</button>
          )}
        </form>
        <p className={styles.hint}>
          Envía el nombre exacto usado por la API. Déjalo vacío para explorar todos los Pokemon.
        </p>
        {submittedSearch === null && listQuery.isPending && <SearchSkeleton />}
        {submittedSearch === null && listQuery.isError && (
          <Status title="No se pudieron cargar los Pokemon">
            <button className={styles.retryButton} type="button" onClick={() => listQuery.refetch()}>Reintentar</button>
          </Status>
        )}
        {submittedSearch === null && listQuery.isSuccess && listedPokemon.length === 0 && (
          <Status title="No hay Pokemon disponibles" />
        )}
        {submittedSearch === null && listedPokemon.length > 0 && (
          <div className={styles.grid}>
            {listedPokemon.map((pokemon) => (
              <PokemonCard key={pokemon.id} pokemon={pokemon} onSelect={selectPokemon} />
            ))}
          </div>
        )}
        {submittedSearch === null && listQuery.isFetchingNextPage && (
          <p className={styles.incrementalLoading}>Cargando más Pokemon…</p>
        )}
        {submittedSearch === null && <div ref={loadMoreRef} className={styles.sentinel} aria-hidden="true" />}

        {submittedSearch !== null && exactSearchQuery.isPending && <SearchSkeleton count={1} />}
        {submittedSearch !== null && exactSearchQuery.isError && (
          <Status title="La búsqueda no está disponible">
            <button className={styles.retryButton} type="button" onClick={() => exactSearchQuery.refetch()}>Reintentar</button>
          </Status>
        )}
        {submittedSearch !== null && exactSearchQuery.data?.status === 'invalid' && (
          <p className={styles.validation} role="alert">
            Usa un nombre exacto de la API, sin espacios ni acentos.
          </p>
        )}
        {submittedSearch !== null && exactSearchQuery.data?.status === 'not-found' && (
          <Status title="No encontrado">
            Ningún Pokemon tiene el nombre exacto “{exactSearchQuery.data.searchName}” en la API.
          </Status>
        )}
        {submittedSearch !== null && exactSearchQuery.data?.status === 'found' && (
          <div className={styles.grid}>
            <PokemonCard pokemon={exactSearchQuery.data.pokemon} onSelect={selectPokemon} />
          </div>
        )}
      </div>
    </div>,
    document.body,
  );
}

function SearchSkeleton({ count = SEARCH_SKELETON_COUNT }: { count?: number }) {
  return (
    <div className={styles.grid} aria-label="Cargando Pokemon">
      {Array.from({ length: count }, (_, index) => (
        <div className={styles.skeleton} key={index} aria-hidden="true" />
      ))}
    </div>
  );
}

function Status({ title, children }: { title: string; children?: React.ReactNode }) {
  return (
    <div className={styles.status} role="status">
      <h2>{title}</h2>
      {children}
    </div>
  );
}
