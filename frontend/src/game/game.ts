


export function getNote(sharps: boolean, flats: boolean, naturals: boolean): string {
    const notes = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
    const acc = [sharps ? '#' : null, flats ? 'b' : null, naturals ? '' : null].filter(
        (accidental): accidental is string => accidental !== null,
    );
    const accidental = acc[Math.floor(Math.random() * acc.length)];

    return notes[Math.floor(Math.random() * notes.length)] + accidental;
}
