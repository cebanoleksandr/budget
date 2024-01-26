<script>
export default {
  props: ['isOpen'],
  data: () => ({
    links: [
      {title: 'Home', to: '/'},
      {title: 'History', to: '/history'},
      {title: 'Planning', to: '/planning'},
      {title: 'New Record', to: '/record'},
      {title: 'Categories', to: '/categories'}
    ]
  })
}
</script>

<template>
  <ul class="menu-links">
    <router-link
      v-for="link of links"
      :key="link.to"
      tag="li"
      class="menu-link px-3"
      :class="{
        'non-clickable': !isOpen
      }"
      active-class="active"
      :to="link.to"
    >
      <a class="is-size-4">{{ link.title }}</a>
    </router-link>
  </ul>
</template>

<style>
.active {
  background-color: hsl(48, 100%, 67%);
  font-weight: bold;
}
.menu-links {
  display: flex;
  flex-direction: column;
}
.menu-link {
  transition: all .3s ease-in-out;
}
.menu-link:hover {
  background-color: #ccc;
}
.non-clickable {
  pointer-events: none;
}
</style>
