const STORAGE_KEY = 'writingsPortfolio';

export const saveWritings = (writings) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(writings));
};

export const loadWritings = () => {
  const savedWritings = localStorage.getItem(STORAGE_KEY);
  return savedWritings ? JSON.parse(savedWritings) : [];
};

export const clearWritings = () => {
  localStorage.removeItem(STORAGE_KEY);
};
