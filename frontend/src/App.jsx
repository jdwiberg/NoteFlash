import { useEffect, useState } from 'react'
import { getNote } from './game/game'
import './App.css'


function App() {
  const [sharps, setSharps] = useState(false)
  const [flats, setFlats] = useState(false)
  const [naturals, setNaturals] = useState(true)
  const [inProgress, setInProgress] = useState(false)
  const [note, setNote] = useState('')
  const [speed, setSpeed] = useState(1)

  useEffect(() => {
    if (!flats && !sharps && !naturals) {
      setNaturals(true)
    }
  }, [flats, sharps, naturals])

  useEffect(() => {
    if (!inProgress) {
      setNote('')
      return undefined
    }

    const displayNextNote = () => {
      setNote(getNote(sharps, flats, naturals))
    }

    displayNextNote()
    const noteLoop = setInterval(displayNextNote, speed * 1000)

    return () => clearInterval(noteLoop)
  }, [inProgress, sharps, flats, naturals, speed])

  return (
    <main className="app-shell">
      <header className="app-header">
        <p className="eyebrow">Music theory trainer</p>
        <h1>Note Flash</h1>
        <p className="subtitle">Read the note before the next one appears.</p>

        <div id="toggleables" aria-label="Note types">
          <button
            type="button"
            className={`toggleable ${flats ? 'is-active' : ''}`}
            aria-label="Include flats"
            aria-pressed={flats}
            onClick={() => setFlats((enabled) => !enabled)}
          >
            ♭
          </button>
          <button
            type="button"
            className={`toggleable ${naturals ? 'is-active' : ''}`}
            aria-label="Include natural notes"
            aria-pressed={naturals}
            onClick={() => setNaturals((enabled) => !enabled)}
          >
            ♮
          </button>
          <button
            type="button"
            className={`toggleable ${sharps ? 'is-active' : ''}`}
            aria-label="Include sharps"
            aria-pressed={sharps}
            onClick={() => setSharps((enabled) => !enabled)}
          >
            ♯
          </button>
        </div>
      </header>

      <section id="top">
        <button
          type="button"
          className={`play-button ${inProgress ? 'is-playing' : ''}`}
          onClick={() => setInProgress((active) => !active)}
        >
          <span className="play-icon" aria-hidden="true">{inProgress ? '■' : '▶'}</span>
          {inProgress ? 'End' : 'Start'}
        </button>
      </section>

      <section id="center">
        <p className="note-prompt">{inProgress ? 'Find this note' : ''}</p>
        {inProgress && <span className="note-display">{note}</span>}
        {!inProgress && <span className="note-placeholder" aria-hidden="true">♪</span>}
      </section>

      <section className="speed-control" aria-labelledby="speed-label">
        <label id="speed-label" htmlFor="speed">
          Note speed <output>{speed.toFixed(2)} seconds</output>
        </label>
        <input
          id="speed"
          type="range"
          min="0.25"
          max="10"
          step="0.25"
          value={speed}
          onChange={(event) => setSpeed(Number(event.target.value))}
        />
        <div className="speed-labels" aria-hidden="true">
          <span>Fast</span>
          <span>Slow</span>
        </div>
      </section>
    </main>
  )
}

export default App
