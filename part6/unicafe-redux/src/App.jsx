const App = ({ store }) => {
  const state = store.getState()

  return (
    <>
      <div>
        <button 
          onClick={() => store.dispatch({ type: 'GOOD' })}
        >
          good
        </button>
        <button 
          onClick={() => store.dispatch({ type: 'OK' })}
        >
          ok
        </button>
        <button 
          onClick={() => store.dispatch({ type: 'BAD' })}
        >
          bad
        </button>
        <button 
          onClick={() => store.dispatch({ type: 'ZERO' })}
        >
          reset stats
        </button>
      </div>
      <p>
        good {state.good}<br />
        ok {state.ok}<br />
        bad {state.bad}
      </p>
    </>
  )
}

export default App
