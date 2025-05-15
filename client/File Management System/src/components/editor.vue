<template>
    <div v-if="note" class="noteEditor">
        <div class="top">
            <input v-model="title" class="title" placeholder="Untitled Note" />
            <p class="error"> {{ message1 }} </p>
            <p class="date">{{ formatDate(note.createdat) }}</p>
            <hr />
            <textarea v-model="content" class="content" placeholder="Start typing..."></textarea>
            <p class="error"> {{ message2 }} </p>
        </div>

        <div class="bottom">
            <button @click="saveNote" class="updateBtn">Update Note</button>            
        </div>
    </div>
    <div v-else class="noteEditor">
        <div class="top">
            <input v-model="title" class="title" placeholder="Untitled Note" />
            <p class="error"> {{ message1 }} </p>
            <hr />
            <textarea v-model="content" class="content" placeholder="Start typing..."></textarea>
            <p class="error"> {{ message2 }} </p>
        </div>

        <div class="bottom">
            <button @click="createNote" class="updateBtn">Create Note</button>
        </div>        
    </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({ note: Object })
const title = ref('')
const content = ref('')
const emit = defineEmits(['update'])
var message1 = ref('')
var message2 = ref('')

watch(() => props.note, (newNote) => {
    if (newNote) {
        title.value = newNote.title
        content.value = newNote.content
    } else {
        title.value = ''
        content.value = ''
    }
}, { immediate: true })

const formatDate = (date) => {
    const d = new Date(date)
    return `${d.getDate()} ${d.toLocaleString('default', { month: 'short' })} ${d.getFullYear()}, ${d.getHours()}:${d.getMinutes().toString().padStart(2, '0')}`
}

const validateNote = () => {
    if (!title.value.trim()) {
        message1.value = "*Title cannot be empty"
        return false
    } else {
        message1.value = ""
    }

    if (!content.value.trim()) {
        message2.value = "*Content cannot be empty"
        return false
    } else {
        message2.value = ""
    }

    return true
}

const createNote = () => {
    if (validateNote()) {
        emit('create', {
            title: title.value,
            content: content.value,
        })
        title.value = ''
        content.value = ''
    }
}

const saveNote = () => {
    if (validateNote()) {
        emit('update', {
            id: props.note.id,  
            title: title.value,
            content: content.value
        })
    }
} 
</script>

<style scoped>
.noteEditor {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 70%;
    min-height: 90vh;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    background-color: #cbe2f9;
    border-radius: 15px;
    padding: 20px;
    margin: 20px;
}

.top {
    height: 90%
}

.bottom {
    height: 5%;
    max-height: 10%;
}

.title {
    font-family: "Inter";
    font-size: 3rem;
    font-weight: 700;
    color: black;
    margin: 0 0 5px;
    background: transparent;
    border: none
}

.date {
    font-size: 1.5rem;
    color: #444;
    margin-bottom: 10px;
}

hr {
    border: none;
    height: 1px;
    background-color: #888;
    margin: 15px 0;
}

.content {
    font-family: "Inter";
    font-size: 1.25rem;
    font-weight: 400;
    color: rgba(0, 0, 0, 0.75);
    margin: 0 0 5px;
    background: transparent;
    border: none;
    width: 100%;
    height: 85%;
}

.updateBtn {
    background-color: #56A7E3;
    transition: background-color 0.3s ease;
    width: 100%;
}

.updateBtn:hover {
    background-color: #1885d8;
}

.error {
    color: red;
    font-weight: 500;
    font-family: "inter";
}
</style>