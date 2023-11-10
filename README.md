# V-Spotlight 💡

<a title="npm" href="https://www.npmjs.com/package/v-spotlight" rel="nofollow">
  <img alt="npm" src="https://img.shields.io/npm/v/v-spotlight?label=npm%40latest&logo=npm">
</a>
<a title="GitHub Release" href="https://github.com/vinayakkulkarni/v-spotlight/releases" rel="nofollow">
  <img alt="GitHub release (latest by date including pre-releases)" src="https://img.shields.io/github/v/release/vinayakkulkarni/v-spotlight?include_prereleases&logo=github">
</a>
<a title="CI Status" href="https://github.com/vinayakkulkarni/v-spotlight/actions?query=workflow%3Aci" rel="nofollow">
  <img alt="Total alerts" src="https://github.com/vinayakkulkarni/v-spotlight/workflows/ci/badge.svg">
</a>
<a title="DeepScan Grade" href="https://deepscan.io/dashboard#view=project&tid=9055&pid=25872&bid=815803">
  <img src="https://deepscan.io/api/teams/9055/projects/25872/branches/815803/badge/grade.svg" alt="DeepScan grade">
</a>
<a title="downloads" href="http://npm-stat.com/charts.html?package=v-spotlight" rel="nofollow">
  <img alt="npm" src="https://img.shields.io/npm/dm/v-spotlight">
</a>
<a title="deploy" href="https://github.com/algolia/shipjs" rel="nofollow">
  <img src="https://img.shields.io/badge/deploy-🛳%20Ship.js-blue?style=flat" />
</a>
<a title="Last Commit" href="https://github.com/vinayakkulkarni/v-spotlight/commits/main" rel="nofollow">
  <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/vinayakkulkarni/v-spotlight">
</a>
<a title="Contributors" href="https://github.com/vinayakkulkarni/v-spotlight/graphs/contributors" rel="nofollow">
  <img alt="GitHub contributors" src="https://img.shields.io/github/contributors/vinayakkulkarni/v-spotlight">
</a>


* 🔦 Tiny reusable Spotlight component for your Vue App

## Table of Contents

- [V-Spotlight 💡](#v-spotlight-)
  - [Table of Contents](#table-of-contents)
  - [Demo](#demo)
  - [Requirements](#requirements)
    - [Installation](#installation)
    - [Build Setup](#build-setup)
    - [Usage](#usage)
    - [Example](#example)
  - [Contributing](#contributing)
  - [Author](#author)

## Demo

[![Edit v-spotlight demo](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/edit/v-spotlight?file=src/App.vue)

## Requirements

- [vue](https://vuejs.org/) `^3.x`

### Installation

```sh
npm install --save v-spotlight
```

CDN: [UNPKG](https://unpkg.com/v-spotlight/dist/) | [jsDelivr](https://cdn.jsdelivr.net/npm/v-spotlight/dist/) (available as `window.VSpotlight`)

### Build Setup

```bash
# install dependencies
$ npm install

# package the library
$ npm run build
```

### Usage

Global component:

```js
// main.ts
import { VSpotlight } from 'v-spotlight';
import { createApp } from 'vue';

const app = createApp({});
app.component('VSpotlight', VSpotlight);
```

Or use locally

```js
// component.vue
<script lang="ts">
import { defineComponent } from 'vue';
import { VSpotlight } from 'v-spotlight';

export default defineComponent({
  components: {
    VSpotlight,
  },
});
</script>
```

For Nuxt 3, create a file in `plugins/v-spotlight.ts`

```js
import { VSpotlight } from 'v-spotlight';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component('VSpotlight', VSpotlight);
});
```

then import the file in `nuxt.config.{j|t}s`:

```js
export default {
  // ...
  plugins: [
    // ...
    { src: '~/plugins/v-spotlight', mode: 'client' },
    // ...
  ],
  // ...
};
```

### Example

```html
<template>
  <v-spotlight />
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import type { Ref } from 'vue';
  import { VSpotlight } from 'v-spotlight';

  export default defineComponent({
    components: {
      VSpotlight,
    },
  });
</script>
<style>
  @import 'v-spotlight/dist/v-spotlight.css';
</style>
```

## Contributing

1. Fork it ( [https://github.com/vinayakkulkarni/v-spotlight/fork](https://github.com/vinayakkulkarni/v-spotlight/fork) )
2. Create your feature branch (`git checkout -b feat/new-feature`)
3. Commit your changes (`git commit -Sam 'feat: add feature'`)
4. Push to the branch (`git push origin feat/new-feature`)
5. Create a new [Pull Request](https://github.com/vinayakkulkarni/v-spotlight/compare)

_Note_:

1. Please contribute using [GitHub Flow](https://web.archive.org/web/20191104103724/https://guides.github.com/introduction/flow/)
2. Commits & PRs will be allowed only if the commit messages & PR titles follow the [conventional commit standard](https://www.conventionalcommits.org/), _read more about it [here](https://github.com/conventional-changelog/commitlint/tree/master/%40commitlint/config-conventional#type-enum)_
3. PS. Ensure your commits are signed. _[Read why](https://withblue.ink/2020/05/17/how-and-why-to-sign-git-commits.html)_

## Author

**v-spotlight** &copy; [Vinayak](https://vinayakkulkarni.dev), Released under the [MIT](./LICENSE) License.<br>
Authored and maintained by Vinayak Kulkarni with help from contributors ([list](https://github.com/vinayakkulkarni/v-spotlight/contributors)).

> [vinayakkulkarni.dev](https://vinayakkulkarni.dev) · GitHub [@vinayakkulkarni](https://github.com/vinayakkulkarni) · Twitter [@\_vinayak_k](https://twitter.com/_vinayak_k)
