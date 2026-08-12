const fs = require('fs/promises');
const path = require('path');

const notesFile = path.join(__dirname, 'notes.json');

async function readNotes() {
  try {
    const data = await fs.readFile(notesFile, 'utf-8');

    if (!data.trim()) {
      return [];
    }

    return JSON.parse(data);
  } catch (error) {
    if (error.code === 'ENOENT') {
      await fs.writeFile(notesFile, '[]', 'utf-8');
      return [];
    }

    if (error instanceof SyntaxError) {
      throw new Error('notes.json contains invalid JSON data.');
    }

    throw error;
  }
}

async function saveNotes(notes) {
  await fs.writeFile(
    notesFile,
    JSON.stringify(notes, null, 2),
    'utf-8'
  );
}

async function addNote(noteText) {
  if (!noteText || !noteText.trim()) {
    throw new Error('Please provide a note to add.');
  }

  const notes = await readNotes();

  const newNote = {
    id: notes.length > 0 ? notes[notes.length - 1].id + 1 : 1,
    text: noteText.trim(),
    createdAt: new Date().toISOString()
  };

  notes.push(newNote);

  await saveNotes(notes);

  console.log('Note added successfully.');
  console.log(`ID: ${newNote.id}`);
  console.log(`Note: ${newNote.text}`);
}

async function listNotes() {
  const notes = await readNotes();

  if (notes.length === 0) {
    console.log('No notes found.');
    return;
  }

  console.log('\nYour Notes:\n');

  notes.forEach((note) => {
    console.log(`[${note.id}] ${note.text}`);
    console.log(`Created: ${note.createdAt}`);
    console.log('----------------------------');
  });
}

async function deleteNote(noteId) {
  if (!noteId) {
    throw new Error('Please provide a note ID to delete.');
  }

  const id = Number(noteId);

  if (Number.isNaN(id)) {
    throw new Error('Note ID must be a number.');
  }

  const notes = await readNotes();

  const noteIndex = notes.findIndex((note) => note.id === id);

  if (noteIndex === -1) {
    throw new Error(`No note found with ID ${id}.`);
  }

  const deletedNote = notes.splice(noteIndex, 1)[0];

  await saveNotes(notes);

  console.log(`Note ${deletedNote.id} deleted successfully.`);
}

function showHelp() {
  console.log(`
CLI Note Tool

Commands:

  node app.js add "Your note"
  node app.js list
  node app.js delete <id>

Examples:

  node app.js add "Learn Node.js"
  node app.js add "Practice fs promises"
  node app.js list
  node app.js delete 1
`);
}

async function main() {
  const command = process.argv[2];

  try {
    switch (command) {
      case 'add': {
        const noteText = process.argv.slice(3).join(' ');
        await addNote(noteText);
        break;
      }

      case 'list':
        await listNotes();
        break;

      case 'delete':
        await deleteNote(process.argv[3]);
        break;

      case undefined:
        showHelp();
        break;

      default:
        throw new Error(
          `Unknown command "${command}". Use add, list, or delete.`
        );
    }
  } catch (error) {
    console.error(`\nError: ${error.message}`);
    process.exitCode = 1;
  }
}

main();