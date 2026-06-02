import { useCallback, useEffect, useState } from 'react';
import { fetchSkills } from '../lib/api';
import type { SkillsResponse } from '../types';

interface State {
  data: SkillsResponse | null;
  loading: boolean;
  error: string | null;
  refreshing: boolean;
}

/** Loads the live skill scan from the local backend. */
export function useSkillsData() {
  const [state, setState] = useState<State>({ data: null, loading: true, error: null, refreshing: false });

  const load = useCallback(async (refresh = false) => {
    setState((s) => ({ ...s, refreshing: refresh, loading: !s.data, error: null }));
    try {
      const data = await fetchSkills(refresh);
      setState({ data, loading: false, error: null, refreshing: false });
    } catch (e) {
      setState((s) => ({ ...s, loading: false, refreshing: false, error: (e as Error).message }));
    }
  }, []);

  useEffect(() => {
    load(false);
  }, [load]);

  return {
    skills: state.data?.data ?? [],
    facets: state.data?.facets ?? { categories: [], tags: [], sources: [] },
    meta: state.data?.meta ?? null,
    loading: state.loading,
    refreshing: state.refreshing,
    error: state.error,
    refetch: () => load(true),
  };
}
