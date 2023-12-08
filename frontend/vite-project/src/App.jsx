import './App.css'
import TextSummarizer from './components/text_summary'

function App() {
  return (
    <>
      <div>
      <h1 className='lg:text-5xl p-10 text-3xl text-red-100'>Text Summarizer</h1>
      <TextSummarizer />
    </div>
    </>
  )
}

export default App
