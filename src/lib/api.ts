import type { SkillDetail, SkillsResponse, Workflow, Scenario } from '../types';

async function get<T>(path: string): Promise<T> {
  const res = await fetch(path);
  if (!res.ok) throw new Error(`API ${path} 回應 ${res.status}`);
  return res.json();
}

export function fetchSkills(refresh = false): Promise<SkillsResponse> {
  return get<SkillsResponse>(`/api/skills${refresh ? '?refresh=1' : ''}`);
}

export function fetchSkill(id: string): Promise<{ data: SkillDetail }> {
  return get<{ data: SkillDetail }>(`/api/skills/${encodeURIComponent(id)}`);
}

export function fetchWorkflows(): Promise<{ data: Workflow[] }> {
  return get<{ data: Workflow[] }>('/api/workflows');
}

export function fetchScenarios(): Promise<{ data: Scenario[] }> {
  return get<{ data: Scenario[] }>('/api/scenarios');
}
