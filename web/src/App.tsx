import './App.css'
import { AnswerOptionButton } from './components/AnswerOptionButton'
import { Button } from './components/Button'

function App() {
  return (
    <>
      {/* <Questions></Questions> */}
      <AnswerOptionButton
        lightState='none'
        onClick={() => alert("hi you pressed")}>

          Press me!

      </AnswerOptionButton>
    </>
  )
}

export default App
