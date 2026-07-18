<template>
  <main class="app-container">
    <header class="app-header">
      <h1><b>Forgiveness Dilemma Spinner</b></h1>

      <nav class="nav-links">
        <router-link to="/oracle">Consult the Wheel</router-link>
        <router-link to="/journal">Previous Fates</router-link>
      </nav>
    </header>
    <router-view v-slot="{ Component }">
      <keep-alive> <component :is="Component" /> </keep-alive>
    </router-view>
  </main>
</template>

<style scoped>
.app-container {
  max-width: 600px;
  margin: 40px auto;
  font-family: Arial, sans-serif;
  text-align: center;
  padding: 20px;
  background-color: #052f5f;
}

h1,
h2,
p {
  color: #d5c67a;
}

.nav-links {
  margin-top: 20px;
}
.nav-links a {
  text-decoration: none;
  color: black;
  font-weight: bold;
  padding: 8px 16px;
  margin: 0 5px;
  border-radius: 5px;
  transition: all 0.2s;
  background-color: #06a77d;
}
.nav-links a.router-link-exact-active {
  background-color: #06a77d;
  color: white;
}

.nav-links a:hover {
  background-color: #058c69;
  color: white;
}

:deep(button:focus-visible),
:deep(textarea:focus-visible),
:deep(input:focus-visible) {
  border-color: 2px solid #d5c67a;
  outline-offset: 0px;
}
</style>
