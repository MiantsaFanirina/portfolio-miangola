export function scrollToId(id: string) {
  if (typeof window === 'undefined') return;
  const el = document.getElementById(id);
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.scrollY - 72;
  window.scrollTo({ top, behavior: 'smooth' });
}

export function handleHashNavigation(
  hash: string,
  navigate: (to: string) => void,
  location: { pathname: string },
) {
  if (location.pathname === '/') {
    scrollToId(hash);
  } else {
    navigate('/');
    // wait for home to mount, then scroll
    window.setTimeout(() => scrollToId(hash), 120);
  }
}
