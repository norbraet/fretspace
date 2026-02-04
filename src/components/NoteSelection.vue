<template>
  <div>
    <p>Root: {{ noteNames[root] }}</p>
    <select v-model="rootIndex">
      <option v-for="(note, i) in noteNames" :key="i" :value="i">
        {{ note }}
      </option>
    </select>

    <p>Scale: {{ currentScaleNotes.join(", ") }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { useNotes } from "../composables/useNotes/useNotes";

const { root, setRoot, buildScale, currentScaleNotes } = useNotes();
const noteNames = [
  "C",
  "C#",
  "D",
  "D#",
  "E",
  "F",
  "F#",
  "G",
  "G#",
  "A",
  "A#",
  "B",
];

// Example: set current scale to C major
const majorIntervals = [2, 2, 1, 2, 2, 2, 1];
currentScaleNotes.value = buildScale(root.value, majorIntervals);

// For v-model
const rootIndex = ref(root.value);
watch(rootIndex, (v) => setRoot(v));
</script>
