<script setup lang="ts">
  import { onBeforeUnmount, onMounted, ref } from 'vue';
  import { VSpotlight } from 'v-spotlight';
  import { track } from './analytics';
  import { useTheme } from './composables/use-theme';

  const INSTALL = 'pnpm add v-spotlight';
  const GITHUB_URL = 'https://github.com/vinayakkulkarni/v-spotlight';
  const NPM_URL = 'https://www.npmjs.com/package/v-spotlight';

  const { isDark, setPreference } = useTheme();
  const lit = ref(true);
  const copied = ref(false);
  let moved = false;
  let pressed = false;
  let copyTimer: ReturnType<typeof setTimeout> | undefined;

  function onFirstMove(): void {
    if (moved || !lit.value) return;
    moved = true;
    track('spotlight_move');
  }

  function onFirstPress(e: MouseEvent): void {
    if (pressed || !lit.value || e.button !== 0) return;
    pressed = true;
    track('spotlight_press');
  }

  function toggleSpotlight(): void {
    lit.value = !lit.value;
    track('spotlight_toggle', { on: lit.value });
  }

  function toggleTheme(): void {
    const next = isDark.value ? 'light' : 'dark';
    setPreference(next);
    track('theme_toggle', { theme: next });
  }

  async function copyInstall(): Promise<void> {
    try {
      await navigator.clipboard.writeText(INSTALL);
      copied.value = true;
      track('install_copy', { command: INSTALL });
      clearTimeout(copyTimer);
      copyTimer = setTimeout(() => {
        copied.value = false;
      }, 1600);
    } catch {
      copied.value = false;
    }
  }

  function outbound(target: 'github' | 'npm'): void {
    track('outbound_click', { target });
  }

  onMounted(() => {
    window.addEventListener('mousemove', onFirstMove);
    window.addEventListener('mousedown', onFirstPress);
  });

  onBeforeUnmount(() => {
    window.removeEventListener('mousemove', onFirstMove);
    window.removeEventListener('mousedown', onFirstPress);
    clearTimeout(copyTimer);
  });
</script>

<template>
  <main
    class="relative h-dvh w-full overflow-hidden bg-canvas text-ink select-none"
  >
    <section
      aria-labelledby="title"
      class="pointer-events-none absolute inset-0 grid place-items-center px-5"
    >
      <div class="flex max-w-6xl flex-col items-center gap-6 text-center">
        <p
          class="font-mono text-xs tracking-[0.2em] text-muted uppercase sm:text-sm"
        >
          Move the cursor · hold to focus
        </p>
        <h1
          id="title"
          class="text-[clamp(3.25rem,17vw,15rem)] leading-[0.82] font-black tracking-[-0.055em]"
        >
          v-spotlight
        </h1>
        <p class="max-w-md text-base font-light text-muted sm:text-lg">
          The page goes dark. A circle of light follows the cursor. One Vue 3
          component, no runtime dependencies.
        </p>
        <code
          class="rounded-md border border-line bg-sunken px-3 py-1.5 font-mono text-sm text-ink"
        >
          &lt;VSpotlight /&gt;
        </code>
      </div>
    </section>

    <v-spotlight v-if="lit" />

    <header
      class="absolute inset-x-0 top-0 z-10 flex items-center justify-between gap-3 border-b border-line bg-surface px-4 py-3 sm:px-6"
    >
      <span class="flex items-center gap-2 text-sm font-bold tracking-tight">
        <span aria-hidden="true" class="size-2.5 rounded-full bg-signal" />
        v-spotlight
      </span>
      <nav class="flex items-center gap-1" aria-label="Project links">
        <a
          :href="GITHUB_URL"
          target="_blank"
          rel="noopener noreferrer"
          class="rounded-md px-2.5 py-1.5 text-sm text-muted transition-colors hover:bg-sunken hover:text-ink"
          @click="outbound('github')"
        >
          GitHub
        </a>
        <a
          :href="NPM_URL"
          target="_blank"
          rel="noopener noreferrer"
          class="rounded-md px-2.5 py-1.5 text-sm text-muted transition-colors hover:bg-sunken hover:text-ink"
          @click="outbound('npm')"
        >
          npm
        </a>
        <button
          type="button"
          class="grid size-9 place-items-center rounded-md text-muted transition-colors hover:bg-sunken hover:text-ink"
          :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
          @click="toggleTheme"
        >
          <svg
            v-if="isDark"
            viewBox="0 0 24 24"
            class="size-[18px]"
            fill="none"
            stroke="currentColor"
            stroke-width="1.75"
            aria-hidden="true"
          >
            <circle cx="12" cy="12" r="4" />
            <path
              d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"
            />
          </svg>
          <svg
            v-else
            viewBox="0 0 24 24"
            class="size-[18px]"
            fill="none"
            stroke="currentColor"
            stroke-width="1.75"
            aria-hidden="true"
          >
            <path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5Z" />
          </svg>
        </button>
      </nav>
    </header>

    <footer
      class="absolute inset-x-0 bottom-0 z-10 flex items-center justify-between gap-3 border-t border-line bg-surface px-4 py-3 sm:px-6"
    >
      <button
        type="button"
        class="flex min-w-0 items-center gap-3 rounded-md border border-line bg-sunken py-1.5 pr-2 pl-3 font-mono text-[13px] transition-colors hover:border-muted"
        :aria-label="`Copy install command: ${INSTALL}`"
        @click="copyInstall"
      >
        <span class="truncate"
          ><span class="text-muted">$</span> {{ INSTALL }}</span
        >
        <span
          class="rounded-sm px-1.5 py-0.5 text-[11px] tracking-wide uppercase"
          :class="copied ? 'bg-signal text-signal-ink' : 'text-muted'"
          aria-live="polite"
        >
          {{ copied ? 'Copied' : 'Copy' }}
        </span>
      </button>
      <button
        type="button"
        class="rounded-md bg-ink px-3.5 py-2 text-sm font-medium text-canvas transition-opacity hover:opacity-85"
        :aria-pressed="lit"
        @click="toggleSpotlight"
      >
        <span class="max-sm:sr-only">Spotlight </span>{{ lit ? 'On' : 'Off' }}
      </button>
    </footer>
  </main>
</template>
