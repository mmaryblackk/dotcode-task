import { BlockData } from "@/types/BlockData";

const STORAGE_KEY = "workspace_blocks";

export const saveState = (blocks: BlockData[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(blocks));
};

export const loadState = (): BlockData[] | null => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : null;
};

export const clearState = () => {
  localStorage.removeItem(STORAGE_KEY);
};
