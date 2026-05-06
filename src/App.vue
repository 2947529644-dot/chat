<script setup lang="ts">
import GlobalNav from './components/GlobalNav.vue'
import ContactList from './components/ContactList.vue'
import ChatWindow from './components/ChatWindow.vue'
</script>

<template>
  <div class="app-container">
    <GlobalNav />
    <div class="main-content">
      <ContactList />
      <ChatWindow />
    </div>
  </div>
</template>

<style scoped>
.app-container {
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-content {
  flex: 1;
  display: flex;
  min-height: 0;
}

@media (max-width: 767px) {
  .main-content {
    flex-direction: column;
  }
}
</style>
