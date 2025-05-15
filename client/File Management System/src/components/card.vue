<template>
  <div class="card" @click="$emit('click')">
    <div class="cardHeader">
      <div>

        <div class="titleDiv">
            <h3>{{ note.title }}</h3>
        </div>

        <div class="previewDiv">
            {{ note.content }}
        </div>

        <p class="date">{{ formatDate(note.createdat) }}</p>
      </div>
      <button @click.stop="$emit('delete')">Delete</button>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({ note: Object })
const emit = defineEmits(['delete', 'click'])
const formatDate = date => new Date(date).toLocaleDateString()
</script>

<style scoped>
* {
    font-family: "inter";
}

.card {
    background-color: #92C3E8;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    padding: 20px;
    border-radius: 12px;
    margin-bottom: 10px;
    cursor: pointer;
    max-width: 100%;
}

.cardHeader {
    max-width: 100%;
}

button {
    height: 10%;
    margin: 15px 0px 0px 0px;
    background-color: 	#e21f1f;
}

h3 {
    color: black;
    font-size: 2rem;
    margin:0;
}

.previewDiv {
    color: rgba(0, 0, 0, 0.5);
    font-size: 1rem;
    font-weight: 500;
    margin:0;
    width: 100%;
    max-height: 100px;
    overflow: hidden;
}

.titleDiv {
    width: 100%;
    max-height: 100px;
    overflow: hidden;
}

.date {
    color: rgba(0, 0, 0, 0.35);
    font-size: 1rem;
    font-weight: 400;
    margin: 10px 0px 0px 0px;
}
</style>