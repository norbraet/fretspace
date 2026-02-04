import { ref, computed } from "vue";

import type { NoteIndex, NoteName } from "./types/types";
import { NOTES } from "./types/types";

export function noteNameToIndex(name: NoteName): NoteIndex {
  return NOTES.indexOf(name) as NoteIndex;
}

export function noteIndexToName(index: NoteIndex): NoteName {
  return NOTES[index];
}

export function useNotes() {
  const root = ref<NoteIndex>(0);

  function nextNote(current: NoteIndex, interval: number = 1): NoteIndex {
    return ((current + interval) % 12) as NoteIndex;
  }

  function prevNote(current: NoteIndex, interval: number = 1): NoteIndex {
    return ((current - interval + 12) % 12) as NoteIndex;
  }

  function buildScale(rootNote: NoteIndex, intervals: number[]): NoteIndex[] {
    const notes: NoteIndex[] = [rootNote];
    let current = rootNote;
    for (const step of intervals.slice(0, -1)) {
      current = nextNote(current, step);
      notes.push(current);
    }
    return notes;
  }

  const currentScaleNotes = ref<NoteIndex[]>([root.value]);

  const currentScaleNoteNames = computed(() =>
    currentScaleNotes.value.map(noteIndexToName),
  );

  function setRoot(note: NoteIndex | NoteName) {
    root.value = typeof note === "string" ? noteNameToIndex(note) : note;
  }

  return {
    root,
    setRoot,
    nextNote,
    prevNote,
    buildScale,
    currentScaleNotes,
    currentScaleNoteNames,
  };
}
