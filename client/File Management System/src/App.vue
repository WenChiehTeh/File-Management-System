<template>
    <div class="container">
        <sidebar :notes="notes" @select="selectNote" @delete="deleteNote" @addNote="() => selectNote(null)" />
        <editor :note="selectedNote" @update="updateNote" @create="createNote"/>
    </div>
</template>

<script setup>
import sidebar from "../src/components/sidebar.vue"
import editor from "../src/components/editor.vue"
import { ref, onMounted } from "vue"

const notes = ref([])
const selectedNote = ref(null)

const getNotes = async () => {
    const res = await fetch('http://localhost:3000/api/getNotes')
    const data = await res.json()
    notes.value = data
}

const createNote = async (note) => {
    try {
        const res = await fetch("http://localhost:3000/api/createNote", {
        method: "POST",
        headers: {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify({
            title: note.title,
            content: note.content,
        })
      })
      await getNotes()
      selectNote(null)
    } catch (err) {
      console.log("Failed to create: " + err)
    }

}

const deleteNote = async (id) => {
    try {
        await fetch(`http://localhost:3000/api/deleteNote/${id}`, {
          method: "DELETE"
        })
        await getNotes()
        selectNote(null)
    }
    catch (err) {
        console.log("Failed to delete: " + err)
    }
}

const updateNote = async (note) => {
    try {
        await fetch(`http://localhost:3000/api/updateNote/${note.id}`, {
            method: "PUT",
            headers: {
                "Content-Type" : "application/json",
            },
            body: JSON.stringify({
                title: note.title,
                content: note.content
            })
        })
        await getNotes()
        selectNote(null)
    } catch (err) {
        console.log("Failed to update note: " + err)
    }
}

const selectNote = (note) => {
    selectedNote.value = note
}

onMounted(getNotes)
</script>

<style>
    .container {
        display: flex;
        justify-content: space-between;
        width: 100%;
        height: 100%;
        background-color: white;
    }
</style>